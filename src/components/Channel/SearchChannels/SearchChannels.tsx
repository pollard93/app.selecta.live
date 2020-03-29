import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { SEARCH_CHANNELS_QUERY } from '../../../API/query/searchChannels/searchChannels';
import { searchChannelsVariables, searchChannels, searchChannels_searchChannels_channels } from '../../../API/query/searchChannels/__generated__/searchChannels';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import ChannelListItem from '../ChannelListItem/ChannelListItem';
import Input from '../../UI/Input/Input';
import styles from './SearchChannels.styles';

class SearchChannelsFlatList extends ApolloFlatList<searchChannelsVariables, searchChannels, searchChannels_searchChannels_channels> {}

const SearchChannels = () => {
  const [search, setSearch] = useState('');

  return (
    <View>
      <Input
        type="text"
        name="search"
        required={false}
        value={search}
        onChange={setSearch}
        textInputProps={{
          placeholder: 'Search name',
        }}
        originalValue={null}
        originalValid={null}
        touched={null}
        changed={null}
      />

      <SearchChannelsFlatList
        query={SEARCH_CHANNELS_QUERY}
        variables={{
          where: {
            // eslint-disable-next-line camelcase
            name_contains: search,
          },
          first: 5,
        }}
        accessor='searchChannels.channels'
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
