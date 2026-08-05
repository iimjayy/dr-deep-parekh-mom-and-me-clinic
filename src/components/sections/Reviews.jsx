import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';
import { Button, Icon, Badge, Card, Stars, Reveal, Section, SectionHeader, Tabs, ProgressBar } from '../ui';

export default function Reviews({ section }) {
  const { config, openBooking, t, track } = useApp();
  const reviews = config.content.reviews || [];
  const stats = config.content.stats || [];
  const [filter, setFilter] = useState('all');
  const [helpful, setHelpful] = useState({});

  const ratingStat = stats.find((stat) => /rating/i.test(stat.label || ''));
  const average = useMemo(
    () => (reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0),
    [reviews],
  );

  const tags = useMemo(() => {
    const counts = new Map();
    for (const review of reviews) {
      for (const tag of review.tags || []) counts.set(tag, (counts.get(tag) || 0) + 1);
    }
    return [
      { value: 'all', label: 'All reviews', count: reviews.length },
      ...[...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tag, count]) => ({ value: tag, label: tag, count })),
    ];
  }, [reviews]);

  const visible = filter === 'all' ? reviews : reviews.filter((review) => (review.tags || []).includes(filter));

  const distribution = useMemo(() => {
    const buckets = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((review) => Math.round(review.rating) === star).length,
    }));
    return buckets.map((bucket) => ({ ...bucket, pct: reviews.length ? (bucket.count / reviews.length) * 100 : 0 }));
  }, [reviews]);

  if (!reviews.length) return null;

  const markHelpful = (id) => {
    setHelpful((prev) => ({ ...prev, [id]: !prev[id] }));
    track('review_helpful', { id });
  };

  return (
    <Section id={section?.id} tone="raised">
      <SectionHeader
        eyebrow={t('section.reviews', 'What parents say')}
        eyebrowIcon="Quote"
        title="Trusted by families"
        titleAccent="across Vasai-Virar"
        sub="Unedited reviews from parents who have brought their children here — the good and the specific."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ------------------------------------------ summary */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <Reveal variant="left">
            <Card className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div>
                  <span className="block font-heading font-extrabold text-5xl text-ink leading-none tabular-nums">
                    {(ratingStat ? parseFloat(ratingStat.value) : average).toFixed(1)}
                  </span>
                  <Stars rating={5} className="mt-2" />
                </div>
                <div className="text-xs text-ink-muted leading-relaxed border-l border-line pl-4">
                  {ratingStat?.subtext || `${reviews.length} reviews`}
                  <span className="block font-bold text-ink mt-1">Google verified</span>
                </div>
              </div>

              <div className="space-y-1.5">
                {distribution.map((bucket) => (
                  <div key={bucket.star} className="flex items-center gap-2.5">
                    <span className="text-[11px] font-bold text-ink-muted w-3 tabular-nums">{bucket.star}</span>
                    <Icon name="Star" className="w-3 h-3 text-highlight-500 fill-current flex-shrink-0" />
                    <ProgressBar value={bucket.pct} tone="warn" className="flex-1" label={`${bucket.star} star reviews`} />
                    <span className="text-[11px] text-ink-muted w-5 text-right tabular-nums">{bucket.count}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-line space-y-2.5">
                <p className="text-[13px] text-ink-soft leading-relaxed">
                  Reviews mention the painless vaccination technique more than anything else.
                </p>
                <Button onClick={() => openBooking({ source: 'reviews' })} full icon="CalendarCheck" size="sm">
                  Book your visit
                </Button>
              </div>
            </Card>
          </Reveal>
        </div>

        {/* ------------------------------------------ list */}
        <div className="lg:col-span-8 space-y-5">
          {tags.length > 2 && (
            <Reveal>
              <Tabs tabs={tags} value={filter} onChange={setFilter} size="sm" />
            </Reveal>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visible.map((review, index) => (
              <Reveal key={review.id} delay={(index % 2) * 80} as="article">
                <Card hover className="p-5 h-full flex flex-col gap-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-600 text-white font-heading font-extrabold flex items-center justify-center flex-shrink-0">
                        {review.author.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-ink truncate flex items-center gap-1.5">
                          {review.author}
                          {review.verified && (
                            <Icon name="BadgeCheck" className="w-3.5 h-3.5 text-accent-600 dark:text-accent-400 flex-shrink-0" />
                          )}
                        </p>
                        <p className="text-[11px] text-ink-muted truncate">{review.relation}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-ink-muted whitespace-nowrap pt-1">{review.date}</span>
                  </div>

                  <Stars rating={review.rating} size="w-3.5 h-3.5" />

                  <p className="text-[13px] text-ink-soft leading-relaxed flex-1">“{review.text}”</p>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-line">
                    <div className="flex flex-wrap gap-1.5">
                      {(review.tags || []).map((tag) => (
                        <Badge key={tag} tone="neutral" size="xs">{tag}</Badge>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => markHelpful(review.id)}
                      className={cn(
                        'flex items-center gap-1.5 text-[11px] font-bold transition-colors cursor-pointer flex-shrink-0',
                        helpful[review.id] ? 'text-brand-600 dark:text-brand-400' : 'text-ink-muted hover:text-ink',
                      )}
                      aria-pressed={!!helpful[review.id]}
                    >
                      <Icon name="ThumbsUp" className={cn('w-3.5 h-3.5', helpful[review.id] && 'fill-current')} />
                      {(review.helpfulCount || 0) + (helpful[review.id] ? 1 : 0)}
                    </button>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          {config.business.social?.google && (
            <Reveal delay={120}>
              <a
                href={config.business.social.google}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('google_reviews_click')}
                className="flex items-center justify-center gap-2 text-xs font-bold text-ink-soft hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-3"
              >
                Read every review on Google
                <Icon name="ArrowUpRight" className="w-3.5 h-3.5" />
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
