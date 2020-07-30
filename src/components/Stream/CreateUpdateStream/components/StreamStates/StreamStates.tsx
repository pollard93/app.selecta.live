import React, { FC } from 'react';
import { View } from 'react-native';
import { STREAM_SELF_FRAGMENT } from '../../../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import PublishStream from '../../../PublishStream/PublishStream';
import DeleteStream from '../../../DeleteStream/DeleteStream';
import CancelStream from '../../../CancelStream/CancelStream';
import Styles from './StreamStates.style';

interface StreamStatesProps {
  data: STREAM_SELF_FRAGMENT;
}

const StreamStates: FC<StreamStatesProps> = (props) => {
  if (!props.data.published) {
    return (
      <View style={Styles.wrap}>
        <View style={Styles.inner}>
          <DeleteStream {...props} />
        </View>
        <View style={Styles.inner}>
          <PublishStream {...props} />
        </View>
      </View>
    );
  }

  return (
    <CancelStream {...props} />
  );
};

export default StreamStates;
