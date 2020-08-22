import React, { FC } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useApolloClient } from 'react-apollo';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import Header, { useHeaderStyles } from '../../UI/Headers/Header/Header';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import ChannelSelfView from './ChannelSelfView';
import { removeChannelAccessToken } from '../../../ApolloClient/resolvers/mutation/removeChannelAccessToken/__generated__/removeChannelAccessToken';
import { REMOVE_CHANNEL_ACCESS_TOKEN_MUTATION } from '../../../ApolloClient/resolvers/mutation/removeChannelAccessToken/removeChannelAccessTokenMutation';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';

export interface ChannelSelfProps {}

const ChannelSelf: FC<ChannelSelfProps> = () => {
  const client = useApolloClient();
  const screenProps = useScreenProps();


  /**
   * Get channel profile query
   */
  const queryResult = useGetChannelSelfQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });


  /**
   * On pop, remove channel token
   */
  const onPop = async () => {
    try {
      client.mutate<removeChannelAccessToken>({
        mutation: REMOVE_CHANNEL_ACCESS_TOKEN_MUTATION,
      });
    // eslint-disable-next-line no-empty
    } catch {}

    Navigation.pop(screenProps.componentId);
  };


  const { headerHeight } = useHeaderStyles();
  const safeAreaInsets = useSafeArea();


  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={onPop} />
      <View style={[GlobalStyles.PageFill, { paddingTop: safeAreaInsets.top + headerHeight / 2 }]}>
        <ChannelSelfView queryResult={queryResult} />
      </View>
    </View>
  );
};

export default ChannelSelf;
