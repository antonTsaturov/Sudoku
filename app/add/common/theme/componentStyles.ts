/**
 * Reusable component styles for common elements
 * Ensures consistency and reduces duplication across the app
 */


import { StyleSheet, ViewStyle } from 'react-native';
import { colors } from './colors';

export const componentStyles = StyleSheet.create({
  // ============ BUTTONS ============
  buttonBase: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minHeight: 48,
    elevation: 3,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  } as ViewStyle,

  buttonPrimary: {
    backgroundColor: colors.primary,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  } as ViewStyle,

  buttonPrimaryText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: '600',
  },

  buttonSecondary: {
    backgroundColor: colors.buttonDisabled,
    borderWidth: 1.5,
    borderColor: colors.border,
  } as ViewStyle,

  buttonSecondaryText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },

  buttonDisabled: {
    backgroundColor: colors.buttonDisabled,
    opacity: 0.6,
  } as ViewStyle,

  buttonDisabledText: {
    color: colors.buttonDisabledText,
    fontSize: 16,
    fontWeight: '600',
  },

  // ============ SMALL BUTTONS ============
  buttonSmall: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    minHeight: 40,
  } as ViewStyle,

  buttonSmallText: {
    fontSize: 14,
    fontWeight: '500',
  },

  // ============ ICON BUTTONS ============
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  } as ViewStyle,

  iconButtonSecondary: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  } as ViewStyle,

  // ============ INPUT FIELDS ============
  inputBase: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: colors.text,
    elevation: 1,
  },

  inputFocused: {
    borderColor: colors.primary,
    elevation: 2,
  },

  // ============ CARDS ============
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  } as ViewStyle,

  // ============ MODALS ============
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlay,
  } as ViewStyle,

  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    elevation: 5,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    minWidth: '80%',
    maxWidth: '90%',
  } as ViewStyle,

  // ============ TEXT ============
  textLarge: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },

  textMedium: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },

  textSmall: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },

  textXSmall: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textTertiary,
  },

  // ============ CONTAINERS ============
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
  } as ViewStyle,

  containerSecure: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  } as ViewStyle,

  // ============ DIVIDERS ============
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 8,
  } as ViewStyle,

  dividerThick: {
    height: 2,
    backgroundColor: colors.border,
    marginVertical: 12,
  } as ViewStyle,

  // ============ SEPARATORS ============
  separator: {
    height: 1,
    backgroundColor: colors.border,
  } as ViewStyle,
});

export type ComponentStyleKey = keyof typeof componentStyles;
