import React, { useRef, useEffect, FC } from 'react';
import { View, Animated, StyleProp, ViewStyle } from 'react-native';
import color from '../../../styles/definitions/color';
import Styles from './LoadingIcon.style';
import scalePx from '../../../utils/scalePx';

interface LoadingIconProps {
  style?: StyleProp<ViewStyle>;
  size?: 'small' | 'regular' | number; // Defaults to regular
  type?: 'PRIMARY' | 'LIGHT'; // Default PRIMARY
  animating?: boolean; // Default true
  hideOuterRing?: boolean;
}

const LoadingIcon: FC<LoadingIconProps> = (props) => {
  const timeout = useRef<number>();
  const value = useRef(new Animated.Value(0));
  const outerWidthFixed = useRef((() => {
    if (typeof props.size === 'number') {
      return props.size;
    }

    switch (props.size) {
      case 'small':
        return scalePx(20);
      default:
        return scalePx(40);
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


  const animation = useRef(Animated.timing(value.current, {
    toValue: 1,
    duration: 700,
    useNativeDriver: false,
  })).current;


  /**
   * Run animation on loop
   */
  const run = () => {
    clearTimeout(timeout.current);
    value.current.setValue(0);

    animation.start(() => {
      timeout.current = setTimeout(() => {
        run();
      }, 500);
    });
  };


  /**
   * Run animation on mount
   */
  useEffect(() => {
    animation.stop();
    clearTimeout(timeout.current);
    value.current.setValue(0);


    /**
     * If props.animating is set to false
     * Stop the animation
     * clear the timeout and reset animated value
     */
    if (props.animating === false) {
      value.current.setValue(0);
      return;
    }

    /**
     * Stop and start animation
     */
    run();
  }, [props.animating]);


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
      {!props.hideOuterRing && (
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
      )}

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
