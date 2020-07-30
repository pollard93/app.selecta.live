import React, { FC } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { ScreenProps } from '../../../screens/utils/interfaces';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import Header, { useHeaderStyles } from '../../UI/Headers/Header/Header';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import UpdateChannelView from './UpdateChannelView';

interface UpdateChannelProps extends ScreenProps {}

const UpdateChannel: FC<UpdateChannelProps> = (props) => {
  const { data: { getChannelSelf } } = useGetChannelSelfQuery();

  const { headerHeight } = useHeaderStyles();
  const safeAreaInsets = useSafeArea();

  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={() => Navigation.pop(props.componentId)} />
      <View style={[GlobalStyles.PageFill, { paddingTop: safeAreaInsets.top + headerHeight / 2 }]}>
        <UpdateChannelView data={getChannelSelf} />
      </View>
    </View>
  );
};

export default UpdateChannel;
