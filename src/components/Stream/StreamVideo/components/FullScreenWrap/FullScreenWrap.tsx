import React, { useRef, ReactNode, useState } from 'react';
import { Dimensions, Animated, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import useSafeArea from '../../../../../modules/SafeAreaInsets/SafeAreaInsets';
import { useHeaderStyles } from '../../../../UI/Headers/Header/Header';
import Styles from './FullScreenWrap.style';
import { useScreenProps } from '../../../../../modules/ScreenPropsProvider/ScreenPropsProvider';


interface FullScreenWrapProps {
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
  const screenProps = useScreenProps();


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
    }
  };


  /**
   * Get window height and work out the width to set the element when in full screen mode
   * Fit's 16/9 component within landscape screen
   */
  const windowHeight = useRef(window.height - safeAreaInsets.top - safeAreaInsets.bottom - (headerHeight * 2)).current;
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
    outputRange: [headerZindex - 1, headerZindex + 10],
    extrapolate: 'clamp',
  })).current;


  return (
    <Animated.View
      style={[
        Styles.wrap,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: fullScreenBackgroundColor,
          zIndex: fullScreenZIndex,
          elevation: isFullScreen ? headerZindex : 0,
        },
      ]} pointerEvents="box-none">
      <View style={[Styles.inner, { marginTop: safeAreaInsets.top + headerHeight, marginBottom: safeAreaInsets.bottom }]} pointerEvents="box-none">
        <Animated.View
          style={[
            Styles.video,
            {
              width: fullScreenWidthInter,
              transform: [
                { translateY: fullScreenTranslateXInter },
                { rotate: fullScreenRotateInter },
              ],
            },
          ]}
          pointerEvents="box-none"
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
