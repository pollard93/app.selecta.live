import React, { FC } from 'react';
import { TouchableOpacity, Animated, ViewStyle, StyleProp } from 'react-native';
import { useFollowChannelMutation } from '../../../API/mutation/followChannel/followChannel';
import { CHANNEL_PROFILE_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_PROFILE_FRAGMENT';
import Body from '../../UI/Typography/components/Body';
import Styles from './FollowChannel.styles';

interface FollowChannelProps {
  data: CHANNEL_PROFILE_FRAGMENT;
  wrapStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  textStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
}

const FollowChannel: FC<FollowChannelProps> = (props) => {
  const [mutation, { loading }] = useFollowChannelMutation({
    variables: {
      id: props.data.id,
      unfollow: props.data.following,
    },
  });

  return (
    <TouchableOpacity
      onPress={() => mutation()}
      disabled={loading}
    >
      <Animated.View
        style={[
          Styles.wrap,
          props.wrapStyle,
        ]}
      >
        <Animated.Text style={props.textStyle}>
          <Body bold disableBaseColor>{props.data.following ? 'Unfollow' : 'Follow'}</Body>
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default FollowChannel;
