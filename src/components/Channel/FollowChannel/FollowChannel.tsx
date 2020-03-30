import React from 'react';
import { View, Button } from 'react-native';
import { useFollowChannelMutation } from '../../../API/mutation/followChannel/followChannel';
import { CHANNEL_PROFILE_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_PROFILE_FRAGMENT';

interface FollowChannelProps {
  data: CHANNEL_PROFILE_FRAGMENT;
}

const FollowChannel = (props: FollowChannelProps) => {
  const [mutation, { loading }] = useFollowChannelMutation({
    variables: {
      id: props.data.id,
      unfollow: props.data.following,
    },
  });

  return (
    <View>
      <Button
        title={props.data.following ? 'UNFOLLOW' : 'FOLLOW'}
        onPress={() => mutation()}
        disabled={loading}
      />
    </View>
  );
};

export default FollowChannel;
