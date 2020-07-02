import React, { FC } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { ScreenProps } from '../../../screens/utils/interfaces';
import StreamVideo from '../StreamVideo/StreamVideo';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import StreamCard from '../../UI/Cards/StreamCard/StreamCard';
import Header, { useHeaderStyles } from '../../UI/Headers/Header/Header';

export interface StreamProfileProps extends ScreenProps {
  id: string;
}

const StreamProfile: FC<StreamProfileProps> = (props) => {
  const { headerHeight } = useHeaderStyles();

  /**
   * Query
   */
  const queryResult = useGetStreamProfileQuery({
    variables: {
      id: props.id,
    },
  });


  /**
   * Load | Retry
   */
  if (queryResult.loading || queryResult.error) {
    return <LoadRetry {...queryResult} />;
  }


  const { data: { getStreamProfile } } = queryResult;
  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={() => Navigation.pop(props.componentId)} />

      <SafeAreaView>
        <View style={{ paddingTop: headerHeight / 2 }}>
          <StreamCard data={getStreamProfile} />
        </View>
      </SafeAreaView>

      <StreamVideo {...props} data={getStreamProfile} />
    </View>
  );
};

export default StreamProfile;
