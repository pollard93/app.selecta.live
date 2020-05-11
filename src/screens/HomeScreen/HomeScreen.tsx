import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useApolloClient } from 'react-apollo';
import { useToast } from 'mbp-components-rn-toast';
import { goToLogin } from '../utils';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import { useGetSelfQuery } from '../../API/query/getSelf/getSelf';
import { removeAccessToken } from '../../ApolloClient/resolvers/mutation/removeAccessToken/__generated__/removeAccessToken';
import { REMOVE_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/removeAccessToken/removeAccessTokenMutation';
import ChannelSelfs from '../../components/Channel/ChannelSelfs/ChannelSelfs';
import { removeChannelAccessToken } from '../../ApolloClient/resolvers/mutation/removeChannelAccessToken/__generated__/removeChannelAccessToken';
import Toast from '../../components/UI/Toast/Toast';
import { REMOVE_CHANNEL_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/removeChannelAccessToken/removeChannelAccessTokenMutation';

export interface HomeScreenProps extends ScreenProps {
  toastMessage?: string;
}

const HomeScreen = (props: HomeScreenProps) => {
  const toast = useToast();
  const client = useApolloClient();
  const { data: { getSelf } } = useGetSelfQuery(); // GetSelf request is always requested and cache, so no need to wait for loading


  /**
   * This functionality needs to be unit tested
   */
  useEffect(() => {
    if (props.toastMessage) {
      toast.push({
        duration: 1000,
        component: (
          <Toast content={props.toastMessage} />
        ),
        dismissible: false,
      });
    }

    // Logout channel after render
    client.mutate<removeChannelAccessToken>({
      mutation: REMOVE_CHANNEL_ACCESS_TOKEN_MUTATION,
    });

    SplashScreen.hide();
  }, []);


  return (
    <View style={[
      GlobalStyles.PageFill,
      // eslint-disable-next-line react-native/no-inline-styles
      { alignItems: 'center', justifyContent: 'center' },
    ]}>
      <Text>You are logged in as {getSelf.email}</Text>
      <TouchableOpacity
        onPress={() => {
          // Logout
          client.mutate<removeAccessToken>({
            mutation: REMOVE_ACCESS_TOKEN_MUTATION,
          });

          goToLogin({});
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>

      <Text>Channels:</Text>
      <ChannelSelfs />
    </View>
  );
};

export default HomeScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
HomeScreen.prototype.ScreenName = 'HomeScreen';

/**
 * Export as const so can be imported without the default
 */
export const HomeScreenName = HomeScreen.prototype.ScreenName;
