import React, { FC } from 'react';
import { View } from 'react-native';
import { getStreamProfile_getStreamProfile } from '../../../API/query/getStreamProfile/__generated__/getStreamProfile';
import { getStreamSelf_getStreamSelf } from '../../../API/query/getStreamSelf/__generated__/getStreamSelf';
import H4 from '../../UI/Typography/components/H4';
import { formatForTimezone } from '../../../utils/functions';
import Body from '../../UI/Typography/components/Body';
import Styles from './StreamCancelledMessage.styles';

interface StreamCancelledMessageProps {
  data: getStreamProfile_getStreamProfile | getStreamSelf_getStreamSelf;
}

const StreamCancelledMessage: FC<StreamCancelledMessageProps> = (props) => (
  <View style={Styles.wrap}>
    <H4 style={Styles.cancelledHeading}>Stream Cancelled: {formatForTimezone(props.data.cancelled, 'calendar')}</H4>
    <Body style={Styles.cancelledHeading}>A message from {props.data.channel.name}:</Body>
    <H4>{props.data.cancelledMessage}</H4>
  </View>
);

export default StreamCancelledMessage;
