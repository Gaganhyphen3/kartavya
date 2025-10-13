import { DefaultTheme } from 'react-native-paper';

export const colors = {
  primary: '#0077B6',        // Civic Blue
  accent: '#00B894',         // Emerald Green
  success: '#00B894',        // Emerald Green
  warning: '#FDCB2D',        // Sun Yellow
  error: '#E74C3C',          // Red for errors
  neutral: '#636E72',        // Urban Gray
  background: '#FFFFFF',     // White
  surface: '#FFFFFF',        // White
  text: '#2D3436',          // Dark text
  textSecondary: '#636E72',  // Urban Gray
  badge: '#E17055',          // Civic Orange
  darkBg: '#1E2A38',        // Midnight Blue
  mapOverlay: '#74B9FF',     // Sky Cyan
  resolved: '#A3CB38',       // Soft Lime
  border: '#DDD',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    onSurface: colors.text,
    placeholder: colors.textSecondary,
    backdrop: colors.overlay,
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'Poppins-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Poppins-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Poppins-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Poppins-Regular',
      fontWeight: 'normal',
    },
  },
  roundness: 12,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: colors.text,
  },
  h2: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
  },
  h3: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
  },
  h4: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: colors.text,
  },
  body1: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.text,
  },
  body2: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: colors.textSecondary,
  },
  button: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    textTransform: 'none',
  },
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.27,
    elevation: 8,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10.32,
    elevation: 12,
  },
};