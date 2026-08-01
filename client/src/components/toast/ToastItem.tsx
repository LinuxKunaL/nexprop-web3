import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Easing,
  PanResponder,
  Pressable,
  Text,
  View,
} from 'react-native';
import { ANIM, SHADOW, STACK_GAP, tw } from './styles';
import { ToastIcon } from './ToastIcon';
import type { Toast } from './types';

interface Props {
  toast: Toast;
  onDismiss: (id: string) => void;
  onRemove: (id: string) => void;
}

export function ToastItem({ toast, onDismiss, onRemove }: Props) {
  const { id, position, duration, dismissible, visible, updatedAt } = toast;

  const progress = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(0)).current;
  const drag = useRef(new Animated.Value(0)).current;
  const dragValue = useRef(0);
  const dismissed = useRef(false);

  const away = position === 'top' ? -ANIM.travel : ANIM.travel;

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    onDismiss(id);
  }, [id, onDismiss]);

  useEffect(() => {
    Animated.spring(progress, {
      toValue: 1,
      useNativeDriver: true,
      ...ANIM.enterSpring,
    }).start();

    Animated.spring(iconScale, {
      toValue: 1,
      delay: ANIM.iconSpring.delay,
      useNativeDriver: true,
      stiffness: ANIM.iconSpring.stiffness,
      damping: ANIM.iconSpring.damping,
      mass: ANIM.iconSpring.mass,
    }).start();
  }, [progress, iconScale]);

  useEffect(() => {
    if (!duration || duration === Infinity) return;
    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, updatedAt, dismiss]);

  useEffect(() => {
    if (visible) return;
    dismissed.current = true;
    Animated.timing(progress, {
      toValue: 0,
      duration: ANIM.exitDuration,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      toast.onHide?.();
      onRemove(id);
    });
  }, [visible, id, onRemove, progress]);

  const pan = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) =>
          dismissible && Math.abs(g.dy) > 6 && Math.abs(g.dy) > Math.abs(g.dx),
        onPanResponderMove: (_, g) => {
          const dy = position === 'top' ? Math.min(g.dy, 0) : Math.max(g.dy, 0);
          dragValue.current = dy;
          drag.setValue(dy);
        },
        onPanResponderRelease: () => {
          if (Math.abs(dragValue.current) > ANIM.dragThreshold) {
            dismiss();
          } else {
            dragValue.current = 0;
            Animated.spring(drag, {
              toValue: 0,
              useNativeDriver: true,
              ...ANIM.enterSpring,
            }).start();
          }
        },
        onPanResponderTerminate: () => {
          dragValue.current = 0;
          Animated.spring(drag, {
            toValue: 0,
            useNativeDriver: true,
            ...ANIM.enterSpring,
          }).start();
        },
      }),
    [dismissible, position, drag, dismiss]
  );

  const translateY = Animated.add(
    progress.interpolate({ inputRange: [0, 1], outputRange: [away, 0] }),
    drag
  );

  return (
    <Animated.View
      {...pan.panHandlers}
      style={{
        marginTop: position === 'top' ? STACK_GAP : 0,
        marginBottom: position === 'bottom' ? STACK_GAP : 0,
        opacity: progress,
        transform: [
          { translateY },
          {
            scale: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.92, 1],
            }),
          },
        ],
        ...SHADOW,
      }}
    >
      <Pressable
        className={tw.toast}
        onPress={toast.onPress}
        disabled={!toast.onPress}
      >
        {toast.icon ?? (
          <ToastIcon
            type={toast.type}
            color={toast.accentColor}
            scale={iconScale}
          />
        )}

        <View className={tw.textWrap}>
          <Text className={tw.title} numberOfLines={1}>
            {toast.title}
          </Text>
          {!!toast.message && (
            <Text className={tw.message} numberOfLines={2}>
              {toast.message}
            </Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}
