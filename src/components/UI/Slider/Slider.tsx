import React, { FC, useRef, useEffect, useState, useMemo } from 'react';
import { Animated, View, TouchableHighlight } from 'react-native';
import { gestureHandlerRootHOC, PanGestureHandler, State } from 'react-native-gesture-handler';
import Styles from './Slider.style';
import scalePx from '../../../utils/scalePx';
import PulsingIcon from '../PulsingIcon/PulsingIcon';
import { mapRange } from '../../../utils/functions';

export interface SliderProps {
  value: number;
  minimumValue: number;
  maximumValue: number;
  onValueChange?: (v: number) => void;
  onSlidingStarted?: () => void;
  onSlidingComplete?: (v: number) => void;
  tracks: {
    color: string;
    width: number; // Between 0-1
  }[]; // Array tracks to display, rendered in order, last in array being top most
  loading?: boolean; // If true sets the PulsingIcon (thumb) to animate
}

const Slider: FC<SliderProps> = (props) => {
  const thumbWidth = useRef(scalePx(10)).current;
  const currentState = useRef<State>(null);
  const trackWidthTimeout = useRef<number>();
  const valueChangeTimeout = useRef<number>();
  const touchX = useRef(new Animated.Value(0)).current;
  const [trackWidth, setTrackWidth] = useState(0);


  /**
   * When trackWidth is set or changes
   * Assign a listener to the animated value
   * When this value changes send it to the
   */
  useEffect(() => {
    if (!trackWidth) return undefined;

    const id = touchX.addListener((x) => {
      /**
       * Only execute onValueChange if active
       */
      if (currentState.current === State.ACTIVE) {
        const value = mapRange(x.value, 0, trackWidth, props.minimumValue, props.maximumValue);
        if (value >= props.minimumValue && value <= props.maximumValue) {
          clearTimeout(valueChangeTimeout.current);
          valueChangeTimeout.current = setTimeout(() => {
            props.onValueChange(Math.floor(value));
          }, 10);
        }
      }
    });

    return () => {
      clearTimeout(trackWidthTimeout.current);
      clearTimeout(valueChangeTimeout.current);
      touchX.removeListener(id);
    };
  }, [trackWidth]);


  /**
   * When trackWidth changes
   * Animate the value of touchX to match trackWidth new value
   */
  useEffect(() => {
    /**
     * Do not update the value if the current gesture state is active
     */
    if (currentState.current !== State.ACTIVE) {
      const value = mapRange(props.value, props.minimumValue, props.maximumValue, 0, trackWidth);
      // eslint-disable-next-line no-restricted-globals
      if (value != null) {
        Animated.timing(touchX, {
          toValue: value,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [trackWidth]);


  /**
   * When props.value or props.maximumValue changes
   * Set the value of touchX
   */
  useEffect(() => {
    /**
     * Do not update the value if the current gesture state is active
     */
    if (currentState.current !== State.ACTIVE) {
      const value = mapRange(props.value, props.minimumValue, props.maximumValue, 0, trackWidth);
      // eslint-disable-next-line no-restricted-globals
      if (value != null) {
        touchX.setValue(value);
      }
    }
  }, [props.value, props.maximumValue]);


  /**
   * Clamps touchX value on the track path
   * Without it's possible to drag thumb outside of the track
   */
  const clampThumb = useMemo(() => touchX.interpolate({
    inputRange: [0, trackWidth],
    outputRange: [0, trackWidth],
    extrapolate: 'clamp',
  }), [trackWidth]);


  /**
   * Main track offset value
   */
  const mainTrackWidth = useMemo(() => clampThumb.interpolate({
    inputRange: [0, trackWidth],
    outputRange: [-trackWidth, 0],
    extrapolate: 'clamp',
  }), [trackWidth]);


  return (
    <View style={Styles.outer}>
      <PanGestureHandler
        onGestureEvent={Animated.event([{ nativeEvent: { x: touchX } }], { useNativeDriver: true })}
        onHandlerStateChange={(event) => {
          const { nativeEvent } = event;
          currentState.current = nativeEvent.state;
          switch (nativeEvent.state) {
            case State.BEGAN:
              if (props.onSlidingStarted) {
                props.onSlidingStarted();
              }
              break;

            case State.END:
              if (props.onSlidingComplete) {
                clearTimeout(valueChangeTimeout.current);
                // eslint-disable-next-line no-underscore-dangle
                const value = mapRange((clampThumb as any)._parent._value, 0, trackWidth, props.minimumValue, props.maximumValue);
                if (value != null) {
                  props.onSlidingComplete(value);
                }
              }
              break;
          }
        }}
      >
        <Animated.View
          style={Styles.wrap}
          onLayout={(event) => {
            if (!trackWidth) {
              /**
               * Set the trackWidth on mount
               */
              setTrackWidth(event.nativeEvent.layout.width);
            } else {
              /**
               * If this value is updated, update it on a timeout
               * In the event of animations this be more efficient
               */
              clearTimeout(trackWidthTimeout.current);
              event.persist();
              trackWidthTimeout.current = setTimeout(() => {
                setTrackWidth(event.nativeEvent.layout.width);
              }, 100);
            }
          }}
        >
          <View style={Styles.track}>
            <View style={Styles.inner}>
              {props.tracks.map((t, i) => (
                <View key={i} style={[Styles.track, { backgroundColor: t.color, width: `${t.width * 100}%` }]} />
              ))}

              {/* Main track */}
              <Animated.View
                style={[
                  Styles.mainTrack,
                  {
                    width: trackWidth,
                    transform: [{
                      translateX: mainTrackWidth,
                    }],
                  },
                ]}
              />
            </View>
          </View>

          {trackWidth !== 0 && (
            <TouchableHighlight underlayColor="transparent">
              {/* TouchableHighlight to stop propopgration of touch event */}
              <Animated.View
                style={{
                  transform: [{
                    translateX: Animated.add(clampThumb, new Animated.Value(-(thumbWidth / 2))),
                  }],
                }}
                pointerEvents="none"
              >
                <PulsingIcon
                  size={thumbWidth}
                  animating={!!props.loading}
                />
              </Animated.View>
            </TouchableHighlight>
          )}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default gestureHandlerRootHOC(Slider);
