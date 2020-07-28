import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { useToast } from 'mbp-components-rn-toast';
import { GET_CHANNEL_SELFS_QUERY } from '../../../API/query/getChannelSelfs/getChannelSelfs';
import { getChannelSelfsVariables, getChannelSelfs, getChannelSelfs_getChannelSelfs_channels } from '../../../API/query/getChannelSelfs/__generated__/getChannelSelfs';
import ChannelSelfListItem from '../ChannelSelfListItem/ChannelSelfListItem';
import styles from './ChannelSelfs.styles';
import { ScreenProps, STACK } from '../../../screens/utils/interfaces';
import { useLoginChannelWithTokenMutation } from '../../../API/mutation/loginChannelWithToken/loginChannelWithToken';
import { getGQLErrorMessage } from '../../../utils/functions';
import Toast from '../../UI/Toast/Toast';
import ChannelSelfScreen from '../../../screens/ChannelSelfScreen/ChannelSelfScreen';
import { pushScreen } from '../../../screens/utils';

class ChannelSelfsFlatList extends ApolloFlatList<getChannelSelfsVariables, getChannelSelfs, getChannelSelfs_getChannelSelfs_channels> {}

export interface ChannelSelfsProps extends ScreenProps {}

const ChannelSelfs: FC<ChannelSelfsProps> = () => {
  const toast = useToast();


  /**
   * Login channel mutation
   * Gets channel tokens
   */
  const [loginChannelMutation] = useLoginChannelWithTokenMutation({
    onCompleted: () => {
      /**
       * Psuh ChannelSelfScreen
       */
      pushScreen(STACK.TAB_PRODUCER, ChannelSelfScreen, {});
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
    <View>
      <ChannelSelfsFlatList
        query={GET_CHANNEL_SELFS_QUERY}
        variables={{
          first: 5,
        }}
        accessor='getChannelSelfs.channels'
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
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
        // LoadingErrorComponent={(queryResult) => <LoadRetry {...queryResult} />}
        // ListHeaderComponent={() => (
        //   <Text>HEADER</Text>
        // )}
        // ListFooterComponent={(moreToLoad) => (
        //   <Text>{moreToLoad ? 'LOADING' : 'NO MORE TO LOAD'}</Text>
        // )}
      />
    </View>
  );
};

export default ChannelSelfs;
