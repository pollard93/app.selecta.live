import React, { FC, useRef, useEffect } from 'react';
import { Animated, Dimensions, TouchableOpacity, View } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Styles, { DynamicStyles } from './Drawer.styles';
import scalePx from '../../../utils/scalePx';
import Icon, { ICON } from '../Icon/Icon';
import { GlobalDynamicStyles } from '../../../styles/stylesheets/GlobalStyles';
import { useHeaderStyles } from '../Headers/Header/Header';

export interface DrawerProps {
  minHeight: number;
  maxHeight: number;
}

const Drawer: FC<DrawerProps> = (props) => {
  const windowHeight = useRef(Dimensions.get('window').height).current;
  const touchY = useRef(new Animated.Value(-100)).current;
  const touchYValue = useRef(props.minHeight);
  const barHeight = useRef(scalePx(20)).current;
  const { headerZindex } = useHeaderStyles();
  const dynamicStyles = useDynamicValue(DynamicStyles);
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);


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
   * When tap ends, toggle from min-max and vice versa
   */
  const onTapEnd = () => {
    Animated.timing(touchY, {
      toValue: -(touchYValue.current === props.minHeight ? props.maxHeight : props.minHeight),
      duration: 300,
      useNativeDriver: false,
    }).start();
  };


  return (
    <View
      style={[Styles.wrap, { zIndex: headerZindex + 1 }]}
      pointerEvents="box-none"
    >
      <Animated.View
        style={[
          { height: Animated.add(height, new Animated.Value(-barHeight)) },
          globalDynamicStyles.background,
        ]}
      >
        {props.children}
      </Animated.View>
      <View>
        <Animated.View
          style={[
            Styles.bar,
            dynamicStyles.bar,
            {
              height: barHeight,
              transform: [{
                translateY: clampY,
              }],
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              onTapEnd();
            }}
            style={Styles.barTouch}
          >
            <Icon
              name={ICON.DRAWER_ARROW}
              size="xsmall"
              animated
              style={[
                dynamicStyles.icon,
                {
                  transform: [{
                    rotate: arrow,
                  }],
                },
              ]}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default Drawer;
