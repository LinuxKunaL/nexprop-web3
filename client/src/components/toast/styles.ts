import { Platform } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { ToastPosition, ToastType } from './types';

export const ACCENT: Record<ToastType, string> = {
  success: '#1CA658',
  error: '#F74850',
  warning: '#F59E0B',
  processing: '#8E8E93',
};

export const DEFAULT_DURATION: Record<ToastType, number> = {
  success: 3000,
  error: 4000,
  warning: 3500,
  processing: 0,
};

export const ANIM = {
  travel: 64,
  enterSpring: { stiffness: 220, damping: 22, mass: 0.9 },
  iconSpring: { stiffness: 260, damping: 15, mass: 0.7, delay: 70 },
  exitDuration: 220,
  dragThreshold: 28,
};

export const OFFSET = { top: 48, bottom: 48 };

export const ALERT_ANIM = {
  enterDuration: 250,
  enterFromScale: 0.8,
  exitDuration: 150,
  exitToScale: 0.6,
};

export const ALERT_DEFAULTS = {
  duration: 3000,
  backdropOpacity: 0,
  iconSize: 64,
};

export const tw = {
  toast:
    'max-w-full flex-row items-center rounded-full bg-white px-3 py-2 dark:bg-neutral-800',

  textWrap: 'mx-3 shrink items-center',

  title: 'text-center text-[13px] font-semibold text-black dark:text-white',

  message:
    'mt-0.5 text-center text-[12px] text-neutral-600 dark:text-neutral-300',

  alertCard:
    'min-w-[175px] max-w-[80%] items-center rounded-3xl bg-white px-6 py-8 dark:bg-neutral-800',

  alertTextWrap: 'mt-5 items-center',

  alertTitle: 'text-center text-[16px] font-semibold text-black dark:text-white',

  alertMessage:
    'mt-0.5 text-center text-[14px] text-neutral-600 dark:text-neutral-300',
} as const;

export const VIEWPORT: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
};

export const STACK = (position: ToastPosition): ViewStyle => ({
  position: 'absolute',
  left: 0,
  right: 0,
  paddingHorizontal: 16,
  alignItems: 'center',
  ...(position === 'top' ? { top: 0 } : { bottom: 0 }),
});

export const ICON_WRAP = (size: number): ViewStyle => ({
  width: size,
  height: size,
  borderRadius: size / 2,
  alignItems: 'center',
  justifyContent: 'center',
});

export const ICON_BASE_SIZE = 32;

export const SHADOW: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  android: { elevation: 8 },
  default: {},
}) as ViewStyle;

export const STACK_GAP = 8;

export const GLYPH: Record<string, ViewStyle> = {
  check: {
    width: 13,
    height: 7,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: '#fff',
    borderBottomLeftRadius: 1,
    transform: [{ rotate: '-45deg' }],
    marginTop: -3,
  },
  crossBox: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossBar: {
    position: 'absolute',
    width: 15,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  bangStem: {
    width: 2.5,
    height: 9,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  bangDot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: '#fff',
    marginTop: 2.5,
  },
};
