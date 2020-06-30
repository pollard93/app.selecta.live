import React, { FC, useState, useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { formatTime } from '../../../../../utils/functions';
import Icon, { ICON } from '../../../../UI/Icon/Icon';
import color from '../../../../../styles/definitions/color';
import Small from '../../../../UI/Typography/components/Small';
import spacing from '../../../../../styles/definitions/spacing';
import Slider from '../../../../UI/Slider/Slider';

interface StreamControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  isBuffering?: boolean
  duration?: number; // Seconds
  playableDuration?: number;
  initialPosition?: number;
  onSeek?: (position: number) => void;
}

const StreamControls: FC<StreamControlsProps> = (props) => {
  /**
   *
   */
  const hideControlsTimeout = useRef<number>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;


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
    if (!props.isPlaying || videoPosition >= props.duration) {
      clearInterval(videoPositionInterval.current);
      return undefined;
    }

    videoPositionInterval.current = setInterval(() => {
      setVideoPosition(videoPosition + 1);
    }, 1000);

    return () => clearInterval(videoPositionInterval.current);
  }, [props.isPlaying, videoPosition, props.duration]);


  /**
   * Format duration when props.duration changes
   */
  const duration = useMemo(() => formatTime(props.duration), [props.duration]);
  const controlPosition = seekingPosition !== null ? seekingPosition : videoPosition;


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
      style={[StyleSheet.absoluteFillObject, { justifyContent: 'flex-end' }]}
    >
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { justifyContent: 'flex-end', opacity: fadeAnim, backgroundColor: color.mono.darkCover }]}
      >
        <View style={[StyleSheet.absoluteFillObject, { alignItems: 'center', justifyContent: 'center' }]}>
          <TouchableOpacity
            onPress={() => {
              // eslint-disable-next-line no-underscore-dangle
              if ((fadeAnim as any)._value < 1) {
                showControls();
              } else {
                props.onPlayPause();
                hideControls();
              }
            }}
          >
            <Icon name={props.isPlaying ? ICON.PAUSE : ICON.PLAY} size="large" style={{ tintColor: 'white' }} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: spacing.small }}>
          <Small bold light>{formatTime(controlPosition)}</Small>
          <Small bold light>{duration}</Small>
        </View>

        {/*
        <Slider
          style={{ height: 2, marginLeft: -5, marginRight: -5 }}
          step={1}
          value={controlPosition}
          minimumValue={0}
          maximumValue={props.duration}
          minimumTrackTintColor={color.accent.primary}
          maximumTrackTintColor={color.mono.light}
          onValueChange={(v) => {
            /**
             * When the value changes, update the seekingPosition state
             * So the ui can show the position of the slider handle, not the video
             *
            setSeekingPosition(v);
            showControls();
          }}
          onSlidingComplete={(v) => {
            /**
             * When sliding is complete
             * Execute on seek for the video
             * Set the video position
             * Remove the seeking state so the ui will now reflect the video position
             *
            props.onSeek(v);
            setVideoPosition(v);
            setSeekingPosition(null);
            hideControls();
          }}
          thumbTintColor={color.accent.primary}
        />
        */}

        <Slider
          value={controlPosition}
          minimumValue={0}
          maximumValue={props.duration}
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
          tracks={[
            { color: 'rgba(255, 255, 255, 0.7)', width: 1 }, // Base
            { color: color.mono.dark, width: props.playableDuration / props.duration }, // Buffer
            { color: color.accent.primary, width: controlPosition / props.duration }, // Position
          ]}
          loading={props.isBuffering}
        />
      </Animated.View>
    </View>
  );
};

export default StreamControls;
