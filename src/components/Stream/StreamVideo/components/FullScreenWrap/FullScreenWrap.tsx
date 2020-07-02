import React, { useRef, ReactNode, useState } from 'react';
import { Dimensions, Animated, View, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import useSafeArea from '../../../../../modules/SafeAreaInsets/SafeAreaInsets';
import { useHeaderStyles } from '../../../../UI/Headers/Header/Header';
import { ScreenProps } from '../../../../../screens/utils/interfaces';


interface FullScreenWrapProps extends ScreenProps {
  children: (args: {
    toggleFullScreen: () => void;
    isFullScreen: boolean;
  }) => ReactNode;
}


const FullScreenWrap = (props: FullScreenWrapProps) => {
  const window = useRef(Dimensions.get('window')).current;
  const safeAreaInsets = useSafeArea();
  const animValue = useRef(new Animated.Value(0)).current;
  const [isFullScreen, setFullScreen] = useState(false);
  const { headerHeight, headerZindex } = useHeaderStyles();


  /**
   * Toggles full screen
   */
  const toggleFullScreen = () => {
    // eslint-disable-next-line no-underscore-dangle
    if ((animValue as any)._value === 0) {
      setFullScreen(true);

      /**
       * Animate from 0 - 1
       */
      Animated.timing(animValue, {
        toValue: 1,
        duration: 700,
        useNativeDriver: false,
      }).start();

      /**
       * Change status bar color (android)
       * Hide bottom tabs
       */
      Navigation.mergeOptions(props.componentId, {
        statusBar: {
          backgroundColor: 'black',
        },
        bottomTabs: { visible: false, animate: true },
      });
    }

    // eslint-disable-next-line no-underscore-dangle
    if ((animValue as any)._value === 1) {
      setFullScreen(false);

      /**
       * Animate from 1 - 0
       */
      Animated.timing(animValue, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }).start();

      /**
       * Change status bar color (android)
       * Show bottom tabs
       */
      Navigation.mergeOptions(props.componentId, {
        statusBar: {
          backgroundColor: 'white',
        },
        bottomTabs: { visible: true, animate: true },
      });
    }
  };


  /**
   * Get window height and work out the width to set the element when in full screen mode
   * Fit's 16/9 component within landscape screen
   */
  const windowHeight = useRef(window.height - safeAreaInsets.top - safeAreaInsets.bottom - headerHeight).current;
  const fullScreenWidth = useRef(Math.min(window.width * 1.777777777777778, windowHeight)).current;


  /**
   * Define interpolations needed
   */
  const fullScreenWidthInter = useRef(animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [window.width, fullScreenWidth],
    extrapolate: 'clamp',
  })).current;
  const fullScreenTranslateXInter = useRef(animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (windowHeight / 2) - ((fullScreenWidth / 1.777777777777778) / 2)],
    extrapolate: 'clamp',
  })).current;
  const fullScreenRotateInter = useRef(animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
    extrapolate: 'clamp',
  })).current;
  const fullScreenBackgroundColor = useRef(animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'],
    extrapolate: 'clamp',
  })).current;
  const fullScreenZIndex = useRef(animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [headerZindex - 1, headerZindex + 1],
    extrapolate: 'clamp',
  })).current;


  return (
    <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: fullScreenBackgroundColor, zIndex: fullScreenZIndex }}>
      <View style={{ ...StyleSheet.absoluteFillObject, marginTop: safeAreaInsets.top + headerHeight / 2, marginBottom: safeAreaInsets.bottom, alignItems: 'center' }}>
        <Animated.View
          style={[
            { width: fullScreenWidthInter, aspectRatio: 1.777777777777778 },
            {
              transform: [
                { translateY: fullScreenTranslateXInter },
                { rotate: fullScreenRotateInter },
              ],
            },
          ]}
        >
          {props.children({
            toggleFullScreen,
            isFullScreen,
          })}
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default FullScreenWrap;
