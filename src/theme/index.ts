// Telangana Yatri Design System - Main Theme Export
import { colors, darkColors } from './colors';
import { typography, fonts, fontSizes, lineHeights, fontWeights } from './typography';
import { spacing, borderRadius, shadows, iconSizes, sizes, zIndex } from './spacing';

export const theme = {
  colors,
  darkColors,
  typography,
  fonts,
  fontSizes,
  lineHeights,
  fontWeights,
  spacing,
  borderRadius,
  shadows,
  iconSizes,
  sizes,
  zIndex,
};

export type Theme = typeof theme;

export default theme;
