import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_CHANNEL_PROFILES_QUERY } from '../../../API/query/getChannelProfiles/getChannelProfiles';
import { getChannelProfilesVariables, getChannelProfiles, getChannelProfiles_getChannelProfiles_channels } from '../../../API/query/getChannelProfiles/__generated__/getChannelProfiles';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import ChannelListItem from '../ChannelListItem/ChannelListItem';
import styles from './SearchChannels.styles';

class SearchChannelsFlatList extends ApolloFlatList<getChannelProfilesVariables, getChannelProfiles, getChannelProfiles_getChannelProfiles_channels> {}

const SearchChannels = () => {
  const [search, setSearch] = useState('');

  return (
    <View>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder='Search name'
        returnKeyType="done"
        blurOnSubmit
      />

      <SearchChannelsFlatList
        query={GET_CHANNEL_PROFILES_QUERY}
        variables={{
          where: {
            // eslint-disable-next-line camelcase
            name_contains: search,
          },
          first: 5,
        }}
        accessor='getChannelProfiles.channels'
        renderItem={({ item }) => (
          <View style={styles.item}>
            <ChannelListItem data={item} />
          </View>
        )}
        LoadingErrorComponent={(queryResult) => <LoadRetry {...queryResult} />}
        ListHeaderComponent={() => (
          <Text>HEADER</Text>
        )}
        ListFooterComponent={(moreToLoad) => (
          <Text>{moreToLoad ? 'LOADING' : 'NO MORE TO LOAD'}</Text>
        )}
      />
    </View>
  );
};

export default SearchChannels;
