import React, { useRef, ReactNode, useState } from 'react';
import { Dimensions, Animated, View, StyleSheet } from 'react-native';
import useSafeArea from '../../../../../modules/SafeAreaInsets/SafeAreaInsets';
import { headerHeight, headerZindex } from '../../../../UI/Headers/Header/Header.style';


interface FullScreenWrapProps {
  children: (args: {
    toggleFullScreen: () => void;
    isFullScreen: boolean;
  }) => ReactNode;
}


const FullScreenWrap = (props: FullScreenWrapProps) => {
  const window = useRef(Dimensions.get('window')).current;
  const safeAreaInsets = useSafeArea();
  const fullScreenAnimValue = useRef(new Animated.Value(0)).current;
  const [isFullScreen, setFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (fullScreenAnimValue._value === 0) {
      setFullScreen(true);
      Animated.timing(fullScreenAnimValue, {
        toValue: 1,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }

    if (fullScreenAnimValue._value === 1) {
      setFullScreen(false);
      Animated.timing(fullScreenAnimValue, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }
  };
  console.log('toggleFullScreen -> toggleFullScreen', toggleFullScreen);

  // const fullScreenWidth = useRef(window.height - safeAreaInsets.top - safeAreaInsets.bottom).current;
  const fullScreenWidth = useRef(window.width * 1.777777777777778).current;
  const windowHeight = useRef(window.height - safeAreaInsets.top - safeAreaInsets.bottom - headerHeight).current;
  const fullScreenWidthInter = useRef(fullScreenAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [window.width, fullScreenWidth],
    extrapolate: 'clamp',
    // useNativeDriver: true,
  })).current;
  const fullScreenTranslateXInter = useRef(fullScreenAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (windowHeight / 2) - ((fullScreenWidth / 1.777777777777778) / 2)],
    extrapolate: 'clamp',
    // useNativeDriver: true,
  })).current;
  const fullScreenRotateInter = useRef(fullScreenAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
    extrapolate: 'clamp',
    // useNativeDriver: true,
  })).current;
  const fullScreenBackgroundColor = useRef(fullScreenAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'],
    extrapolate: 'clamp',
    // useNativeDriver: true,
  })).current;
  const fullScreenZIndex = useRef(fullScreenAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [headerZindex - 1, headerZindex + 1],
    extrapolate: 'clamp',
    // useNativeDriver: true,
  })).current;


  return (
    <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: fullScreenBackgroundColor, zIndex: fullScreenZIndex, opacity: 1 }}>
      <View style={{ ...StyleSheet.absoluteFillObject, marginTop: safeAreaInsets.top + headerHeight / 2, marginBottom: safeAreaInsets.bottom, alignItems: 'center' }}>
        <Animated.View
          style={[
            { width: fullScreenWidthInter, aspectRatio: 1.777777777777778, backgroundColor: 'green', zIndex: 200 },
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
