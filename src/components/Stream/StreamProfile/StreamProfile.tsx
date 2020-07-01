import React, { FC } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { ScreenProps } from '../../../screens/utils/interfaces';
import StreamVideo from '../StreamVideo/StreamVideo';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import StreamCard from '../../UI/Cards/StreamCard/StreamCard';
import Header from '../../UI/Headers/Header/Header';
import { headerHeight } from '../../UI/Headers/Header/Header.style';

export interface StreamProfileProps extends ScreenProps {
  id: string;
}

const StreamProfile: FC<StreamProfileProps> = (props) => {
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
      <View style={{ paddingTop: headerHeight }}>
        <View>
          <StreamCard data={getStreamProfile} />
          <StreamVideo data={getStreamProfile} />
        </View>
      </View>
    </View>
  );
};

export default StreamProfile;
