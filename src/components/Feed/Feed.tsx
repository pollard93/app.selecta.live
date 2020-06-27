/* eslint-disable max-classes-per-file */
import React, { FC, useRef } from 'react';
import { View, FlatList, Dimensions, SafeAreaView } from 'react-native';
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
import { ScreenProps } from '../../screens/utils/interfaces';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import { headerHeight } from '../UI/Headers/FeedHeader/FeedHeader.style';

export interface FeedProps extends ScreenProps {}

const Feed: FC<FeedProps> = () => {
  const queryResult = useGetFeedQuery();
  const windowWidth = useRef(Dimensions.get('window').width);

  return (
    <View style={GlobalStyles.PageFill}>
      <FeedHeader />
      <SafeAreaView />

      {
        queryResult.loading || queryResult.error
          ? <LoadRetry {...queryResult} />
          : (
            <FlatList
              data={queryResult.data.getFeed.items}
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[Styles.flatlistContainer, Styles[`background${queryResult.data.getFeed.items[0].background}`]]}
              renderItem={({ item }) => {
                /**
                 * Get item width based on item.type
                 */
                const itemWidth = (() => {
                  switch (item.type) {
                    case FEED_TYPE.HORIZONTAL:
                      return windowWidth.current * 0.85;
                      // return windowWidth.current;
                    case FEED_TYPE.HORIZONTAL_SMALL:
                      return windowWidth.current * 0.3;
                    default:
                      return windowWidth.current;
                  }
                })();


                return (
                  <View style={Styles[`background${item.background}`]}>
                    <H3 style={Styles.heading}>{item.heading}</H3>

                    <View>
                      <ApolloFlatList
                        query={gql(item.query)}
                        variables={item.variables}
                        accessor={item.accessor}
                        debug
                        FlatListProps={{
                          style: [
                            Styles[`flatList${item.type}`],
                            item.type === FEED_TYPE.HORIZONTAL && { width: itemWidth, overflow: 'visible' },
                          ],
                          contentContainerStyle: Styles[`flatListContainer${item.type}`],
                          showsHorizontalScrollIndicator: false,
                          horizontal: [FEED_TYPE.HORIZONTAL, FEED_TYPE.HORIZONTAL_SMALL].includes(item.type),
                          pagingEnabled: item.type === FEED_TYPE.HORIZONTAL,
                          ItemSeparatorComponent: () => item.type === FEED_TYPE.HORIZONTAL_SMALL && <View style={Styles.horizontalSeparator} />,
                        }}
                        renderItem={(args) => (
                          <View style={[Styles[`item${item.type}`], { width: itemWidth }]}>
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
                        <View style={Styles[`horizontalArrowWrap${item.type}`]} pointerEvents="none">
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
