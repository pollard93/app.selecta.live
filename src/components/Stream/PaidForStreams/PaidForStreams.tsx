import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_CONSUMING_STREAM_PROFILES } from '../../../API/query/getConsumingStreamProfiles/getConsumingStreamProfiles';
// eslint-disable-next-line max-len
import { getConsumingStreamProfilesVariables, getConsumingStreamProfiles, getConsumingStreamProfiles_getConsumingStreamProfiles_streams } from '../../../API/query/getConsumingStreamProfiles/__generated__/getConsumingStreamProfiles';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import StreamListItem from '../StreamListItem/StreamListItem';
import styles from './PaidForStreams.styles';

class PaidForStreamsFlatList extends ApolloFlatList<getConsumingStreamProfilesVariables, getConsumingStreamProfiles, getConsumingStreamProfiles_getConsumingStreamProfiles_streams> {}

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
        query={GET_CONSUMING_STREAM_PROFILES}
        variables={{
          where: {
            // eslint-disable-next-line camelcase
            name_contains: search,
          },
          first: 5,
        }}
        accessor='getConsumingStreamProfiles.streams'
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
