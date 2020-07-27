import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_CHANNEL_SELFS_QUERY } from '../../../API/query/getChannelSelfs/getChannelSelfs';
import { getChannelSelfsVariables, getChannelSelfs, getChannelSelfs_getChannelSelfs_channels } from '../../../API/query/getChannelSelfs/__generated__/getChannelSelfs';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import ChannelSelfListItem from '../ChannelSelfListItem/ChannelSelfListItem';
import styles from './ChannelSelfs.styles';
import { pushScreen } from '../../../screens/utils';
import ChannelLoginScreen from '../../../screens/ChannelLoginScreen/ChannelLoginScreen';
import { STACK } from '../../../screens/utils/interfaces';

class ChannelSelfsFlatList extends ApolloFlatList<getChannelSelfsVariables, getChannelSelfs, getChannelSelfs_getChannelSelfs_channels> {}

const ChannelSelfs = () => (
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
          /**
           * Go to channel login screen
           */
          pushScreen(STACK.HOME, ChannelLoginScreen, { id: item.id });
        }}
      >
        <ChannelSelfListItem data={item} />
      </TouchableOpacity>
    )}
    LoadingErrorComponent={(queryResult) => <LoadRetry {...queryResult} />}
    ListHeaderComponent={() => (
      <Text>HEADER</Text>
    )}
    ListFooterComponent={(moreToLoad) => (
      <Text>{moreToLoad ? 'LOADING' : 'NO MORE TO LOAD'}</Text>
    )}
  />
);

export default ChannelSelfs;
