import React, { FC } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Header from '../../UI/Headers/Header/Header';
import StreamSelfView from './StreamSelfView';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';

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
  });

  return (
    <View style={[GlobalStyles.PageFill, { paddingBottom: safeAreaInsets.bottom }]}>
      <Header onPop={() => Navigation.pop(screenProps.componentId)} />
      <StreamSelfView
        {...props}
        queryResult={queryResult}
      />
    </View>
  );
};

export default StreamSelf;
