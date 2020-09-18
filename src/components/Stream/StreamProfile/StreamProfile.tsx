import React, { FC } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Header from '../../UI/Headers/Header/Header';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import StreamProfileView from './StreamProfileView';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import { usePollLive } from '../../../utils/streamFunctions';

export interface StreamProfileProps {
  id: string;
}

const StreamProfile: FC<StreamProfileProps> = (props) => {
  const safeAreaInsets = useSafeArea();
  const screenProps = useScreenProps();

  /**
   * Query
   */
  const queryResult = useGetStreamProfileQuery({
    variables: {
      id: props.id,
    },
    fetchPolicy: 'network-only',
  });


  /**
   * Poll
   */
  usePollLive(props.id);


  return (
    <View style={[GlobalStyles.PageFill, { paddingBottom: safeAreaInsets.bottom }]}>
      <Header onPop={() => Navigation.pop(screenProps.componentId)} />
      <StreamProfileView
        {...props}
        queryResult={queryResult}
      />
    </View>
  );
};

export default StreamProfile;
