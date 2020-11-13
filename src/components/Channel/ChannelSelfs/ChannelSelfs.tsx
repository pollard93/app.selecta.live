import React, { FC } from 'react';
import { View } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_CHANNEL_SELFS_QUERY } from '../../../API/query/getChannelSelfs/getChannelSelfs';
import { getChannelSelfsVariables, getChannelSelfs, getChannelSelfs_getChannelSelfs_channels } from '../../../API/query/getChannelSelfs/__generated__/getChannelSelfs';
import ChannelSelfListItem from '../ChannelSelfListItem/ChannelSelfListItem';
import Styles from './ChannelSelfs.styles';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';

class ChannelSelfsFlatList extends ApolloFlatList<getChannelSelfsVariables, getChannelSelfs, getChannelSelfs_getChannelSelfs_channels> {}

export interface ChannelSelfsProps {}

const ChannelSelfs: FC<ChannelSelfsProps> = () => (
  <View style={GlobalStyles.PageFill}>
    <ChannelSelfsFlatList
      query={GET_CHANNEL_SELFS_QUERY}
      variables={{
        first: 5,
      }}
      accessor='getChannelSelfs.channels'
      renderItem={({ item }) => (
        <ChannelSelfListItem data={item} />
      )}
      FlatListProps={{
        ItemSeparatorComponent: () => <View style={Styles.separator} />,
        bounces: false,
      }}
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
      fetchPolicy='network-only'
    />
  </View>
);

export default ChannelSelfs;
