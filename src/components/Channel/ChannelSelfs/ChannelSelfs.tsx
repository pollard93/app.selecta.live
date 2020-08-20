import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { useToast } from 'mbp-components-rn-toast';
import { GET_CHANNEL_SELFS_QUERY } from '../../../API/query/getChannelSelfs/getChannelSelfs';
import { getChannelSelfsVariables, getChannelSelfs, getChannelSelfs_getChannelSelfs_channels } from '../../../API/query/getChannelSelfs/__generated__/getChannelSelfs';
import ChannelSelfListItem from '../ChannelSelfListItem/ChannelSelfListItem';
import Styles from './ChannelSelfs.styles';
import { ScreenProps, STACK } from '../../../screens/utils/interfaces';
import { useLoginChannelWithTokenMutation } from '../../../API/mutation/loginChannelWithToken/loginChannelWithToken';
import { getGQLErrorMessage } from '../../../utils/functions';
import Toast from '../../UI/Toast/Toast';
import ChannelSelfScreen from '../../../screens/ChannelSelfScreen/ChannelSelfScreen';
import { pushScreen } from '../../../screens/utils';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';

class ChannelSelfsFlatList extends ApolloFlatList<getChannelSelfsVariables, getChannelSelfs, getChannelSelfs_getChannelSelfs_channels> {}

export interface ChannelSelfsProps extends ScreenProps {}

const ChannelSelfs: FC<ChannelSelfsProps> = () => {
  const toast = useToast();


  /**
   * Login channel mutation
   * Gets channel tokens
   */
  const [loginChannelMutation, { loading }] = useLoginChannelWithTokenMutation({
    onCompleted: () => {
      /**
       * Psuh ChannelSelfScreen
       */
      pushScreen(STACK.PROFILE, ChannelSelfScreen, {});
    },
    onError: (e) => {
      toast.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
  });


  return (
    <View style={GlobalStyles.PageFill}>
      <ChannelSelfsFlatList
        query={GET_CHANNEL_SELFS_QUERY}
        variables={{
          first: 5,
        }}
        accessor='getChannelSelfs.channels'
        renderItem={({ item }) => (
          <TouchableOpacity
            style={Styles.item}
            onPress={() => {
              if (loading) return;

              loginChannelMutation({
                variables: {
                  id: item.id,
                },
              });
            }}
          >
            <ChannelSelfListItem data={item} />
          </TouchableOpacity>
        )}
        ListHeaderComponent={({ queryResult }) => {
          if (queryResult.loading || queryResult.error) {
            return (
              <View style={Styles.header}>
                <LoadRetry {...queryResult} />
              </View>
            );
          }

          return null;
        }}
      />
    </View>
  );
};

export default ChannelSelfs;
