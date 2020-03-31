import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useApolloClient } from 'react-apollo';
import Purchases from 'react-native-purchases';
import { goToLogin } from '../utils';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import { useGetSelfQuery } from '../../API/query/getSelf/getSelf';
import { removeAccessToken } from '../../ApolloClient/resolvers/mutation/removeAccessToken/__generated__/removeAccessToken';
import { REMOVE_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/removeAccessToken/removeAccessTokenMutation';

const HomeScreen = () => {
  const client = useApolloClient();
  const { data: { getSelf } } = useGetSelfQuery(); // GetSelf request is always requested and cache, so no need to wait for loading

  useEffect(() => {
    SplashScreen.hide();
    Purchases.setDebugLogsEnabled(true);
    Purchases.setup('drhCKAuiRwoPKWMAqrinFsOqBRissGHI');

    (async () => {
      try {
        // const entitlements = await Purchases.getEntitlements();
        // console.log("HomeScreen -> entitlements", entitlements)
        const products = await Purchases.getProducts(['product_1']);
        console.log('HomeScreen -> products', products);
        // const offerings = await Purchases.getOfferings();
        // console.log('HomeScreen -> offerings', offerings);
        // if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
        //   // Display packages for sale
        // }
      } catch (e) {
        console.log('HomeScreen -> e', e);
      }
    })();
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
