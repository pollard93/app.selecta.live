import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useApolloClient } from 'react-apollo';
import { goHome } from '../utils';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import { removeChannelAccessToken } from '../../ApolloClient/resolvers/mutation/removeChannelAccessToken/__generated__/removeChannelAccessToken';
import { REMOVE_CHANNEL_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/removeChannelAccessToken/removeChannelAccessTokenMutation';
import { useGetChannelSelfQuery } from '../../API/query/getChannelSelf/getChannelSelf';
import ChannelSelf from '../../components/Channel/ChannelSelf/ChannelSelf';

const ChannelScreen = () => {
  const client = useApolloClient();
  const { data: { getChannelSelf } } = useGetChannelSelfQuery(); // GetChannelSelfQuery request is always requested and cached, so no need to wait for loading

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={[
      GlobalStyles.PageFill,
      // eslint-disable-next-line react-native/no-inline-styles
      { alignItems: 'center', justifyContent: 'center' },
    ]}>
      <Text>You are logged in to channel {getChannelSelf.name}</Text>
      <TouchableOpacity
        onPress={() => {
          // Logout
          client.mutate<removeChannelAccessToken>({
            mutation: REMOVE_CHANNEL_ACCESS_TOKEN_MUTATION,
          });

          goHome();
        }}
      >
        <Text>Logout of channel</Text>
      </TouchableOpacity>

      <ChannelSelf />
    </View>
  );
};

export default ChannelScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
ChannelScreen.prototype.ScreenName = 'ChannelScreen';

/**
 * Export as const so can be imported without the default
 */
export const ChannelScreenName = ChannelScreen.prototype.ScreenName;
