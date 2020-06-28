import React, { FC, useRef } from 'react';
import { FlatList, View, Dimensions, FlatListProps } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import gql from 'graphql-tag';
import { FEED_PAYLOAD_FRAGMENT } from '../../../API/fragments/__generated__/FEED_PAYLOAD_FRAGMENT';
import { FEED_TYPE } from '../../../../__generated__/globalTypes';
import H3 from '../Typography/components/H3';
import StreamCardSkeleton from '../Cards/StreamCard/StreamCardSkeleton';
import ChannelCardSkeleton from '../Cards/ChannelCard/ChannelCardSkeleton';
import LoadRetry from '../LoadRetry/LoadRetry';
import spacing from '../../../styles/definitions/spacing';
import FadeInView from '../FadeInView/FadeInView';
import StreamCard from '../Cards/StreamCard/StreamCard';
import ChannelCard from '../Cards/ChannelCard/ChannelCard';
import Icon, { ICON } from '../Icon/Icon';
import Styles from './Feed.styles';

interface FeedProps {
  data: FEED_PAYLOAD_FRAGMENT;
  flatListProps?: Partial<FlatListProps<any>>;
}

const Feed: FC<FeedProps> = (props) => {
  const windowWidth = useRef(Dimensions.get('window').width);

  return (
    <FlatList
      bounces={false}
      {...props.flatListProps}
      data={props.data.items}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[Styles[`background${props.data.items[0].background}`], props.flatListProps?.contentContainerStyle]}
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
                ListHeaderComponent={(args) => {
                  /**
                   * Handle initial load and error
                   */
                  switch (item.type) {
                    case FEED_TYPE.VERTICAL:
                      if (args.queryResult.loading || args.queryResult.error) {
                        return (
                          <View style={[Styles[`item${item.type}`], { width: itemWidth }]}>
                            {Array(item.variables.first).fill(0).map(() => {
                              switch (item.accessor.split('.').pop()) {
                                case 'streams':
                                  return <StreamCardSkeleton />;

                                case 'channels':
                                  return <ChannelCardSkeleton />;

                                default:
                                  return null;
                              }
                            })}

                            {args.queryResult.error && <LoadRetry cover {...args.queryResult} />}
                          </View>
                        );
                      }
                      return null;

                    case FEED_TYPE.HORIZONTAL:
                    case FEED_TYPE.HORIZONTAL_SMALL:
                      if (args.queryResult.error) {
                        return (
                          <View style={{ width: windowWidth.current - spacing.base * 2 }}>
                            <LoadRetry {...args.queryResult} />
                          </View>
                        );
                      }

                      if (args.queryResult.loading) {
                        return (
                          <View style={Styles.loadingHorizontal}>
                            {Array(item.variables.first).fill(0).map(() => (
                              <>
                                <View style={[Styles[`item${item.type}`], { width: itemWidth }]}>
                                  {(() => {
                                    switch (item.accessor.split('.').pop()) {
                                      case 'streams':
                                        return <StreamCardSkeleton />;

                                      case 'channels':
                                        return <ChannelCardSkeleton />;

                                      default:
                                        return null;
                                    }
                                  })()}

                                </View>
                                <View style={Styles.horizontalSeparator} />
                              </>
                            ))}

                          </View>
                        );
                      }
                      return null;

                    default:
                      return null;
                  }
                }}
                renderItem={(args) => (
                  <FadeInView style={[Styles[`item${item.type}`], { width: itemWidth }]}>
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
                  </FadeInView>
                )}
                disableRefresh={item.type === FEED_TYPE.VERTICAL}
                disablePagination={item.type === FEED_TYPE.VERTICAL}
              />

              {
              /**
               * Arrows
               */
              }
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
  );
};

export default Feed;
