import React, { FC } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import { ScreenProps } from '../../../screens/utils/interfaces';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Header from '../../UI/Headers/Header/Header';
import StreamSelfView from './StreamSelfView';

export interface StreamSelfProps extends ScreenProps {
  id: string;
}

const StreamSelf: FC<StreamSelfProps> = (props) => {
  const safeAreaInsets = useSafeArea();

  /**
   * Query
   */
  const queryResult = useGetStreamSelfQuery({
    variables: {
      id: props.id,
    },
  });

  return (
    <View style={[GlobalStyles.PageFill, { paddingBottom: safeAreaInsets.bottom }]}>
      <Header onPop={() => Navigation.pop(props.componentId)} />
      <StreamSelfView queryResult={queryResult} />
    </View>
  );
};

export default StreamSelf;
