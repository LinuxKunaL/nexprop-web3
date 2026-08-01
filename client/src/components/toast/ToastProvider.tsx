import React, {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import {
  ALERT_DEFAULTS,
  DEFAULT_DURATION,
  OFFSET,
  STACK,
  VIEWPORT,
} from './styles';
import { AlertItem } from './AlertItem';
import { ToastItem } from './ToastItem';
import type {
  Alert,
  AlertOptions,
  Toast,
  ToastContextValue,
  ToastOptions,
  ToastPosition,
  ToastPromiseArg,
  ToastPromiseContent,
  ToastPromiseOptions,
  ToastShorthand,
  ToastType,
} from './types';

export const ToastContext = createContext<ToastContextValue | null>(null);

function fireHaptic(type: ToastType) {
  if (type === 'processing') return;
  try {
    const Haptics = require('expo-haptics');
    const key =
      type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Warning';
    Haptics.notificationAsync(Haptics.NotificationFeedbackType[key]);
  } catch {}
}

function resolveArg<T>(
  arg: ToastPromiseArg<T>,
  value: T
): ToastPromiseContent {
  const resolved = typeof arg === 'function' ? arg(value) : arg;
  return typeof resolved === 'string' ? { title: resolved } : resolved;
}

export interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
  defaultPosition?: ToastPosition;
  topOffset?: number;
  bottomOffset?: number;
}

export function ToastProvider({
  children,
  maxToasts = 3,
  defaultPosition = 'top',
  topOffset = OFFSET.top,
  bottomOffset = OFFSET.bottom,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [alertState, setAlertState] = useState<Alert | null>(null);
  const counter = useRef(0);

  const hide = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
    );
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const hideAll = useCallback(() => {
    setToasts((prev) => prev.map((t) => ({ ...t, visible: false })));
  }, []);

  const show = useCallback(
    (options: ToastOptions): string => {
      const type = options.type ?? 'success';
      const id = options.id ?? `toast-${++counter.current}`;

      const next: Toast = {
        id,
        type,
        title: options.title,
        message: options.message,
        duration: options.duration ?? DEFAULT_DURATION[type],
        position: options.position ?? defaultPosition,
        dismissible: options.dismissible ?? true,
        haptic: options.haptic ?? true,
        icon: options.icon,
        accentColor: options.accentColor,
        onPress: options.onPress,
        onHide: options.onHide,
        visible: true,
        updatedAt: Date.now(),
      };

      if (next.haptic) fireHaptic(type);

      setToasts((prev) => {
        const existing = prev.findIndex((t) => t.id === id);
        if (existing !== -1) {
          const copy = [...prev];
          copy[existing] = next;
          return copy;
        }

        const list = [...prev, next];
        const live = list.filter((t) => t.visible);
        if (live.length <= maxToasts) return list;

        const doomed = new Set(
          live.slice(0, live.length - maxToasts).map((t) => t.id)
        );
        return list.map((t) =>
          doomed.has(t.id) ? { ...t, visible: false } : t
        );
      });

      return id;
    },
    [defaultPosition, maxToasts]
  );

  const update = useCallback((id: string, options: Partial<ToastOptions>) => {
    setToasts((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const type = options.type ?? t.type;
        return {
          ...t,
          ...options,
          type,
          duration: options.duration ?? DEFAULT_DURATION[type],
          visible: true,
          updatedAt: Date.now(),
        };
      })
    );
    if (options.type) fireHaptic(options.type);
  }, []);

  const alert = useCallback((options: AlertOptions): string => {
    const type = options.type ?? 'success';
    const id = `alert-${++counter.current}`;

    if (options.haptic ?? true) fireHaptic(type);

    setAlertState({
      id,
      type,
      title: options.title,
      message: options.message,
      duration: options.duration ?? ALERT_DEFAULTS.duration,
      dismissible: options.dismissible ?? true,
      haptic: options.haptic ?? true,
      icon: options.icon,
      accentColor: options.accentColor,
      backdropOpacity: options.backdropOpacity ?? ALERT_DEFAULTS.backdropOpacity,
      onPress: options.onPress,
      onHide: options.onHide,
      visible: true,
      updatedAt: Date.now(),
    });

    return id;
  }, []);

  const updateAlert = useCallback((options: Partial<AlertOptions>) => {
    setAlertState((prev) => {
      if (!prev) return prev;
      const type = options.type ?? prev.type;
      return {
        ...prev,
        ...options,
        type,
        duration: options.duration ?? ALERT_DEFAULTS.duration,
        visible: true,
        updatedAt: Date.now(),
      };
    });
    if (options.type) fireHaptic(options.type);
  }, []);

  const dismissAlert = useCallback(() => {
    setAlertState((prev) => (prev ? { ...prev, visible: false } : prev));
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlertState((prev) => (prev && prev.id === id ? null : prev));
  }, []);

  const shorthand = useCallback(
    (type: ToastType): ToastShorthand =>
      (title, message, options) =>
        show({ ...options, title, message, type }),
    [show]
  );

  const promise = useCallback(
    async <T,>(
      input: Promise<T>,
      options: ToastPromiseOptions<T>
    ): Promise<T> => {
      const asAlert = options.presentation === 'alert';
      const loading =
        typeof options.loading === 'string'
          ? { title: options.loading }
          : options.loading;

      const id = asAlert
        ? alert({ ...loading, type: 'processing', duration: loading.duration ?? 0 })
        : show({ ...loading, type: 'processing' });

      const settle = (content: ToastPromiseContent, type: ToastType) => {
        if (asAlert) updateAlert({ ...content, type });
        else update(id, { ...content, type });
      };

      try {
        const value = await input;
        settle(resolveArg(options.success, value), 'success');
        return value;
      } catch (err) {
        settle(resolveArg(options.error, err), 'error');
        throw err;
      }
    },
    [show, update, alert, updateAlert]
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      toasts,
      alertState,
      show,
      success: shorthand('success'),
      error: shorthand('error'),
      warning: shorthand('warning'),
      processing: shorthand('processing'),
      promise,
      update,
      hide,
      hideAll,
      alert,
      updateAlert,
      dismissAlert,
    }),
    [
      toasts,
      alertState,
      show,
      shorthand,
      promise,
      update,
      hide,
      hideAll,
      alert,
      updateAlert,
      dismissAlert,
    ]
  );

  const top = toasts.filter((t) => t.position === 'top');
  const bottom = toasts.filter((t) => t.position === 'bottom').reverse();

  return (
    <ToastContext.Provider value={value}>
      {children}

      <View style={VIEWPORT} pointerEvents="box-none">
        <View
          style={[STACK('top'), { paddingTop: topOffset }]}
          pointerEvents="box-none"
        >
          {top.map((t) => (
            <ToastItem
              key={t.id}
              toast={t}
              onDismiss={hide}
              onRemove={remove}
            />
          ))}
        </View>

        <View
          style={[STACK('bottom'), { paddingBottom: bottomOffset }]}
          pointerEvents="box-none"
        >
          {bottom.map((t) => (
            <ToastItem
              key={t.id}
              toast={t}
              onDismiss={hide}
              onRemove={remove}
            />
          ))}
        </View>

        {alertState && (
          <AlertItem
            key={alertState.id}
            alert={alertState}
            onDismiss={dismissAlert}
            onRemove={() => removeAlert(alertState.id)}
          />
        )}
      </View>
    </ToastContext.Provider>
  );
}
