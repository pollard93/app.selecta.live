import React, { FC, useRef, useEffect } from 'react';
import { Animated, ViewProps } from 'react-native';

const FadeInView: FC<ViewProps> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;


  /**
   * Start animation
   */
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      },
    ).start();
  }, []);


  return (
    <Animated.View
      {...props}
      style={[props.style, { opacity: fadeAnim }]}
    >
      {props.children}
    </Animated.View>
  );
};

export default FadeInView;
