import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
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

  switch (true) {
    case queryResult.loading:
    case !!queryResult.error:
      return <LoadRetry {...queryResult} />;
  }


  const { data: { getStreamProfile } } = queryResult;
  // console.log('getStreamProfile', getStreamProfile);
  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={() => Navigation.pop(props.componentId)} />
      <View style={{ paddingTop: headerHeight }}>
        <View>
          <StreamCard data={getStreamProfile} />
          <StreamVideo data={getStreamProfile} />
        </View>
      </View>

      {/* <Text>{getStreamProfile.name}</Text>
      <AsyncImage
        splashUrl={getStreamProfile.image?.url?.splash}
        fullUrl={getStreamProfile.image?.url?.full}
        // eslint-disable-next-line global-require
        placeholderImageSource={require('../../../../icons/icon.jpg')}
        containerProps={{
          style: {
            width: 100,
            height: 100,
          },
        }}
      />
      {getStreamProfile.audioOnly && <Text>This stream is audio only</Text>}

      <View style={{ flex: 1 }}>
        <StreamVideo data={getStreamProfile} />
      </View> */}
    </View>
  );
};

export default StreamProfile;
