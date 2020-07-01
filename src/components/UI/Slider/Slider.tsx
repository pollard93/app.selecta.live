import React, { FC, useRef, useEffect, useState, useMemo } from 'react';
import { Animated, View, TouchableHighlight } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Styles from './Slider.style';
import scalePx from '../../../utils/scalePx';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { mapRange } from '../../../utils/functions';
import color from '../../../styles/definitions/color';

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
  loading?: boolean; // If true sets the LoadingIcon (thumb) to animate
}

const Slider: FC<SliderProps> = (props) => {
  const thumbWidth = useRef(scalePx(20)).current;
  const currentState = useRef<State>(null);
  const trackWidthTimeout = useRef<number>();


  // /**
  //  * Get the difference between the window width and the track
  //  * Pan gesture will use the full screen width and ignore track
  //  */
  // const trackDiff = useMemo(() => windowWidth - trackWidth, [trackWidth]);
  // console.log('trackDiff', trackDiff);


  // /**
  //  * Gets the mapped value using props.minimumValue and props.maximumValue
  //  * @param absoluteX - the x position of the thumb
  //  */
  // const getMappedValue = (absoluteX: number) => mapRange(absoluteX - (trackDiff / 2), 0, trackWidth, props.minimumValue, props.maximumValue);


  // /**
  //  * Is called continuously on pan
  //  * Executes props.onValueChange if given
  //  */
  // const onPan = ({ nativeEvent }) => {
  //   // // Only update the value if within the clamped trackDiff
  //   // console.log('onPan -> nativeEvent.absoluteX', nativeEvent.absoluteX, (trackDiff / 2), windowWidth - (trackDiff / 2));
  //   // if (
  //   //   props.onValueChange
  //   //   && nativeEvent.absoluteX >= (trackDiff / 2)
  //   //   && nativeEvent.absoluteX <= windowWidth - (trackDiff / 2)
  //   // ) {
  //   //   /**
  //   //    * TODO - debounce
  //   //    */
  //   //   props.onValueChange(getMappedValue(nativeEvent.absoluteX));
  //   // }
  // };


  // /**
  //  * When props.value or the trackWidth changes
  //  * Set the value of touchX
  //  */
  // useEffect(() => {
  //   /**
  //    * Do not update the value if the current gesture state is active
  //    */
  //   if (currentState.current !== State.ACTIVE) {
  //     const value = mapRange(props.value, props.minimumValue, props.maximumValue, 0, trackWidth);
  //     // eslint-disable-next-line no-restricted-globals
  //     if (value != null) {
  //       touchX.setValue(value);
  //     }
  //   }
  // }, [props.value, props.maximumValue]);


  // /**
  //  * When trackWidth changes
  //  * Animate the value of touchX
  //  */
  // useEffect(() => {
  //   /**
  //    * Do not update the value if the current gesture state is active
  //    */
  //   if (currentState.current !== State.ACTIVE) {
  //     const value = mapRange(props.value, props.minimumValue, props.maximumValue, 0, trackWidth);
  //     // eslint-disable-next-line no-restricted-globals
  //     if (value != null) {
  //       Animated.timing(touchX, {
  //         toValue: value,
  //         duration: 300,
  //         useNativeDriver: true,
  //       }).start();
  //     }
  //   }
  // }, [trackWidth]);


  /**
   * Clamps touchX value on the track path
   * Without it's possible to drag thumb outside of the track
   */
  // const clampThumb = useMemo(() => touchX.interpolate({
  //   inputRange: [0, windowWidth - trackDiff],
  //   outputRange: [0, windowWidth - trackDiff],
  //   extrapolate: 'clamp',
  // }), [trackDiff]);


  // /**
  //  * Clamps touchX value on the track path
  //  * Without it's possible to drag thumb outside of the track
  //  */
  // const mainTrackWidth = useMemo(() => touchX.interpolate({
  //   inputRange: [0, windowWidth - trackDiff],
  //   outputRange: [-trackWidth, 0],
  //   extrapolate: 'clamp',
  // }), [trackDiff]);


  /**
   * NEW
   */
  const touchXNEW = useRef(new Animated.Value(0)).current;
  const [trackWidthNEW, setTrackWidthNEW] = useState(0);

  useEffect(() => {
    console.log(1);
    if (!trackWidthNEW) return undefined;

    const id = touchXNEW.addListener((x) => {
      /**
       * TODO - debounce
       */
      if (currentState.current === State.ACTIVE) {
        const value = mapRange(x.value, 0, trackWidthNEW, props.minimumValue, props.maximumValue);
        if (value >= props.minimumValue && value <= props.maximumValue) {
          props.onValueChange(value);
        }
      }
    });
    return () => touchXNEW.removeListener(id);
  }, [trackWidthNEW]);


  /**
   * When trackWidth changes
   * Animate the value of touchX
   */
  useEffect(() => {
    /**
     * Do not update the value if the current gesture state is active
     */
    if (currentState.current !== State.ACTIVE) {
      const value = mapRange(props.value, props.minimumValue, props.maximumValue, 0, trackWidthNEW);
      // eslint-disable-next-line no-restricted-globals
      if (value != null) {
        Animated.timing(touchXNEW, {
          toValue: value,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [trackWidthNEW]);


  /**
   * When props.value or the trackWidth changes
   * Set the value of touchX
   */
  useEffect(() => {
    /**
     * Do not update the value if the current gesture state is active
     */
    if (currentState.current !== State.ACTIVE) {
      const value = mapRange(props.value, props.minimumValue, props.maximumValue, 0, trackWidthNEW);
      // eslint-disable-next-line no-restricted-globals
      if (value != null) {
        touchXNEW.setValue(value);
      }
    }
  }, [props.value, props.maximumValue]);


  /**
   * Clamps touchXNEW value on the track path
   * Without it's possible to drag thumb outside of the track
   */
  const clampThumbNEW = useMemo(() => touchXNEW.interpolate({
    inputRange: [0, trackWidthNEW],
    outputRange: [0, trackWidthNEW],
    extrapolate: 'clamp',
  }), [trackWidthNEW]);


  /**
   * Clamps touchXNEW value on the track path
   * Without it's possible to drag thumb outside of the track
   */
  const mainTrackWidthNEW = useMemo(() => clampThumbNEW.interpolate({
    inputRange: [0, trackWidthNEW],
    outputRange: [-trackWidthNEW, 0],
    extrapolate: 'clamp',
  }), [trackWidthNEW]);


  return (
    <PanGestureHandler
      onGestureEvent={Animated.event([{ nativeEvent: { x: touchXNEW } }], { useNativeDriver: true })}
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
              console.log('HERE - touchXNEW._value', touchXNEW._value);
              const value = mapRange(touchXNEW._value, 0, trackWidthNEW, props.minimumValue, props.maximumValue);
              console.log('HERE - value', value);
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
          if (!trackWidthNEW) {
            /**
             * Set the trackWidthNEW on mount
             */
            setTrackWidthNEW(event.nativeEvent.layout.width);
          } else {
            /**
             * If this value is updated, update it on a timeout
             * In the event of animations this be more efficient
             */
            clearTimeout(trackWidthTimeout.current);
            event.persist();
            trackWidthTimeout.current = setTimeout(() => {
              setTrackWidthNEW(event.nativeEvent.layout.width);
            }, 100);
          }
        }}
      >
        <View style={[Styles.track, { overflow: 'hidden' }]}>
          {props.tracks.map((t, i) => (
            <View key={i} style={[Styles.track, { backgroundColor: t.color, width: `${t.width * 100}%` }]} />
          ))}

          {/* Main track */}
          <Animated.View
            style={{
              backgroundColor: color.accent.primary,
              width: trackWidthNEW,
              height: 2,
              transform: [{
                translateX: mainTrackWidthNEW,
              }],
            }}
          />
        </View>

        {trackWidthNEW !== 0 && (
          <TouchableHighlight underlayColor="transparent">
            {/* TouchableHighlight to stop propopgration of touch event */}
            <Animated.View
              style={{
                transform: [{
                  translateX: Animated.add(clampThumbNEW, new Animated.Value(-(thumbWidth / 2))),
                }],
              }}
              pointerEvents="none"
            >
              <LoadingIcon
                size={thumbWidth}
                animating={!!props.loading}
                hideOuterRing
              />
            </Animated.View>
          </TouchableHighlight>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Slider;
