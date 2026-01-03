// Telangana Yatri Design System - Colors (Vibrant Plum Purple & Modern Grey Theme)
export const colors = {
  // Primary Brand Colors - Vibrant Plum Purple (Luxury & Energetic)
  primary: {
    main: '#6B21A8',      // Rich Plum Purple (more vibrant than #5B2D8B)
    light: '#8B5CF6',     // Bright Purple (more vivid than #7C3AED)
    dark: '#581C87',      // Deep Plum (slightly brighter than #4C1D95)
    contrast: '#FFFFFF',
  },

  // Secondary Colors - Modern Grey with Warm Tones
  secondary: {
    main: '#F1F5F9',      // Warm Grey (softer than pure silver)
    light: '#F8FAFC',     // Light Warm Grey
    dark: '#CBD5E1',      // Medium Grey
    contrast: '#334155',  // Dark Slate
  },

  // Accent Colors - Vibrant Lavender & Dynamic Colors
  accent: {
    main: '#A855F7',      // Bright Lavender (more vibrant than #C4B5FD)
    light: '#C084FC',     // Vivid Lavender
    dark: '#9333EA',      // Rich Purple
    contrast: '#1F2937',  // Dark text
    women: '#A855F7',     // Women safety color (bright lavender)
    womenLight: '#C084FC', // Light women color
    womenDark: '#9333EA',  // Dark women color
    purple: '#8B5CF6',    // Purple accent
    ev: '#8B5CF6',        // Electric vehicle color
  },

  // Service Category Colors - Vibrant & Distinct
  services: {
    ride: '#6B21A8',      // Primary rich plum
    women: '#A855F7',     // Bright lavender accent
    ev: '#8B5CF6',        // Vivid purple
    driver: '#9333EA',    // Rich purple
    vehicle: '#7C3AED',   // Medium purple for vehicle rental
    tour: '#581C87',      // Deep plum
    intercity: '#7C3AED', // Medium purple
    parcel: '#A855F7',    // Bright lavender
    bus: '#8B5CF6',       // Vivid purple
  },

  // Semantic Colors - Bright & Accessible
  success: '#059669',     // Rich Emerald (brighter green)
  warning: '#D97706',     // Rich Amber (brighter orange)
  error: '#DC2626',       // Bright Red
  info: '#6B21A8',        // Primary plum

  // Neutral Colors - Clean White & Warm Grey
  background: {
    primary: '#FFFFFF',   // Pure White
    secondary: '#F8FAFC', // Light Warm Grey (brighter than #E5E7EB)
    tertiary: '#F1F5F9',  // Medium Warm Grey
    dark: '#334155',      // Dark Slate
  },

  text: {
    primary: '#334155',   // Dark Slate (better contrast)
    secondary: '#64748B', // Medium Slate
    tertiary: '#94A3B8',  // Light Slate
    inverse: '#FFFFFF',   // White
  },

  border: {
    light: '#E2E8F0',     // Light Grey
    medium: '#CBD5E1',    // Medium Grey
    dark: '#64748B',      // Dark Grey
  },

  // Overlay - Vibrant with theme colors
  overlay: 'rgba(107, 33, 168, 0.7)',  // Rich plum overlay
  overlayLight: 'rgba(107, 33, 168, 0.5)',
};

// Dark Mode Colors - Adapted to Vibrant Plum Purple & Modern Grey Theme
export const darkColors = {
  ...colors,
  background: {
    primary: '#0F172A',    // Rich Dark Blue-Grey
    secondary: '#1E293B',  // Medium dark slate
    tertiary: '#334155',   // Light dark slate
    dark: '#020617',      // Very dark
  },
  text: {
    primary: '#F8FAFC',    // Off-white
    secondary: '#CBD5E1',  // Light grey
    tertiary: '#94A3B8',   // Medium light grey
    inverse: '#0F172A',    // Dark background
  },
  border: {
    light: '#334155',      // Medium dark slate
    medium: '#475569',     // Light dark slate
    dark: '#64748B',       // Very light dark slate
  },
};

