/**
 * Section registry.
 *
 * `config.sections` is an ordered list of `{ id, component, enabled, nav }`.
 * This map turns the `component` string into a React component, which is what
 * lets a tenant reorder, drop or add whole page sections as data.
 *
 * To add a new section type: build the component, register it here, then
 * reference it from a tenant's `sections` array.
 */

import Hero from './sections/Hero';
import { LogoStrip, Stats, Process, Cta } from './sections/Basics';
import Services from './sections/Services';
import About from './sections/About';
import Gallery, { BeforeAfter } from './sections/Gallery';
import Reviews from './sections/Reviews';
import Faq, { Resources } from './sections/Faq';
import Location from './sections/Location';
import Pricing from './sections/Pricing';
import ToolsHub from './sections/tools/ToolsHub';
import GrowthTool from './sections/tools/GrowthTool';
import VaccineTracker from './sections/tools/VaccineTracker';
import Milestones from './sections/tools/Milestones';

export const SECTION_REGISTRY = {
  hero: Hero,
  logoStrip: LogoStrip,
  stats: Stats,
  services: Services,
  about: About,
  process: Process,
  gallery: Gallery,
  beforeAfter: BeforeAfter,
  reviews: Reviews,
  resources: Resources,
  faq: Faq,
  location: Location,
  pricing: Pricing,
  toolsHub: ToolsHub,
  growthTool: GrowthTool,
  vaccineTracker: VaccineTracker,
  milestones: Milestones,
  cta: Cta,
};

export const SECTION_TYPES = Object.keys(SECTION_REGISTRY);
