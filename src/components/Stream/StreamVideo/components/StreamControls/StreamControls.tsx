import React, { FC, useState, useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Body from '../../../../UI/Typography/components/Body';
import { formatTime } from '../../../../../utils/functions';
import Icon, { ICON } from '../../../../UI/Icon/Icon';

interface StreamControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  duration?: number; // Seconds
  initialPosition?: number;
  onSeek?: (position: number) => void;
}

const StreamControls: FC<StreamControlsProps> = (props) => {
  /**
   *
   */
  const hideControlsTimeout = useRef<number>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;


  /**
   * Fade in controls
   * Controls are faded in on touch of outmost view
   * hideControls must be called to hide them
   */
  const showControls = () => {
    // Hidecontrols timeout should be cleared here
    // Making this function suitable to call to keep the controls shown
    clearTimeout(hideControlsTimeout.current);

    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      },
    ).start();
  };


  /**
   * Clear and set timeout to hide controls
   */
  const hideControls = () => {
    clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        },
      ).start();
    }, 2000);
  };


  /**
   * Position of the slider must be done within this state
   * Not controlled from outside to mitigate the cursor jumping
   */
  const [videoPosition, setVideoPosition] = useState(props.initialPosition);
  const [seekingPosition, setSeekingPosition] = useState(null);
  const videoPositionInterval = useRef<number>(null);


  /**
   * Increment videoPosition by 1 every second
   */
  useEffect(() => {
    if (videoPosition >= props.duration) {
      clearInterval(videoPositionInterval.current);
      return undefined;
    }

    videoPositionInterval.current = setInterval(() => {
      setVideoPosition(videoPosition + 1);
    }, 1000);

    return () => clearInterval(videoPositionInterval.current);
  }, [videoPosition]);


  /**
   * Format duration when props.duration changes
   */
  const duration = useMemo(() => formatTime(props.duration), [props.duration]);


  return (
    <View
      onStartShouldSetResponder={() => true}
      onResponderGrant={() => {
        showControls();
      }}
      onResponderRelease={() => {
        /**
         * On release, hide the controls
         * To prevent these from hiding, any interaction with child elements should execute showControls()
         */
        hideControls();
      }}
      style={[StyleSheet.absoluteFillObject, { backgroundColor: 'red', justifyContent: 'flex-end' }]}
    >
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { backgroundColor: 'red', justifyContent: 'flex-end', opacity: fadeAnim }]}
      >
        <View style={[StyleSheet.absoluteFillObject, { alignItems: 'center', justifyContent: 'center' }]}>
          <TouchableOpacity
            onPress={() => {
              props.onPlayPause();
              hideControls();
            }}
          >
            <Icon name={props.isPlaying ? ICON.PAUSE : ICON.PLAY} size="large" style={{ tintColor: 'white' }} />
          </TouchableOpacity>
        </View>

        <Body>{formatTime(seekingPosition !== null ? seekingPosition : videoPosition)}</Body>
        <Body>{duration}</Body>
        <Slider
          style={{ width: '100%', height: 40 }}
          step={1}
          value={seekingPosition !== null ? undefined : videoPosition}
          minimumValue={0}
          maximumValue={props.duration}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(v) => {
            /**
             * When the value changes, update the seekingPosition state
             * So the ui can show the position of the slider handle, not the video
             */
            setSeekingPosition(v);
            showControls();
          }}
          onSlidingComplete={(v) => {
            /**
             * When sliding is complete
             * Execute on seek for the video
             * Set the video position
             * Remove the seeking state so the ui will now reflect the video position
             */
            props.onSeek(v);
            setVideoPosition(v);
            setSeekingPosition(null);
            hideControls();
          }}
        />
      </Animated.View>
    </View>
  );
};

export default StreamControls;
