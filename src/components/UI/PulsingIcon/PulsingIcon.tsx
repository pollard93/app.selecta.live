import React, { useRef, useEffect, FC, memo } from 'react';
import { View, Animated, StyleProp, ViewStyle } from 'react-native';
import Styles from './PulsingIcon.style';
import scalePx from '../../../utils/scalePx';

interface PulsingIconProps {
  style?: StyleProp<ViewStyle>;
  size?: 'regular' | number; // Defaults to regular
  duration?: number; // Default 700
  delay?: number; // Default 500
  animating?: boolean; // Default true
}

const PulsingIcon: FC<PulsingIconProps> = (props) => {
  const timeout = useRef<number>();
  const width = useRef(typeof props.size === 'number' ? props.size : scalePx(10));
  const value = useRef(new Animated.Value(0));


  /**
   * Animations
   */
  const animation = useRef(Animated.timing(value.current, {
    toValue: 1,
    duration: props.duration || 700,
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
      }, props.delay || 500);
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
      return undefined;
    }

    /**
     * Stop and start animation
     */
    run();

    return () => {
      clearTimeout(timeout.current);
    };
  }, [props.animating]);


  /**
   * Interpolations
   */
  const innerWidth = useRef(value.current.interpolate({
    inputRange: [0, 0.2, 0.6, 0.61],
    outputRange: [width.current, width.current * 0.75, width.current * 0.75, width.current],
    extrapolate: 'clamp',
  }));

  /**
   * Pulse Widths
   */
  const pulseWidth = useRef(value.current.interpolate({
    inputRange: [0.60, 1],
    outputRange: [width.current, width.current * 2.7],
  }));

  /**
   * Pulse Opacity
   */
  const pulseOpacity = useRef(value.current.interpolate({
    inputRange: [0.2, 0.6, 1],
    outputRange: [0, 1, 0],
  }));


  return (
    <View style={[props.style, { width: width.current, height: width.current }]}>
      <View style={Styles.item}>
        <Animated.View
          style={[
            Styles.borderRadius,
            {
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

export default memo(PulsingIcon, (pr, np) => pr.animating === np.animating);
