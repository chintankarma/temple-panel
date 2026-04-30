/**
 * ─────────────────────────────────────────────────────────────
 *  TEMPLE GUIDE — Design System Colors
 *  Single source of truth for all color tokens.
 *
 *  Brand colors are sourced from the Flutter app's color_res.dart
 *  to ensure pixel-perfect consistency across web and mobile.
 * ─────────────────────────────────────────────────────────────
 */

// ── Raw Brand Palette (from color_res.dart) ─────────────────
export const Palette = {
  primary:      '#FF8044',  // primaryColor
  secondary:    '#F64721',  // secondaryColor
  grey:         '#999999',  // greyColor
  lightGrey:    '#F2F2F2',  // lightGreyColor
  yellow:       '#FFD700',  // yellowColor
  success:      '#00C853',  // successColor
  error:        '#B3261E',  // errorColor
  link:         '#0A78F9',  // linkColor
} as const;

// ── Design System Tokens ─────────────────────────────────────
export const C = {

  // ── Background ────────────────────────────────────────────
  bgPage:        'bg-white dark:bg-[#0a0c10]',
  bgCard:        'bg-white dark:bg-[#12141c]',
  bgCardHover:   'hover:bg-slate-50 dark:hover:bg-slate-800/40',
  bgInput:       'bg-slate-50/50 dark:bg-slate-900/40',
  bgSidebar:     'bg-slate-50 dark:bg-[#0d0f14] sidebar-gradient',
  bgHeader:      'bg-white/70 dark:bg-[#0a0c10]/70',
  bgOverlay:     'bg-slate-950/50 dark:bg-slate-950/70',
  bgMuted:       'bg-slate-100 dark:bg-slate-900/60',

  // ── Border (Enhanced Contrast) ────────────────────────────
  border:        'border-slate-300 dark:border-slate-700/70',
  borderSubtle:  'border-slate-200 dark:border-slate-800/70',
  borderInput:   'border-slate-400 dark:border-slate-600',
  borderDivider: 'border-slate-300 dark:border-slate-800',

  // ── Text (Enhanced Contrast) ──────────────────────────────
  textPrimary:   'text-slate-900 dark:text-slate-50',
  textSecondary: 'text-slate-600 dark:text-slate-400',
  textMuted:     'text-slate-500 dark:text-slate-500',
  textHeading:   'text-slate-900 dark:text-slate-50',
  textLabel:     'text-slate-800 dark:text-slate-200',

  // ── Brand Primary (#FF8044) ───────────────────────────────
  brandText:      'text-[#FF8044] dark:text-[#FF8044]',
  brandBg:        'bg-[#FF8044] hover:bg-[#F64721]',
  brandBgSubtle:  'bg-[#FF8044]/10 dark:bg-[#FF8044]/20',
  brandBorder:    'border-[#FF8044]/40 dark:border-[#FF8044]/50',
  brandTextLight: 'text-[#FF8044]',
  brandGradient:  'bg-gradient-to-r from-[#FF8044] to-[#F64721]',
  brandShadow:    'shadow-[#FF8044]/30',

  // ── Nav & Tab States ──────────────────────────────────────
  navActive:     'bg-[#FF8044] text-white shadow-lg shadow-[#FF8044]/40',
  navInactive:   'text-slate-600 dark:text-slate-400 hover:text-[#FF8044] dark:hover:text-[#FF8044] hover:bg-[#FF8044]/10 dark:hover:bg-slate-800/60',

  tabActive:     'border-[#FF8044] text-[#FF8044] bg-[#FF8044]/10 dark:bg-[#FF8044]/20 dark:text-[#FF8044]',
  tabInactive:   'border-transparent text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40',

  // ── Button Variants ───────────────────────────────────────
  btnPrimary:    'bg-gradient-to-r from-[#FF8044] to-[#F64721] hover:from-[#F64721] hover:to-[#FF8044] text-white shadow-lg shadow-[#FF8044]/30',
  btnSecondary:  'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600',
  btnGhost:      'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
  btnDanger:     'bg-gradient-to-r from-[#B3261E] to-[#F64721] hover:opacity-90 text-white shadow-lg shadow-[#B3261E]/30',

  // ── Status Colors (More saturated for presence) ───────────
  successBg:     'bg-[#00C853]/15 dark:bg-[#00C853]/20',
  successBorder: 'border-[#00C853]/30 dark:border-[#00C853]/40',
  successText:   'text-[#004D40] dark:text-[#00E676]', // Darker text on light bg for readability

  errorBg:       'bg-[#B3261E]/15 dark:bg-[#B3261E]/20',
  errorBorder:   'border-[#B3261E]/30 dark:border-[#B3261E]/40',
  errorText:     'text-[#B71C1C] dark:text-[#FF5252]',

  warningBg:     'bg-[#FF8044]/15 dark:bg-[#FF8044]/20',
  warningBorder: 'border-[#FF8044]/30 dark:border-[#FF8044]/40',
  warningText:   'text-[#E65100] dark:text-[#FFAB40]',

  infoBg:        'bg-[#0A78F9]/15 dark:bg-[#0A78F9]/20',
  infoBorder:    'border-[#0A78F9]/30 dark:border-[#0A78F9]/40',
  infoText:      'text-[#0D47A1] dark:text-[#448AFF]',

  // ── Misc ──────────────────────────────────────────────────
  iconOrange:    'bg-[#FF8044]/15 text-[#FF8044]',
  iconIndigo:    'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400',
  iconEmerald:   'bg-[#00C853]/15 text-[#00C853]',

  focusRing:     'focus:ring-4 focus:ring-[#FF8044]/30 focus:border-[#FF8044]',
  scrollbarThumb: 'rgba(255, 128, 68, 0.3)',
  scrollbarHover: 'rgba(255, 128, 68, 0.6)',

  transition:    'transition-all duration-300',
  roundedCard:   'rounded-[2.5rem]',
  roundedCardLg: 'rounded-[3rem]',
  roundedCardMd: 'rounded-[2rem]',
  shadowCard:    'shadow-2xl shadow-slate-200/60 dark:shadow-none',
  shadowCardSm:  'shadow-xl shadow-slate-200/50 dark:shadow-none',
  shadowSidebar: 'shadow-2xl shadow-slate-200/50 dark:shadow-none',
};
