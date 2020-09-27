import React, { useEffect, useState, FC, useRef, ReactNode } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { Navigation, Options } from 'react-native-navigation';
import styles from './ToastOverlay.styles';
import { useScreenProps } from '../../modules/ScreenPropsProvider/ScreenPropsProvider';


export interface ToastOverlayProps {
  duration: number;
  component: ReactNode;
  position?: 'top' | 'bottom'; // Default top
  dismissible?: boolean; // Default false
}


/**
 * Toast overlay screen
 * Create this component with `Navigation.showOverlay`
 */
const ToastOverlay: FC<ToastOverlayProps> = (props) => {
  const screenProps = useScreenProps();

  // Create an animated value only once
  const [bounceValue] = useState(new Animated.Value(0));

  // Required for removing toast after x amount of time
  const timeoutId = useRef(null);

  // Required for animation
  const [layout, setLayout] = useState(null);


  /**
   * Removes and destroys first toast in queue
   */
  const removeToast = () => {
    // Clear timeout so the function is not run twice
    clearTimeout(timeoutId.current);
    timeoutId.current = null;

    // Animate the bounceValue to 1 (hiding toast)
    Animated.spring(
      bounceValue,
      {
        toValue: 0,
        velocity: 3,
        friction: 8,
        useNativeDriver: true,
      },
    ).start(() => {
      /**
       * When finished destroy component
       */
      Navigation.dismissOverlay(screenProps.componentId);
    });
  };


  /**
   * Listen for changes in `layout` state
   * At this point we have the information and ready to animate the component into view
   */
  useEffect(() => {
    /**
     * Do nothing if layout is not set (waiting for component to mount)
     */
    if (layout === null) return;

    // Animate the bounceValue to 1 (showing toast)
    Animated.spring(
      bounceValue,
      {
        toValue: 1,
        velocity: 3,
        tension: 2,
        friction: 8,
        useNativeDriver: true,
      },
    ).start(() => {
      if (props.duration > 0) {
        /**
         * When finished at the top, set timeout to `removeToast` using the defined duration
         * Set a timeout, incase the toast is removed before hand, then this can be invalidated
         */
        timeoutId.current = setTimeout(() => {
          removeToast();
        }, props.duration);
      }
    });
  }, [layout]);


  /**
   * Gets the output range based on props.position
   * used for interpolating the transform.translateY
   */
  const getOutputRange = () => {
    switch (props.position) {
      case 'bottom':
        return [layout.height, 0];
      case 'top':
      default:
        return [layout.height * -1, 0];
    }
  };


  /**
   * Toast wrap component
   * This must be a function here, so that the component is unmounted every render so that `onLayout` is called
   */
  const ToastWrap = () => (
    <View
      onLayout={(event) => {
        if (!layout) {
          /**
           * When layout is set, we can now animate using these values
           */
          setLayout(event.nativeEvent.layout);
        }
      }}
    >
      {props.dismissible
        ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              removeToast();
            }}
          >
            {props.component}
          </TouchableOpacity>
        )
        : (
          props.component
        )
      }
    </View>
  );


  /**
   * Animated view uses the bounceValue (0-1)
   * Animates the opacity, 0 before layout is available
   * Animates transform.translateY when layout is available
   */
  return (
    <View
      style={[
        styles.wrap,
        styles.top,
      ]}
    >
      <Animated.View
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            opacity: layout === null ? 0 : bounceValue,
          },
          layout && {
            transform: [{
              translateY: bounceValue.interpolate({
                inputRange: [0, 1],
                outputRange: getOutputRange(),
              }),
            }],
          },
        ]}
      >
        <ToastWrap />
      </Animated.View>
    </View>
  );
};

export default ToastOverlay;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
ToastOverlay.prototype.ScreenName = 'ToastOverlay';

/**
 * Set Screen options or remove to use default
 */
(ToastOverlay.prototype.options as Options) = {
  layout: {
    componentBackgroundColor: 'transparent',
  },
  overlay: {
    interceptTouchOutside: false,
  },
};

/**
 * Export as const so can be imported without the default
 */
export const ToastOverlayName = ToastOverlay.prototype.ScreenName;
