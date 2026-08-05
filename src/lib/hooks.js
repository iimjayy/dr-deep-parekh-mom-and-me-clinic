import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { openState, readStore, writeStore, splitNumeric } from './utils';

const isBrowser = typeof window !== 'undefined';
const useIsoLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */

const revealAll = () =>
  document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => el.classList.add('is-visible'));

/**
 * A single shared IntersectionObserver drives every `[data-reveal]` element on
 * the page — cheaper than one observer per component, and it picks up nodes
 * added later (tab switches, modals) via a MutationObserver.
 *
 * Reveal-on-scroll hides content by default, so it has to fail open. If the
 * observer never reports an intersection — no IO support, reduced motion, a
 * zero-height viewport in an embedded webview, print — everything is shown
 * unconditionally rather than leaving the visitor with a blank page.
 */
export function useRevealObserver({ watchdogMs = 1200 } = {}) {
  useEffect(() => {
    if (!isBrowser) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      revealAll();
      const mutation = new MutationObserver(revealAll);
      mutation.observe(document.body, { childList: true, subtree: true });
      return () => mutation.disconnect();
    }

    let revealed = 0;
    let disabled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
          revealed += 1;
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );

    const scan = () => {
      if (disabled) {
        revealAll();
        return;
      }
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => observer.observe(el));
    };

    scan();
    const mutation = new MutationObserver(scan);
    mutation.observe(document.body, { childList: true, subtree: true });

    // If the first screenful never resolved, the observer is not working here.
    const watchdog = setTimeout(() => {
      if (revealed === 0) {
        disabled = true;
        observer.disconnect();
        revealAll();
      }
    }, watchdogMs);

    const onPrint = () => revealAll();
    window.addEventListener('beforeprint', onPrint);

    return () => {
      clearTimeout(watchdog);
      observer.disconnect();
      mutation.disconnect();
      window.removeEventListener('beforeprint', onPrint);
    };
  }, [watchdogMs]);
}

/* ------------------------------------------------------------------ */
/* Scroll position + progress                                          */
/* ------------------------------------------------------------------ */

export function useScrollInfo(threshold = 24) {
  const [state, setState] = useState({ y: 0, scrolled: false, progress: 0, direction: 'down' });
  const lastY = useRef(0);

  useEffect(() => {
    if (!isBrowser) return undefined;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState({
        y,
        scrolled: y > threshold,
        progress: max > 0 ? Math.min(1, y / max) : 0,
        direction: y > lastY.current ? 'down' : 'up',
      });
      lastY.current = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return state;
}

/** Highlights the nav link whose section currently owns the viewport. */
export function useScrollSpy(ids, offset = 140) {
  const [active, setActive] = useState(ids?.[0] ?? null);

  useEffect(() => {
    if (!isBrowser || !ids?.length) return undefined;
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      // Snap to the last section once the page is scrolled to the bottom.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        const last = [...ids].reverse().find((id) => document.getElementById(id));
        if (last) current = last;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids?.join('|'), offset]);

  return active;
}

/* ------------------------------------------------------------------ */
/* Media queries + motion preference                                   */
/* ------------------------------------------------------------------ */

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => (isBrowser ? window.matchMedia(query).matches : false));

  useEffect(() => {
    if (!isBrowser) return undefined;
    const mql = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/* ------------------------------------------------------------------ */
/* Count-up                                                            */
/* ------------------------------------------------------------------ */

/** Animates a numeric string ("25,000+") into view once it is visible. */
export function useCountUp(raw, { duration = 1600, enabled = true } = {}) {
  const parsed = useMemo(() => splitNumeric(raw), [raw]);
  const ref = useRef(null);
  const [display, setDisplay] = useState(() =>
    parsed.value == null || !enabled ? raw : `${parsed.prefix}0${parsed.suffix}`,
  );
  const reduced = useReducedMotion();

  useEffect(() => {
    if (parsed.value == null || !enabled || reduced) {
      setDisplay(raw);
      return undefined;
    }
    const node = ref.current;
    if (!node || !isBrowser || !('IntersectionObserver' in window)) {
      setDisplay(raw);
      return undefined;
    }

    let frame = 0;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4);
        const current = parsed.value * eased;
        const formatted = parsed.decimals
          ? current.toFixed(parsed.decimals)
          : Math.round(current).toLocaleString('en-IN');
        setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) run();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    // Same fail-open guarantee as the reveal observer: a figure that never
    // animates must still end up showing its real value, not "0".
    const watchdog = setTimeout(() => {
      if (!started) setDisplay(raw);
    }, 2000);

    return () => {
      clearTimeout(watchdog);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [raw, parsed, duration, enabled, reduced]);

  return [display, ref];
}

/* ------------------------------------------------------------------ */
/* Persistence                                                         */
/* ------------------------------------------------------------------ */

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => readStore(key, initial));

  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        writeStore(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  return [value, set];
}

/* ------------------------------------------------------------------ */
/* Interaction helpers                                                 */
/* ------------------------------------------------------------------ */

/** Locks body scroll while a modal/drawer is open, without layout shift. */
export function useBodyLock(active) {
  useIsoLayoutEffect(() => {
    if (!active || !isBrowser) return undefined;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [active]);
}

/** Traps Tab focus inside a container and restores focus on close. */
export function useFocusTrap(active, containerRef, onEscape) {
  useEffect(() => {
    if (!active || !isBrowser) return undefined;
    const container = containerRef.current;
    const previouslyFocused = document.activeElement;

    const selector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusFirst = () => {
      const nodes = container?.querySelectorAll(selector);
      const target = [...(nodes || [])].find((n) => n.offsetParent !== null);
      (target || container)?.focus?.({ preventScroll: true });
    };
    const timer = setTimeout(focusFirst, 40);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onEscape?.();
        return;
      }
      if (event.key !== 'Tab' || !container) return;
      const nodes = [...container.querySelectorAll(selector)].filter((n) => n.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', onKeyDown, true);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [active, containerRef, onEscape]);
}

/** Global keyboard shortcut. `combo` e.g. "mod+k", "escape", "/" */
export function useHotkey(combo, handler, deps = []) {
  useEffect(() => {
    if (!isBrowser) return undefined;
    const parts = combo.toLowerCase().split('+');
    const key = parts[parts.length - 1];
    const needsMod = parts.includes('mod');
    const needsShift = parts.includes('shift');

    const onKeyDown = (event) => {
      const target = event.target;
      const typing =
        target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
      if (typing && !needsMod) return;

      const mod = event.metaKey || event.ctrlKey;
      if (needsMod !== mod) return;
      if (needsShift && !event.shiftKey) return;
      if (event.key.toLowerCase() !== key) return;

      event.preventDefault();
      handler(event);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

export function useOnClickOutside(ref, handler, active = true) {
  useEffect(() => {
    if (!active) return undefined;
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener, { passive: true });
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, active]);
}

/* ------------------------------------------------------------------ */
/* Pointer effects                                                     */
/* ------------------------------------------------------------------ */

/** Subtle 3D tilt toward the cursor. Disabled for touch + reduced motion. */
export function useTilt({ max = 7, scale = 1.015 } = {}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !fine) return undefined;

    let frame = 0;
    const onMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        node.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale(${scale})`;
      });
    };
    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      node.style.transform = '';
    };

    node.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)';
    node.addEventListener('mousemove', onMove);
    node.addEventListener('mouseleave', onLeave);
    return () => {
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max, scale, reduced, fine]);

  return ref;
}

/** Parallax translate on scroll. `speed` < 0 moves against the scroll. */
export function useParallax(speed = 0.12) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !isBrowser) return undefined;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
      node.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed, reduced]);

  return ref;
}

/* ------------------------------------------------------------------ */
/* Domain                                                              */
/* ------------------------------------------------------------------ */

/** Live open/closed state, refreshed each minute. */
export function useOpenStatus(hours) {
  const [status, setStatus] = useState(() => openState(hours));

  useEffect(() => {
    const update = () => setStatus(openState(hours));
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, [hours]);

  return status;
}

/** Fires once when the pointer leaves toward the browser chrome. Desktop only. */
export function useExitIntent(onTrigger, { enabled = true, delay = 8000 } = {}) {
  const fired = useRef(false);
  const armed = useRef(false);
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');

  useEffect(() => {
    if (!enabled || !fine || !isBrowser) return undefined;
    const arm = setTimeout(() => {
      armed.current = true;
    }, delay);

    const onLeave = (event) => {
      if (!armed.current || fired.current) return;
      if (event.clientY > 4 || event.relatedTarget) return;
      fired.current = true;
      onTrigger();
    };

    document.addEventListener('mouseout', onLeave);
    return () => {
      clearTimeout(arm);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [enabled, delay, fine, onTrigger]);
}
