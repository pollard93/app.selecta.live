import React, { FC } from 'react';
import { View } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import { STREAM_PROFILE_FRAGMENT } from '../../../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT';
import { STREAM_SELF_FRAGMENT } from '../../../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import Body from '../../../../UI/Typography/components/Body';
import Styles, { DynamicStyles } from './StreamInfo.styles';

interface StreamInfoProps {
  data: STREAM_PROFILE_FRAGMENT | STREAM_SELF_FRAGMENT;
}

const StreamInfo: FC<StreamInfoProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);


  return (
    <View style={[Styles.info, dynamicStyles.info]}>
      <Body>{props.data.info}</Body>
    </View>
  );
};

export default StreamInfo;
