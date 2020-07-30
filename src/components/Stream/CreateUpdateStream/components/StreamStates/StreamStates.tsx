import React, { FC } from 'react';
import { View } from 'react-native';
import { STREAM_SELF_FRAGMENT } from '../../../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import PublishStream from '../../../PublishStream/PublishStream';
import DeleteStream from '../../../DeleteStream/DeleteStream';
import CancelStream from '../../../CancelStream/CancelStream';
import Styles from './StreamStates.style';
import { formatForTimezone } from '../../../../../utils/functions';
import H4 from '../../../../UI/Typography/components/H4';

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

  return !props.data.cancelled
    ? (
      <>
        <H4>Stream Published {formatForTimezone(props.data.published, 'calendar')}</H4>
        <CancelStream {...props} />
      </>
    )
    : <H4>Stream Cancelled {formatForTimezone(props.data.cancelled, 'calendar')}</H4>;
};

export default StreamStates;
