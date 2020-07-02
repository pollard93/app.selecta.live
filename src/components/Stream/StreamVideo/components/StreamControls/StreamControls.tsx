import React, { FC, useState, useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { formatTime } from '../../../../../utils/functions';
import Icon, { ICON } from '../../../../UI/Icon/Icon';
import color from '../../../../../styles/definitions/color';
import Small from '../../../../UI/Typography/components/Small';
import spacing from '../../../../../styles/definitions/spacing';
import Slider from '../../../../UI/Slider/Slider';
import LoadingIcon from '../../../../UI/LoadingIcon/LoadingIcon';
import H4 from '../../../../UI/Typography/components/H4';

interface StreamControlsProps {
  isPlaying: boolean; // Stops and starts internal position interval
  onPlayPause: () => void; // Send play/pause up to parent
  duration: number; // Length of video in seconds - pass 0 while loading|live
  onSeek: (position: number) => void;
  playableDuration: number; // Buffer length in seconds
  initialPosition: number; // Start position, 0 should be given to play from start
  isLoading: boolean;
  isBuffering: boolean; // Sets Slider.loading
  isError: boolean; // Shows error ui
  isLive: boolean; // Hides all ui except play/pause
  toggleFullScreen: () => void;
  isFullScreen: boolean;
}

const StreamControls: FC<StreamControlsProps> = (props) => {
  const hideControlsTimeout = useRef<number>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;


  /**
   * Clear and set timeout to hide controls
   */
  const hideControls = (timeout = 1000) => {
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
    }, timeout);
  };


  /**
   * If is playing on mount, hide controls
   */
  useEffect(() => {
    if (props.isPlaying) {
      hideControls(2000);
    }
  }, []);


  /**
   * Fade in controls
   * Controls are faded in on touch of outmost view
   * hideControls must be called to hide them
   */
  const showControls = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      },
    ).start();

    if (props.isPlaying) {
      hideControls(2300);
    }
  };


  /**
   * Position of the slider must be done within this state
   * Not controlled from outside to mitigate the cursor jumping
   */
  const [videoPosition, setVideoPosition] = useState(Math.floor(props.initialPosition));
  const [seekingPosition, setSeekingPosition] = useState(null);
  const videoPositionInterval = useRef<number>(null);


  useEffect(() => {
    const newPosition = Math.floor(props.initialPosition);
    if (videoPosition !== newPosition) {
      setVideoPosition(newPosition);
    }
  }, [props.initialPosition]);


  /**
   * Increment videoPosition by 1 every second
   */
  useEffect(() => {
    /**
     * When video is not playing or video ends or video is live
     * Clear the videoPosition interval
     */
    if (!props.isPlaying || videoPosition >= props.duration || props.isLive) {
      clearInterval(videoPositionInterval.current);
      if (videoPosition >= props.duration) {
        setVideoPosition(0);
      }
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
  const duration = useMemo(() => props.duration !== 0 && formatTime(props.duration), [props.duration]);
  const controlPosition = seekingPosition !== null ? seekingPosition : videoPosition;


  /**
   * Handle error
   */
  if (props.isError) {
    return (
      <View style={[StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center', backgroundColor: color.mono.darkCover }]}>
        <H4 light>There has been an error</H4>
      </View>
    );
  }


  /**
   * If duration is 0 - video is loading
   * Except if it's live
   */
  if (props.isLoading) {
    return (
      <View style={[StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center', backgroundColor: color.mono.darkCover }]}>
        <LoadingIcon />
      </View>
    );
  }


  return (
    <View
      onStartShouldSetResponder={() => true}
      onResponderGrant={() => {
        // eslint-disable-next-line no-underscore-dangle
        if ((fadeAnim as any)._value < 1) {
          showControls();
        } else {
          hideControls(0);
        }
      }}
      style={StyleSheet.absoluteFillObject}
    >
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { opacity: fadeAnim, backgroundColor: color.mono.darkCover }]}
      >
        {/* Play/Pause button */}
        <View
          style={[StyleSheet.absoluteFillObject, { alignItems: 'center', justifyContent: 'center' }]}
          pointerEvents="box-none"
        >
          <TouchableOpacity
            onPress={() => {
              // eslint-disable-next-line no-underscore-dangle
              if ((fadeAnim as any)._value < 1) {
                /**
                 * If controls not shown assume this touch is to show controls
                 */
                showControls();
              } else {
                /**
                 * If controls shown, play/pause
                 */
                props.onPlayPause();

                /**
                 * If video is now playing
                 * Hide controls
                 */
                if (!props.isPlaying) {
                  hideControls(0);
                } else {
                  clearTimeout(hideControlsTimeout.current);
                }
              }
            }}
          >
            <Icon name={props.isPlaying ? ICON.PAUSE : ICON.PLAY} size="large" style={{ tintColor: 'white' }} />
          </TouchableOpacity>
        </View>


        {/* Full screen button */}
        <View
          style={[StyleSheet.absoluteFillObject, { alignItems: 'flex-end', marginRight: spacing.large, marginTop: spacing.large }]}
          pointerEvents="box-none"
        >
          <TouchableOpacity
            onPress={() => {
              // eslint-disable-next-line no-underscore-dangle
              if ((fadeAnim as any)._value < 1) {
                /**
                 * If controls not shown assume this touch is to show controls
                 */
                showControls();
              } else {
                props.toggleFullScreen();
              }
            }}
          >
            <Icon name={!props.isFullScreen ? ICON.FULLSCREEN : ICON.CLOSE_FULLSCREEN} size="small" style={{ tintColor: 'white' }} />
          </TouchableOpacity>
        </View>


        {/* Time and track slider */}
        {
          !props.isLive
            ? (
              <View
                style={[
                  { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end' },
                  props.isFullScreen && { padding: spacing.base },
                ]}
                pointerEvents="box-none"
              >
                <View
                  style={[
                    { flexDirection: 'row', justifyContent: 'space-between', padding: spacing.small },
                    props.isFullScreen && { paddingHorizontal: 0 },
                  ]}
                >
                  <Small bold light>{formatTime(controlPosition)}</Small>
                  <Small bold light>{duration}</Small>
                </View>

                <View>
                  <Slider
                    value={controlPosition}
                    minimumValue={0}
                    maximumValue={props.duration}
                    onValueChange={(v) => {
                      clearTimeout(hideControlsTimeout.current);
                      /**
                       * When the value changes, update the seekingPosition state
                       * So the ui can show the position of the slider handle, not the video
                       */
                      setSeekingPosition(v);
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

                      // If playing, hide controls
                      if (props.isPlaying) {
                        hideControls();
                      }
                    }}
                    tracks={[
                      { color: color.mono.dark, width: props.playableDuration / props.duration }, // Buffer
                    ]}
                    loading={props.isBuffering}
                  />
                </View>
              </View>
            )
            : (
              <View
                style={{ ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end' }}
                pointerEvents="box-none"
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.small }}>
                  <LoadingIcon size="small" />
                  <Small bold light style={{ paddingLeft: spacing.xsmall }}>LIVE</Small>
                  {props.isBuffering && <Small bold light style={{ paddingLeft: spacing.xsmall }}>Buffering...</Small>}
                </View>
              </View>
            )
        }
      </Animated.View>
    </View>
  );
};

export default StreamControls;
