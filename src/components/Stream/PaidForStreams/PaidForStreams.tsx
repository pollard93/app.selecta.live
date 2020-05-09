import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_PAID_FOR_STREAMS_QUERY } from '../../../API/query/getPaidForStreams/getPaidForStreams';
import { getPaidForStreamsVariables, getPaidForStreams, getPaidForStreams_getPaidForStreams_streams } from '../../../API/query/getPaidForStreams/__generated__/getPaidForStreams';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import StreamListItem from '../StreamListItem/StreamListItem';
import styles from './PaidForStreams.styles';

class PaidForStreamsFlatList extends ApolloFlatList<getPaidForStreamsVariables, getPaidForStreams, getPaidForStreams_getPaidForStreams_streams> {}

const PaidForStreams = () => {
  const [search, setSearch] = useState('');

  return (
    <View>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder='Search name'
        returnKeyType="done"
      />

      <PaidForStreamsFlatList
        query={GET_PAID_FOR_STREAMS_QUERY}
        variables={{
          where: {
            // eslint-disable-next-line camelcase
            name_contains: search,
          },
          first: 5,
        }}
        accessor='getPaidForStreams.streams'
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

export default PaidForStreams;
