import { AxiosError } from "axios";
import type { ReactNode } from "react";

export type ToastType = "success" | "error" | "warning" | "processing";

export type ToastPosition = "top" | "bottom";

export interface ToastOptions {
  title: string;
  message?: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
  haptic?: boolean;
  icon?: ReactNode;
  accentColor?: string;
  onPress?: () => void;
  onHide?: () => void;
  id?: string;
}

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration: number;
  position: ToastPosition;
  dismissible: boolean;
  haptic: boolean;
  icon?: ReactNode;
  accentColor?: string;
  onPress?: () => void;
  onHide?: () => void;
  visible: boolean;
  updatedAt: number;
}

export interface AlertOptions {
  title: string;
  message?: string;
  type?: ToastType;
  duration?: number;
  dismissible?: boolean;
  haptic?: boolean;
  icon?: ReactNode;
  accentColor?: string;
  backdropOpacity?: number;
  onPress?: () => void;
  onHide?: () => void;
}

export interface Alert {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration: number;
  dismissible: boolean;
  haptic: boolean;
  icon?: ReactNode;
  accentColor?: string;
  backdropOpacity: number;
  onPress?: () => void;
  onHide?: () => void;
  visible: boolean;
  updatedAt: number;
}

export type ToastPromiseContent = Omit<
  ToastOptions,
  "type" | "position" | "id"
>;

export type ToastPromiseArg<T> =
  | string
  | ToastPromiseContent
  | ((value: T) => string | ToastPromiseContent);

export interface ToastPromiseOptions<T, TError> {
  loading: string | ToastPromiseContent;
  success: ToastPromiseArg<T>;
  error: ToastPromiseArg<TError>;
  presentation?: "toast" | "alert";
}

export type ToastShorthand = (
  title: string,
  message?: string,
  options?: Partial<Omit<ToastOptions, "title" | "message" | "type">>,
) => string;

export interface ToastContextValue {
  toasts: Toast[];
  alertState: Alert | null;
  show: (options: ToastOptions) => string;
  success: ToastShorthand;
  error: ToastShorthand;
  warning: ToastShorthand;
  processing: ToastShorthand;
  promise: <T, TError>(
    promise: Promise<T>,
    options: ToastPromiseOptions<T, TError>,
  ) => Promise<T>;
  update: (id: string, options: Partial<ToastOptions>) => void;
  hide: (id: string) => void;
  hideAll: () => void;

  alert: (options: AlertOptions) => string;
  updateAlert: (options: Partial<AlertOptions>) => void;
  dismissAlert: () => void;
}
