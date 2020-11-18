import React, { useRef, useEffect, FC, memo } from 'react';
import { View, Animated, StyleProp, ViewStyle, Image, StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import Styles from './LoadingIcon.style';
import scalePx from '../../../utils/scalePx';
import Gradient from '../Gradient/Gradient';

interface LoadingIconProps {
  style?: StyleProp<ViewStyle>;
  size?: 'small' | 'regular' | number; // Defaults to regular
  type?: 'PRIMARY' | 'LIGHT'; // Default PRIMARY
  animating?: boolean; // Default true
  testID?: string;
}

const LoadingIcon: FC<LoadingIconProps> = (props) => {
  const timeout = useRef<number>();
  const value = useRef(new Animated.Value(0));


  /**
   * Outer width
   */
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


  /**
   * Inner width
   */
  const innerWidthFixed = useRef(outerWidthFixed.current / 2.3);


  const animation = useRef(Animated.timing(value.current, {
    toValue: 1,
    duration: 3000,
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
    outputRange: [innerWidthFixed.current, innerWidthFixed.current * 0.75, innerWidthFixed.current * 0.75, innerWidthFixed.current],
    extrapolate: 'clamp',
  }));

  const pulseWidth = useRef(value.current.interpolate({
    inputRange: [0.61, 1],
    outputRange: [innerWidthFixed.current, innerWidthFixed.current * 2.2],
  }));

  const pulseOpacity = useRef(value.current.interpolate({
    inputRange: [0.6, 0.8, 1],
    outputRange: [0, 1, 0],
  }));


  return (
    <View style={[props.style, { width: outerWidthFixed.current, height: outerWidthFixed.current }]}>
      <View style={Styles.item}>
        <Image
          source={require('../../../assets/images/logo-icon-outer.png')}
          style={{
            height: outerWidthFixed.current,
            width: outerWidthFixed.current,
            tintColor: props.type === 'LIGHT' ? color.mono.light : undefined,
          }}
        />
      </View>

      <View style={Styles.item}>
        <Animated.View
          style={[
            Styles.borderRadius,
            Styles.overflow,
            {
              height: innerWidth.current,
              width: innerWidth.current,
              backgroundColor: props.type === 'LIGHT' ? color.mono.light : undefined,
            },
          ]}
        >
          {props.type !== 'LIGHT' && <Gradient style={StyleSheet.absoluteFillObject} />}
        </Animated.View>
      </View>

      <View style={Styles.item}>
        <Animated.View
          style={[
            Styles.borderRadius,
            Styles.overflow,
            {
              height: pulseWidth.current,
              width: pulseWidth.current,
              opacity: pulseOpacity.current,
              backgroundColor: props.type === 'LIGHT' ? color.mono.light : undefined,
            },
          ]}
        >
          {props.type !== 'LIGHT' && <Gradient style={StyleSheet.absoluteFillObject} />}
        </Animated.View>
      </View>
    </View>
  );
};

export default memo(LoadingIcon, (pr, np) => pr.animating === np.animating);
