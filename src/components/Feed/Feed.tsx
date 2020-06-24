/* eslint-disable max-classes-per-file */
import React, { useMemo } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import gql from 'graphql-tag';
import Styles from './Feed.styles';
import { useGetFeedQuery } from '../../API/query/getFeed/getFeed';
import LoadRetry from '../UI/LoadRetry/LoadRetry';
import H3 from '../UI/Typography/components/H3';
import StreamCard from '../UI/Cards/StreamCard/StreamCard';
import ChannelCard from '../UI/Cards/ChannelCard/ChannelCard';
import { FEED_TYPE } from '../../../__generated__/globalTypes';

const Feed = () => {
  const queryResult = useGetFeedQuery();
  const windowWidth = useMemo(() => Dimensions.get('window').width, []);

  if (queryResult.loading || queryResult.error) {
    return (
      <LoadRetry {...queryResult} />
    );
  }

  return (
    <View>
      <FlatList
        data={queryResult.data.getFeed.items}
        bounces={false}
        renderItem={({ item }) => (
          <View style={Styles[`outerItem${item.background}`]}>
            <H3 style={Styles.heading}>{item.heading}</H3>

            <View style={Styles[`item${item.type}`]}>
              <ApolloFlatList
                query={gql(item.query)}
                variables={item.variables}
                accessor={item.accessor}
                debug
                FlatListProps={{
                  contentContainerStyle: Styles[`flatListContainer${item.type}`],
                  showsHorizontalScrollIndicator: false,
                  horizontal: [FEED_TYPE.HORIZONTAL, FEED_TYPE.HORIZONTAL_SMALL].includes(item.type),
                  ItemSeparatorComponent: () => <View style={Styles.horizontalSeparator} />,
                }}
                renderItem={(args) => (
                  <View style={{ width: item.type === FEED_TYPE.HORIZONTAL_SMALL ? windowWidth * 0.3 : windowWidth }}>
                    {(() => {
                      switch (item.accessor.split('.').pop()) {
                        case 'streams':
                          return <StreamCard data={args.item as any} />;

                        case 'channels':
                          return <ChannelCard data={args.item as any} />;

                        default:
                          return null;
                      }
                    })()}
                  </View>
                )}
                disableRefresh
                disablePagination={item.type === FEED_TYPE.VERTICAL}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => `${item.heading}${index}`}
      />
    </View>
  );
};

export default Feed;
