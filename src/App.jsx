import React, { Suspense, lazy, useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SECTION_REGISTRY } from './components/registry';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ActionDock, { ScrollProgress } from './components/layout/ActionDock';
import CommandPalette from './components/layout/CommandPalette';
import BookingModal from './components/modals/BookingModal';
import TriageModal from './components/modals/TriageModal';
import { DoseModal, KitModal, ExitIntentModal } from './components/modals/ToolModals';
import { Toaster } from './components/ui';
import { useHotkey, useExitIntent } from './lib/hooks';

// Studio is an authoring tool, not part of the visitor experience — keep it out
// of the initial bundle.
const Studio = lazy(() => import('./components/studio/Studio'));

function Sections() {
  const { config } = useApp();

  return (
    <>
      {config.sections
        .filter((section) => section.enabled !== false)
        .map((section) => {
          const Component = SECTION_REGISTRY[section.component];
          if (!Component) {
            if (import.meta.env.DEV) {
              console.warn(`[practice-os] Unknown section component "${section.component}" (id: ${section.id})`);
            }
            return null;
          }
          return <Component key={section.id} section={section} />;
        })}
    </>
  );
}

function Shell() {
  const { toasts, dismissToast, config, modal } = useApp();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [engaged, setEngaged] = useState(false);

  useHotkey('mod+k', () => setPaletteOpen((v) => !v), []);
  useHotkey('/', () => setPaletteOpen(true), []);

  // Someone who has already opened a modal is engaged — do not interrupt them,
  // and never stack the exit prompt on top of another overlay.
  useEffect(() => {
    if (modal.name) setEngaged(true);
  }, [modal.name]);

  useExitIntent(() => setExitOpen(true), {
    enabled: !!config.integrations?.exitIntent?.enabled && !modal.name && !paletteOpen && !engaged,
    delay: 20000,
  });

  return (
    <div className="min-h-screen flex flex-col bg-surface-2">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2.5 focus:rounded-md focus:bg-brand-600 focus:text-white focus:font-bold focus:text-sm"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />

      <main id="main" className="flex-grow">
        <Sections />
      </main>

      <Footer />

      <ActionDock />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <BookingModal />
      <TriageModal />
      <DoseModal />
      <KitModal />
      <ExitIntentModal open={exitOpen} onClose={() => setExitOpen(false)} />

      <Toaster toasts={toasts} onDismiss={dismissToast} />

      <Suspense fallback={null}>
        <Studio />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
