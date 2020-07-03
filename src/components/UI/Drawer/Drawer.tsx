import React, { FC, useRef, useMemo, useEffect } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Styles from './Drawer.styles';
import scalePx from '../../../utils/scalePx';
import Icon, { ICON } from '../Icon/Icon';

interface DrawerProps {
  minHeight: number;
  maxHeight: number;
}

const Drawer: FC<DrawerProps> = (props) => {
  const windowHeight = useRef(Dimensions.get('window').height).current;
  const touchY = useRef(new Animated.Value(-100)).current;
  const touchYValue = useRef(0);
  const barHeight = useRef(scalePx(20)).current;


  /**
   * Clamp touchY between min and max props
   */
  const clampY = useRef(touchY.interpolate({
    inputRange: [-props.maxHeight, -props.minHeight],
    outputRange: [-props.maxHeight, -props.minHeight],
    extrapolate: 'clamp',
  })).current;

  /**
   * Get height for child view wrap
   */
  const height = useRef(clampY.interpolate({
    inputRange: [-windowHeight, 0],
    outputRange: [windowHeight, 0],
    extrapolate: 'clamp',
  })).current;

  /**
   * Rotate arrow
   */
  const arrow = useRef(touchY.interpolate({
    inputRange: [-props.maxHeight, -props.minHeight],
    outputRange: ['180deg', '0deg'],
    extrapolate: 'clamp',
  })).current;


  /**
   * Store a reference to the animated value
   */
  useEffect(() => {
    const id = touchY.addListener((y) => {
      touchYValue.current = Math.max(Math.min(y.value, -props.minHeight), -props.maxHeight) * -1;
    });

    return () => {
      touchY.removeListener(id);
    };
  }, []);


  /**
   * When drag end, get the closest value between min and max and animate to it
   */
  const onDragEnd = () => {
    const closest = [props.minHeight, props.maxHeight].sort((a, b) => Math.abs(touchYValue.current - a) - Math.abs(touchYValue.current - b))[0];
    Animated.timing(touchY, {
      toValue: -closest,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };


  return (
    <View style={Styles.wrap}>
      <Animated.View
        style={{
          height: Animated.add(height, new Animated.Value(-barHeight)),
        }}
      >
        {props.children}
      </Animated.View>
      <PanGestureHandler
        onGestureEvent={Animated.event([{ nativeEvent: { y: touchY } }], { useNativeDriver: false })}
        onHandlerStateChange={(event) => {
          const { nativeEvent } = event;
          switch (nativeEvent.state) {
            case State.BEGAN:

              break;

            case State.END:
              onDragEnd();
              break;
          }
        }}
      >
        <Animated.View>
          <Animated.View
            style={[
              Styles.bar,
              {
                height: barHeight,
                transform: [{
                  translateY: clampY,
                }],
              },
            ]}
          >
            <Icon
              name={ICON.DRAWER_ARROW}
              size="xsmall"
              animated
              style={{
                transform: [{
                  rotate: arrow,
                }],
              }}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Drawer;
