import React, { FC } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';
import { ScreenProps } from '../../../screens/utils/interfaces';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Header from '../../UI/Headers/Header/Header';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import StreamProfileView from './StreamProfileView';

export interface StreamProfileProps extends ScreenProps {
  id: string;
}

const StreamProfile: FC<StreamProfileProps> = (props) => {
  const safeAreaInsets = useSafeArea();

  /**
   * Query
   */
  const queryResult = useGetStreamProfileQuery({
    variables: {
      id: props.id,
    },
  });

  return (
    <View style={[GlobalStyles.PageFill, { paddingBottom: safeAreaInsets.bottom }]}>
      <Header onPop={() => Navigation.pop(props.componentId)} />
      <StreamProfileView queryResult={queryResult} />
    </View>
  );
};

export default StreamProfile;
