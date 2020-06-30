import React, { FC, useState, useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import Body from '../../../../UI/Typography/components/Body';
import { formatTime } from '../../../../../utils/functions';

interface StreamControlsProps {
  duration?: number; // Seconds
  initialPosition?: number;
  onSeek?: (position: number) => void;
}

const StreamControls: FC<StreamControlsProps> = (props) => {
  /**
   * Position of the slider must be done within this state
   * Not controlled from outside to mitigate the cursor jumping
   */
  const [videoPosition, setVideoPosition] = useState(props.initialPosition);
  const [seekingPosition, setSeekingPosition] = useState(null);


  /**
   * Increment videoPosition by 1 every second
   */
  useEffect(() => {
    const i = setInterval(() => {
      setVideoPosition(videoPosition + 1);
    }, 1000);

    return () => clearInterval(i);
  }, [videoPosition]);


  /**
   * Format duration when props.duration changes
   */
  const duration = useMemo(() => formatTime(props.duration), [props.duration]);


  return (
    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'red', justifyContent: 'flex-end' }]}>
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
        }}
      />
    </View>
  );
};

export default StreamControls;
