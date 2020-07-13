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
import { useHeaderStyles } from '../../../../UI/Headers/Header/Header';
import Styles from './StreamControls.style';

interface StreamControlsProps {
  isPlaying: boolean; // Stops and starts internal position interval
  onPlayPause: () => void; // Send play/pause up to parent
  duration: number; // Length of video in seconds - pass 0 while loading|live
  onSeek: (position: number) => void;
  playableDuration: number; // Buffer length in seconds
  position: number; // Position of thumb
  isLoading: boolean;
  isBuffering: boolean; // Sets Slider.loading
  isError: boolean; // Shows error ui
  isLive: boolean; // Hides all ui except play/pause
  isAudioOnly?: boolean; // Hides full screen and enable video controls
  toggleFullScreen: () => void;
  isFullScreen: boolean;
  toggleVideoEnabled: () => void;
  isVideoEnabled: boolean;
}

const StreamControls: FC<StreamControlsProps> = (props) => {
  const { headerHeight } = useHeaderStyles();
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
   * Clear tinmeout on unmount
   */
  useEffect(() => () => {
    clearTimeout(hideControlsTimeout.current);
  }, []);


  /**
   * Position of the slider must be done within this state
   * Not controlled from outside to mitigate the cursor jumping
   */
  const [videoPosition, setVideoPosition] = useState(Math.floor(props.position));
  const [seekingPosition, setSeekingPosition] = useState(null);


  useEffect(() => {
    if (seekingPosition != null) return;

    const newPosition = Math.floor(props.position);
    if (videoPosition !== newPosition) {
      setVideoPosition(newPosition);
    }
  }, [props.position]);


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
      <View style={[StyleSheet.absoluteFillObject, Styles.cover]}>
        <H4 style={Styles.error}>Something went wrong...</H4>
      </View>
    );
  }


  /**
   * If duration is 0 - video is loading
   * Except if it's live
   */
  if (props.isLoading) {
    return (
      <View style={[StyleSheet.absoluteFillObject, Styles.cover]}>
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
          style={[StyleSheet.absoluteFillObject, Styles.playPause]}
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
            <Icon name={props.isPlaying ? ICON.PAUSE : ICON.PLAY} size="large" style={Styles.icon} />
          </TouchableOpacity>
        </View>


        {/* Toggle fullscreen / toggle enable video button */}
        {!props.isAudioOnly && (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={[StyleSheet.absoluteFillObject, Styles.videoEnabled, { marginTop: props.isFullScreen ? 0 : headerHeight / 2 }]}
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
                  props.toggleVideoEnabled();
                }
              }}
              style={{ padding: spacing.small }}
            >
              <Icon name={!props.isVideoEnabled ? ICON.VIDEO_ENABLED : ICON.VIDEO_DISABLED} size="small" style={Styles.icon} />
            </TouchableOpacity>

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
              style={{ padding: spacing.small }}
            >
              <Icon name={!props.isFullScreen ? ICON.FULLSCREEN : ICON.CLOSE_FULLSCREEN} size="small" style={Styles.icon} />
            </TouchableOpacity>
          </View>
        )}


        {/* Time and track slider */}
        {
          !props.isLive
            ? (
              <View
                style={[
                  Styles.bottomWrap,
                  props.isFullScreen && Styles.bottomWrapFullScreen,
                ]}
                pointerEvents="box-none"
              >
                <View
                  style={[
                    Styles.times,
                    props.isFullScreen && Styles.timesFullScreen,
                  ]}
                >
                  <Small bold forceLight>{formatTime(controlPosition)}</Small>
                  <Small bold forceLight>{duration}</Small>
                </View>

                <View>
                  <Slider
                    value={controlPosition}
                    minimumValue={0}
                    maximumValue={props.duration}
                    onSlidingStarted={() => {
                      showControls();
                    }}
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
                style={Styles.liveWrap}
                pointerEvents="box-none"
              >
                <View style={Styles.live}>
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
