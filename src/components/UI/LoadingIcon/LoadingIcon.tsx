import React, { useRef, useEffect, FC } from 'react';
import { View, Animated, StyleProp, ViewStyle } from 'react-native';
import color from '../../../styles/definitions/color';
import Styles from './LoadingIcon.style';

interface LoadingIconProps {
  style?: StyleProp<ViewStyle>;
  size?: 'small' | 'regular'; // Default regular
  type?: 'PRIMARY' | 'LIGHT'; // Default PRIMARY
}

const LoadingIcon: FC<LoadingIconProps> = (props) => {
  const value = useRef(new Animated.Value(0));
  const outerWidthFixed = useRef((() => {
    switch (props.size) {
      case 'small':
        return 20;
      default:
        return 40;
    }
  })());
  const innerWidthFixed = useRef(outerWidthFixed.current / 2);
  const baseColor = useRef((() => {
    switch (props.type) {
      case 'LIGHT':
        return color.mono.light;
      default:
        return color.accent.primary;
    }
  })());


  /**
   * Run animation on loop
   */
  const run = () => {
    value.current.setValue(0);
    Animated.timing(value.current, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        run();
      }, 500);
    });
  };


  /**
   * Run animation on mount
   */
  useEffect(() => {
    run();
  }, []);


  /**
   * Interpolations
   */
  const innerWidth = useRef(value.current.interpolate({
    inputRange: [0, 0.2, 0.6, 0.61],
    outputRange: [innerWidthFixed.current, innerWidthFixed.current * 0.75, innerWidthFixed.current * 0.75, innerWidthFixed.current],
    extrapolate: 'clamp',
  }));

  const pulseWidth = useRef(value.current.interpolate({
    inputRange: [0.61, 1],
    outputRange: [innerWidthFixed.current, innerWidthFixed.current * 2.7],
  }));

  const pulseOpacity = useRef(value.current.interpolate({
    inputRange: [0.6, 0.8, 1],
    outputRange: [0, 1, 0],
  }));


  return (
    <View style={[props.style, { width: outerWidthFixed.current, height: outerWidthFixed.current }]}>
      <View style={Styles.item}>
        <View
          style={[
            Styles.borderRadius,
            {
              borderWidth: outerWidthFixed.current * 0.08,
              borderColor: baseColor.current,
              height: outerWidthFixed.current,
              width: outerWidthFixed.current,
            },
          ]}
        />
      </View>

      <View style={Styles.item}>
        <Animated.View
          style={[
            Styles.borderRadius,
            {
              backgroundColor: baseColor.current,
              height: innerWidth.current,
              width: innerWidth.current,
            },
          ]}
        />
      </View>

      <View style={Styles.item}>
        <Animated.View
          style={[
            Styles.borderRadius,
            {
              backgroundColor: baseColor.current,
              height: pulseWidth.current,
              width: pulseWidth.current,
              opacity: pulseOpacity.current,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default LoadingIcon;
