import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import {
  ALERT_ANIM,
  ALERT_DEFAULTS,
  ANIM,
  SHADOW,
  tw,
} from './styles';
import { ToastIcon } from './ToastIcon';
import type { Alert } from './types';

interface Props {
  alert: Alert;
  onDismiss: () => void;
  onRemove: () => void;
}

export function AlertItem({ alert, onDismiss, onRemove }: Props) {
  const { duration, dismissible, visible, updatedAt, backdropOpacity } = alert;

  const progress = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(0)).current;
  const dismissed = useRef(false);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: ALERT_ANIM.enterDuration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
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
    const timer = setTimeout(() => {
      if (dismissed.current) return;
      dismissed.current = true;
      onDismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, updatedAt, onDismiss]);

  useEffect(() => {
    if (visible) return;
    dismissed.current = true;
    Animated.timing(progress, {
      toValue: 0,
      duration: ALERT_ANIM.exitDuration,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      alert.onHide?.();
      onRemove();
    });
  }, [visible, onRemove, progress]);

  const handlePress = () => {
    alert.onPress?.();
    if (!dismissible) return;
    dismissed.current = true;
    onDismiss();
  };

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [visible ? ALERT_ANIM.enterFromScale : ALERT_ANIM.exitToScale, 1],
  });

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      pointerEvents="box-none"
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#000',
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, backdropOpacity ?? ALERT_DEFAULTS.backdropOpacity],
          }),
        }}
        pointerEvents={backdropOpacity ? 'auto' : 'none'}
        onTouchEnd={backdropOpacity && dismissible ? handlePress : undefined}
      />

      <Animated.View
        style={{ opacity: progress, transform: [{ scale }], ...SHADOW }}
      >
        <Pressable className={tw.alertCard} onPress={handlePress}>
          {alert.icon ?? (
            <ToastIcon
              type={alert.type}
              color={alert.accentColor}
              scale={iconScale}
              size={ALERT_DEFAULTS.iconSize}
            />
          )}

          <View className={tw.alertTextWrap}>
            <Text className={tw.alertTitle} numberOfLines={2}>
              {alert.title}
            </Text>
            {!!alert.message && (
              <Text className={tw.alertMessage} numberOfLines={3}>
                {alert.message}
              </Text>
            )}
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}
