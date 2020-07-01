import React, { FC, useRef, useEffect, useState } from 'react';
import { Animated, View, TouchableHighlight } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Styles from './Slider.style';
import scalePx from '../../../utils/scalePx';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
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
  loading?: boolean; // If true sets the LoadingIcon (thumb) to animate
}

const Slider: FC<SliderProps> = (props) => {
  const outerWidth = useRef(scalePx(20)).current;
  const touchX = useRef(new Animated.Value(0)).current;
  const currentState = useRef<State>(null);
  const [wrapWidth, setWrapWidth] = useState(0);


  /**
   * Gets the mapped value using props.minimumValue and props.maximumValue
   * @param absoluteX - the x position of the thumb
   */
  const getMappedValue = (absoluteX: number) => mapRange(absoluteX, 0, wrapWidth, props.minimumValue, props.maximumValue);


  /**
   * Is called continuously on pan
   * Executes props.onValueChange if given
   */
  const onPan = ({ nativeEvent }) => {
    if (props.onValueChange) {
      props.onValueChange(getMappedValue(nativeEvent.absoluteX));
    }
  };


  /**
   * When props.value or the wrapWidth changes
   * Set the value of touchX
   */
  useEffect(() => {
    /**
     * Do not update the value if the current gesture state is active
     */
    if (currentState.current !== State.ACTIVE) {
      const value = mapRange(props.value, props.minimumValue, props.maximumValue, 0, wrapWidth);
      // eslint-disable-next-line no-restricted-globals
      if (value != null) {
        touchX.setValue(value);
      }
    }
  }, [props.value, wrapWidth, props.maximumValue]);


  return (
    <PanGestureHandler
      onGestureEvent={Animated.event([{ nativeEvent: { x: touchX } }], { useNativeDriver: true, listener: onPan })}
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
              props.onSlidingComplete(getMappedValue(nativeEvent.absoluteX));
            }
            break;
        }
      }}
    >
      <Animated.View
        style={Styles.wrap}
        onLayout={(event) => {
          /**
           * Set the wrapWidth on mount and update the value
           */
          if (!wrapWidth) {
            setWrapWidth(event.nativeEvent.layout.width);
          }
        }}
        // pointerEvents="none"
      >
        {props.tracks.map((t, i) => (
          <View key={i} style={[Styles.track, { backgroundColor: t.color, width: `${t.width * 100}%` }]} />
        ))}

        {wrapWidth !== 0 && (
          <TouchableHighlight underlayColor="transparent">
            {/* TouchableHighlight to stop propopgration of touch event */}
            <Animated.View
              style={{
                transform: [{
                  translateX: Animated.add(touchX, new Animated.Value(-(outerWidth / 2))),
                }],
              }}
              pointerEvents="none"
            >
              <LoadingIcon
                size={outerWidth}
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
