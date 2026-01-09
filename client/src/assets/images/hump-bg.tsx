// demo svg

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const TabBg = ({ color, extraHeight = 0 }: { color: string, extraHeight?: number }) => {

  const totalHeight = 100 + extraHeight;

  const d = `
    M 0 20 
    Q ${width / 2} -20 ${width} 20 
    V ${totalHeight} 
    H 0 
    Z
  `;

  return (
    <Svg 
      width={width} 
      height={totalHeight} 
      style={{ position: 'absolute', bottom: 0 }}
    >
      <Path d={d} fill={color} />
    </Svg>
  );
};

export default TabBg;