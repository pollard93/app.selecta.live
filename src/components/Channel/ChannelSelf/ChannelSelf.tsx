import React, { FC, useRef } from 'react';
import { FlatList, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useApolloClient } from 'react-apollo';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import ChannelSelfView from './ChannelSelfView';
import { removeChannelAccessToken } from '../../../ApolloClient/resolvers/mutation/removeChannelAccessToken/__generated__/removeChannelAccessToken';
import { REMOVE_CHANNEL_ACCESS_TOKEN_MUTATION } from '../../../ApolloClient/resolvers/mutation/removeChannelAccessToken/removeChannelAccessTokenMutation';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import ChannelSelfHeader from '../../UI/Headers/ChannelSelfHeader/ChannelSelfHeader';

export interface ChannelSelfProps {}

const ChannelSelf: FC<ChannelSelfProps> = () => {
  const client = useApolloClient();
  const screenProps = useScreenProps();
  const ref = useRef<FlatList>();


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

    Navigation.dismissModal(screenProps.componentId);
  };


  /**
   * Scroll to top of flatlist
   */
  const onPressLogo = () => {
    // eslint-disable-next-line no-unused-expressions
    ref.current?.scrollToOffset({ animated: true, offset: 0 });
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <ChannelSelfHeader
        onPop={onPop}
        onPressLogo={onPressLogo}
      />
      <ChannelSelfView
        queryResult={queryResult}
        innerRef={ref}
      />
    </View>
  );
};

export default ChannelSelf;
