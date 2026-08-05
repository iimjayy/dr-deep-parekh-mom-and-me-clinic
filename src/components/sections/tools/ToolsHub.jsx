import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Icon, Badge, Card, Reveal, Section, SectionHeader, FootNote } from '../../ui';

export default function ToolsHub({ section }) {
  const { config, openModal, t, track } = useApp();
  const hub = config.tools?.hub || {};
  const items = hub.items || [];
  if (!items.length) return null;

  const activate = (item) => {
    track('tool_open', { tool: item.id });
    if (item.action === 'modal') openModal(item.target, { source: 'tools_hub' });
    else document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Section id={section?.id} tone="inset" decorated>
      <SectionHeader
        eyebrow={t('section.tools', 'Free for parents')}
        eyebrowIcon="Wand2"
        title={hub.title}
        sub={hub.sub}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={(index % 3) * 90}>
            <button type="button" onClick={() => activate(item)} className="w-full h-full text-left cursor-pointer group">
              <Card hover className="p-6 h-full flex flex-col gap-3.5 relative overflow-hidden">
                <div className="flex items-start justify-between gap-3">
                  <span className="w-12 h-12 rounded-lg bg-surface-3 border border-line text-brand-700 dark:text-brand-300 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-colors">
                    <Icon name={item.icon} className="w-5 h-5" />
                  </span>
                  {item.badge && <Badge tone="highlight" size="xs">{item.badge}</Badge>}
                </div>

                <div className="flex-1">
                  <h3 className="font-heading font-extrabold text-base text-ink leading-snug">{item.title}</h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed mt-1.5">{item.desc}</p>
                </div>

                <span className="flex items-center gap-1.5 text-xs font-bold text-brand-700 dark:text-brand-300">
                  {item.action === 'modal' ? 'Open tool' : 'Jump to tool'}
                  <Icon name="ArrowRight" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Card>
            </button>
          </Reveal>
        ))}
      </div>

      {config.legal?.privacyNote && (
        <Reveal delay={200} className="mt-8 max-w-3xl mx-auto">
          <FootNote icon="Lock">{config.legal.privacyNote}</FootNote>
        </Reveal>
      )}
    </Section>
  );
}
