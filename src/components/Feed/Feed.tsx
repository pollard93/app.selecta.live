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
import Icon, { ICON } from '../UI/Icon/Icon';
import FeedHeader from '../UI/Headers/FeedHeader/FeedHeader';

const Feed = () => {
  const queryResult = useGetFeedQuery();
  const windowWidth = useMemo(() => Dimensions.get('window').width, []);

  return (
    <View>
      <FeedHeader />

      {
        queryResult.loading || queryResult.error
          ? <LoadRetry {...queryResult} />
          : (
            <FlatList
              data={queryResult.data.getFeed.items}
              bounces={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                /**
                 * Get item width based on item.type
                 */
                const itemWidth = (() => {
                  switch (item.type) {
                    case FEED_TYPE.HORIZONTAL:
                      return windowWidth * 0.8;
                    case FEED_TYPE.HORIZONTAL_SMALL:
                      return windowWidth * 0.3;
                    default:
                      return windowWidth;
                  }
                })();


                return (
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
                          <View style={{ width: itemWidth }}>
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

                      {[FEED_TYPE.HORIZONTAL, FEED_TYPE.HORIZONTAL_SMALL].includes(item.type) && (
                        <View style={Styles[`horizontalArrowWrap${item.type}`]}>
                          <Icon
                            style={Styles[`horizontalArrow${item.type}`]}
                            name={ICON.ARROW_FORWARD}
                            size="xsmall"
                          />
                        </View>
                      )}
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item, index) => `${item.heading}${index}`}
            />
          )
      }
    </View>
  );
};

export default Feed;
