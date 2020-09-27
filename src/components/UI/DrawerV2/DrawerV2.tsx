import React, { FC, useRef, useEffect, useState, useMemo, ReactNode } from 'react';
import { Animated, View, LayoutRectangle, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useDynamicValue } from 'react-native-dynamic';
import Styles, { DynamicStyles } from './DrawerV2.styles';
import scalePx from '../../../utils/scalePx';
import Icon, { ICON } from '../Icon/Icon';
import color from '../../../styles/definitions/color';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';

interface DrawerV2Props {
  onClosed: (args?: any) => void; // Called when closed
  children: (args: {
    onClose: (args?: any) => void; // Call to close, will call props.onClosed after animation, can pass through args
  }) => ReactNode;
}

const DrawerV2: FC<DrawerV2Props> = (props) => {
  const safeAreaInsets = useSafeArea();
  const touchY = useRef(new Animated.Value(0)).current;
  const touchYValue = useRef(0);
  const barHeight = useRef(scalePx(20)).current;
  const dynamicStyles = useDynamicValue(DynamicStyles);
  const [childLayout, setChildLayout] = useState<LayoutRectangle>();


  /**
   * When we have childLayout, set the drawer to the bottom and animate up
   */
  const init = (cl: LayoutRectangle) => {
    touchY.setValue(cl.height);
    setChildLayout(cl);

    Animated.timing(touchY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };


  /**
   * Clamp touchY from childLayout.height
   */
  const clampY = useMemo(() => {
    if (!childLayout) return null;

    return touchY.interpolate({
      inputRange: [0, childLayout.height + barHeight],
      outputRange: [0, childLayout.height + barHeight],
      extrapolate: 'clamp',
    });
  }, [childLayout]);


  /**
   * Get backgroundcolor
   */
  const backgroundColor = useMemo(() => {
    if (!childLayout) return null;

    return touchY.interpolate({
      inputRange: [0, childLayout.height + barHeight],
      outputRange: [color.mono.darkCover, color.mono.darkCover.color().alpha(0).toString()],
      extrapolate: 'clamp',
    });
  }, [childLayout]);


  /**
   * Store a reference to the animated value
   */
  useEffect(() => {
    const id = touchY.addListener((y) => {
      touchYValue.current = y.value;
    });

    return () => {
      touchY.removeListener(id);
    };
  }, []);


  /**
   * Animate to the bottom
   * Can pass args through here to be picked up onClosed
   */
  const onClose = (args?: any) => {
    Animated.timing(touchY, {
      toValue: childLayout.height + barHeight,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      props.onClosed(args);
    });
  };


  /**
   * When drag end, if the user has dragged the drawer more than half of it's size down
   * Then animate to the bottom
   * If not animate back to top
   */
  const onDragEnd = () => {
    if (!childLayout) return;

    // Close
    if (touchYValue.current >= childLayout.height / 2) {
      onClose();
      return;
    }

    // Reopen
    Animated.timing(touchY, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[Styles.wrap, { opacity: !clampY ? 0 : 1 }]}
      keyboardVerticalOffset={-safeAreaInsets.bottom}
    >
      <TouchableOpacity
        style={StyleSheet.absoluteFillObject}
        activeOpacity={1}
        onPress={() => onClose()}
      >
        <Animated.View style={{ backgroundColor, ...StyleSheet.absoluteFillObject }} />
      </TouchableOpacity>

      <PanGestureHandler
        onGestureEvent={Animated.event([{ nativeEvent: { y: touchY } }], { useNativeDriver: false })}
        onHandlerStateChange={(event) => {
          const { nativeEvent } = event;
          switch (nativeEvent.state) {
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
              dynamicStyles.inner,
              {
                height: barHeight,
                transform: clampY && [{
                  translateY: clampY,
                }],
              },
            ]}
          >
            <Icon
              name={ICON.DRAG_HANDLE}
              size="regular"
              style={dynamicStyles.icon}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>

      <Animated.View
        style={[
          dynamicStyles.inner,
          {
            transform: clampY && [{
              translateY: clampY,
            }],
          },
        ]}
      >
        <View
          onLayout={(e) => {
            if (!childLayout) {
              init(e.nativeEvent.layout);
            }
          }}
        >
          {props.children({
            onClose,
          })}
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default DrawerV2;
