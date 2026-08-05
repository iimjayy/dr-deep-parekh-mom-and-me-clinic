/**
 * SEO + structured data, generated from the tenant config.
 *
 * For a local practice this is the highest-leverage code in the repo: the
 * LocalBusiness / Physician / FAQPage graph is what produces the rich result
 * (stars, hours, "Open now", the map pin) on a "pediatrician near me" search.
 */

import { DAY_KEYS, hoursRows } from './utils';

const SCHEMA_DAY = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday',
  fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
};

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

export function buildStructuredData(config, origin) {
  const { brand, business, content, meta } = config;
  const contact = business.contact || {};
  const address = contact.address || {};
  const base = origin || meta?.canonical || '';

  const openingHours = [];
  for (const day of DAY_KEYS) {
    for (const slot of business.hours?.[day] || []) {
      openingHours.push({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${SCHEMA_DAY[day]}`,
        opens: slot.open,
        closes: slot.close,
      });
    }
  }

  const ratingStat = (content?.stats || []).find((s) => /rating/i.test(s.label || ''));
  const ratingValue = ratingStat ? parseFloat(String(ratingStat.value).replace(/[^\d.]/g, '')) : null;
  const reviewCount = ratingStat ? parseInt(String(ratingStat.subtext || '').replace(/\D/g, ''), 10) : null;

  const organization = {
    '@type': business.schemaType || 'LocalBusiness',
    '@id': `${base}#organization`,
    name: brand.legalName || `${brand.name} ${brand.nameAccent || ''}`.trim(),
    description: meta?.description,
    url: base || undefined,
    telephone: contact.phone,
    email: contact.email || undefined,
    image: content?.gallery?.[0]?.src ? `${base}${content.gallery[0].src}` : undefined,
    priceRange: business.pricing?.range || '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country || 'IN',
    },
    geo: address.lat && address.lng
      ? { '@type': 'GeoCoordinates', latitude: address.lat, longitude: address.lng }
      : undefined,
    openingHoursSpecification: openingHours.length ? openingHours : undefined,
    areaServed: business.areaServed?.map((name) => ({ '@type': 'Place', name })),
    sameAs: Object.values(business.social || {}).filter(Boolean),
    currenciesAccepted: business.pricing?.currency,
    paymentAccepted: business.pricing?.methods?.join(', '),
  };

  if (ratingValue && reviewCount) {
    organization.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  const professional = business.professional
    ? {
        '@type': business.professionalSchemaType || 'Person',
        '@id': `${base}#practitioner`,
        name: business.professional.name,
        jobTitle: business.professional.title,
        worksFor: { '@id': `${base}#organization` },
        image: business.professional.photo ? `${base}${business.professional.photo}` : undefined,
        alumniOf: business.professional.credentials?.map((c) => ({
          '@type': 'EducationalOrganization',
          name: c.issuer || c.label || c,
        })),
        knowsAbout: (content?.services || []).map((s) => s.title),
      }
    : null;

  const catalog = (content?.services || []).length
    ? {
        '@type': 'OfferCatalog',
        name: `${brand.name} services`,
        itemListElement: content.services.map((service, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': business.serviceSchemaType || 'Service',
            name: service.title,
            description: service.shortDesc,
          },
        })),
      }
    : null;

  const faqPage = (content?.faqs || []).length
    ? {
        '@type': 'FAQPage',
        '@id': `${base}#faq`,
        mainEntity: content.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      }
    : null;

  const website = {
    '@type': 'WebSite',
    '@id': `${base}#website`,
    url: base || undefined,
    name: meta?.title,
    publisher: { '@id': `${base}#organization` },
    inLanguage: config.i18n?.default || 'en',
  };

  if (catalog) organization.hasOfferCatalog = catalog;

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, professional, website, faqPage].filter(Boolean),
  };
}

/* ------------------------------------------------------------------ */
/* Head application                                                    */
/* ------------------------------------------------------------------ */

export function applySeo(config) {
  if (typeof document === 'undefined') return;
  const { meta = {}, brand = {}, business = {} } = config;
  const origin = typeof location !== 'undefined' ? location.origin : '';
  const canonical = meta.canonical || origin;

  document.title = meta.title || `${brand.name} ${brand.nameAccent || ''}`.trim();
  // The active locale wins — this runs on every config change, so defaulting to
  // config.i18n.default here would silently undo the language toggle.
  document.documentElement.lang = config.__locale || config.i18n?.default || 'en';

  upsertMeta('name', 'description', meta.description);
  upsertMeta('name', 'keywords', (meta.keywords || []).join(', '));
  upsertMeta('name', 'author', business.professional?.name || brand.name);
  upsertMeta('name', 'robots', meta.robots || 'index, follow, max-image-preview:large');
  upsertMeta('name', 'theme-color', brand.colors?.primary);
  upsertMeta('name', 'format-detection', 'telephone=yes');

  // Local pack signals
  const address = business.contact?.address || {};
  upsertMeta('name', 'geo.region', address.geoRegion || 'IN-MH');
  upsertMeta('name', 'geo.placename', address.locality);
  if (address.lat && address.lng) upsertMeta('name', 'geo.position', `${address.lat};${address.lng}`);

  // Open Graph
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:site_name', brand.name);
  upsertMeta('property', 'og:title', meta.title);
  upsertMeta('property', 'og:description', meta.description);
  upsertMeta('property', 'og:locale', (config.i18n?.default || 'en') === 'en' ? 'en_IN' : config.i18n.default);
  if (canonical) upsertMeta('property', 'og:url', canonical);
  if (meta.ogImage) upsertMeta('property', 'og:image', `${origin}${meta.ogImage}`);

  // Twitter
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', meta.title);
  upsertMeta('name', 'twitter:description', meta.description);
  if (meta.ogImage) upsertMeta('name', 'twitter:image', `${origin}${meta.ogImage}`);

  if (canonical) upsertLink('canonical', canonical);

  // JSON-LD graph
  let script = document.getElementById('structured-data');
  if (!script) {
    script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(buildStructuredData(config, canonical), null, 0);
}

/** Plain-text hours block, handy for the footer and for copy-to-clipboard. */
export const hoursSummary = (hours) =>
  hoursRows(hours)
    .map((row) => `${row.label}: ${row.text}`)
    .join('\n');
