import React, { FC } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import StreamSelfView from './StreamSelfView';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import ChannelSelfHeader from '../../UI/Headers/ChannelSelfHeader/ChannelSelfHeader';

export interface StreamSelfProps {
  id: string;
}

const StreamSelf: FC<StreamSelfProps> = (props) => {
  const safeAreaInsets = useSafeArea();
  const screenProps = useScreenProps();


  /**
   * Query
   */
  const queryResult = useGetStreamSelfQuery({
    variables: {
      id: props.id,
    },
    fetchPolicy: 'network-only',
  });


  /**
   * On Pop
   */
  const onPop = () => {
    Navigation.pop(screenProps.componentId);
  };


  return (
    <View style={[GlobalStyles.PageFill, { paddingBottom: safeAreaInsets.bottom }]}>
      <ChannelSelfHeader
        onPop={onPop}
      />
      <StreamSelfView
        {...props}
        queryResult={queryResult}
      />
    </View>
  );
};

export default StreamSelf;
