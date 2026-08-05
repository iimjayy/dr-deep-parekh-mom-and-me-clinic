/**
 * Curated icon registry.
 *
 * Tenant configs reference icons by name (`icon: 'Syringe'`), so we need a
 * string → component map. Importing named icons keeps the production bundle
 * small; `import * as` from lucide-react would pull in ~1,500 components.
 */

import {
  Activity, AlarmClock, Ambulance, Apple, ArrowLeft, ArrowRight, ArrowUpRight, Award,
  Baby, BadgeCheck, Bandage, Bell, BookOpen, Brain, Briefcase, Building2,
  Calculator, Calendar, CalendarCheck, CalendarClock, Camera, Car, Check, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Circle, CircleDot, Clock, Compass,
  Copy, CreditCard, Croissant, Crown, Download, Droplet, Dumbbell, Ear,
  Eye, Facebook, FileText, Filter, Flame, Flower2, Gauge, Gift,
  GraduationCap, Grid2x2, Hand, HandHeart, Heart, HeartHandshake, HeartPulse, Home,
  Hospital, Image as ImageIcon, Info, Instagram, Languages, Laptop, Leaf, Lightbulb,
  Link as LinkIcon, Linkedin, ListChecks, Loader2, Lock, Mail, MapPin, Maximize2,
  Menu, MessageCircle, MessageSquare, Mic, Minus, Monitor, Moon, Navigation,
  Palette, PartyPopper, PawPrint, Pencil, Phone, PhoneCall, PiggyBank, Play,
  Plus, Printer, Quote, RefreshCw, Ribbon, Rocket, Ruler, Scale,
  Scissors, Search, Send, Settings, Share2, Shield, ShieldCheck, ShoppingBag,
  Smile, Sparkles, Star, Stethoscope, Sun, Syringe, Target, Thermometer,
  ThumbsUp, Timer, ToyBrick, TrendingUp, Trophy, Truck, Users, Utensils,
  Video, Wallet, Wand2, Watch, Waves, Wind, X, Zap,
} from 'lucide-react';

export const ICONS = {
  Activity, AlarmClock, Ambulance, Apple, ArrowLeft, ArrowRight, ArrowUpRight, Award,
  Baby, BadgeCheck, Bandage, Bell, BookOpen, Brain, Briefcase, Building2,
  Calculator, Calendar, CalendarCheck, CalendarClock, Camera, Car, Check, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Circle, CircleDot, Clock, Compass,
  Copy, CreditCard, Croissant, Crown, Download, Droplet, Dumbbell, Ear,
  Eye, Facebook, FileText, Filter, Flame, Flower2, Gauge, Gift,
  GraduationCap, Grid2x2, Hand, HandHeart, Heart, HeartHandshake, HeartPulse, Home,
  Hospital, Image: ImageIcon, Info, Instagram, Languages, Laptop, Leaf, Lightbulb,
  Link: LinkIcon, Linkedin, ListChecks, Loader2, Lock, Mail, MapPin, Maximize2,
  Menu, MessageCircle, MessageSquare, Mic, Minus, Monitor, Moon, Navigation,
  Palette, PartyPopper, PawPrint, Pencil, Phone, PhoneCall, PiggyBank, Play,
  Plus, Printer, Quote, RefreshCw, Ribbon, Rocket, Ruler, Scale,
  Scissors, Search, Send, Settings, Share2, Shield, ShieldCheck, ShoppingBag,
  Smile, Sparkles, Star, Stethoscope, Sun, Syringe, Target, Thermometer,
  ThumbsUp, Timer, ToyBrick, TrendingUp, Trophy, Truck, Users, Utensils,
  Video, Wallet, Wand2, Watch, Waves, Wind, X, Zap,
};

/** Resolve an icon name from config; falls back to a neutral dot. */
export const getIcon = (name, fallback = 'CircleDot') => ICONS[name] || ICONS[fallback] || Circle;

export const ICON_NAMES = Object.keys(ICONS).sort();
