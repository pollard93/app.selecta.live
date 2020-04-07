import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { SEARCH_STREAMS_QUERY } from '../../../API/query/searchStreams/searchStreams';
import { searchStreamsVariables, searchStreams, searchStreams_searchStreams_streams } from '../../../API/query/searchStreams/__generated__/searchStreams';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import StreamListItem from '../StreamListItem/StreamListItem';
import styles from './SearchStreams.styles';

class SearchStreamsFlatList extends ApolloFlatList<searchStreamsVariables, searchStreams, searchStreams_searchStreams_streams> {}

const SearchStreams = () => {
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

      <SearchStreamsFlatList
        query={SEARCH_STREAMS_QUERY}
        variables={{
          where: {
            // eslint-disable-next-line camelcase
            name_contains: search,
          },
          first: 5,
        }}
        accessor='searchStreams.streams'
        renderItem={({ item }) => (
          <View style={styles.item}>
            <StreamListItem data={item} />
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

export default SearchStreams;
