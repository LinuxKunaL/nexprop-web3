import React from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';
import { ACCENT, GLYPH, ICON_BASE_SIZE, ICON_WRAP } from './styles';
import type { ToastType } from './types';

interface Props {
  type: ToastType;
  color?: string;
  scale: Animated.Value;
  size?: number;
}

export function ToastIcon({
  type,
  color,
  scale,
  size = ICON_BASE_SIZE,
}: Props) {
  const accent = color ?? ACCENT[type];
  const glyphScale = size / ICON_BASE_SIZE;

  if (type === 'processing') {
    return (
      <View style={ICON_WRAP(size)}>
        <ActivityIndicator size={size >= 48 ? 'large' : 'small'} color={accent} />
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        ICON_WRAP(size),
        { backgroundColor: accent, transform: [{ scale }] },
      ]}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ scale: glyphScale }],
        }}
      >
        {type === 'success' && <View style={GLYPH.check} />}

        {type === 'error' && (
          <View style={GLYPH.crossBox}>
            <View
              style={[GLYPH.crossBar, { transform: [{ rotate: '45deg' }] }]}
            />
            <View
              style={[GLYPH.crossBar, { transform: [{ rotate: '-45deg' }] }]}
            />
          </View>
        )}

        {type === 'warning' && (
          <View style={{ alignItems: 'center' }}>
            <View style={GLYPH.bangStem} />
            <View style={GLYPH.bangDot} />
          </View>
        )}
      </View>
    </Animated.View>
  );
}
