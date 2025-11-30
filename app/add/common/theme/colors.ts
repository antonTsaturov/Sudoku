/**
 * Unified color palette for the Sudoku application
 * Ensures consistent styling across all screens and components
 */

export const colors = {
  // Primary colors
  primary: '#6A7FDB',
  primaryLight: '#8B9EEC',
  primaryDark: '#4A5FB8',

  // Secondary colors
  secondary: '#FF6B6B',
  secondaryLight: '#FF8E8E',
  secondaryDark: '#EE5A52',

  // Success/Valid colors
  success: '#51CF66',
  successLight: '#7FD878',
  successDark: '#37B24D',

  // Error/Invalid colors
  error: '#FF6B6B',
  errorLight: '#FF8E8E',
  errorDark: '#FA5252',

  // Warning colors
  warning: '#FFD93D',
  warningLight: '#FFE066',
  warningDark: '#F9CA24',

  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  backgroundTertiary: '#EEEFF2',
  
  // Text colors
  text: '#212121',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textLight: '#FFFFFF',

  // Border colors
  border: '#E0E0E0',
  borderLight: '#F0F0F0',

  // Highlight/Selection colors
  highlight: '#6C96DC',
  highlightLight: 'rgba(108, 150, 220, 0.3)',
  highlightDark: 'rgba(108, 150, 220, 0.5)',
  
  // Cell states
  cellDefault: '#FFFFFF',
  cellActive: 'rgba(108, 150, 220, 0.5)',
  cellHighlight: 'rgba(168, 212, 171, 0.5)',
  cellError: 'rgba(255, 150, 150, 0.5)',
  cellDraft: 'rgba(108, 150, 220, 0.3)',

  // Transparency utilities
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlay70: 'rgba(0, 0, 0, 0.7)',

  // Button states
  buttonEnabled: '#6A7FDB',
  buttonDisabled: '#E0E0E0',
  buttonDisabledText: '#BDBDBD',
};

export type ColorKey = keyof typeof colors;
