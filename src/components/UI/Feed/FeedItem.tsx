import React, { FC, useRef } from 'react';
import { View, Dimensions, Animated, ListRenderItemInfo } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import gql from 'graphql-tag';
import { FEED_PAYLOAD_FRAGMENT_items } from '../../../API/fragments/__generated__/FEED_PAYLOAD_FRAGMENT';
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

const FeedItem: FC<ListRenderItemInfo<FEED_PAYLOAD_FRAGMENT_items>> = (props) => {
  const windowWidth = useRef(Dimensions.get('window').width);

  /**
   * Get item width based on item.type
   */
  const itemWidth = useRef((() => {
    switch (props.item.type) {
      case FEED_TYPE.HORIZONTAL:
        return windowWidth.current * 0.8;
      case FEED_TYPE.HORIZONTAL_SMALL:
        return windowWidth.current * 0.3;
      default:
        return windowWidth.current;
    }
  })());


  /**
   * FEED_TYPE.HORIZONTAL padding left
   * Centers the pagingEnabled scroll view after half a page
   */
  const scrollX = useRef(new Animated.Value(0));
  const horizontalPaddingLeft = useRef(props.item.type === FEED_TYPE.HORIZONTAL && scrollX.current.interpolate({
    inputRange: [0, itemWidth.current / 2],
    outputRange: [0, (windowWidth.current - itemWidth.current - Styles.horizontalSeparator.width) / 2],
    extrapolate: 'clamp',
  }));


  return (
    <View style={Styles[`background${props.item.background}`]}>
      <H3 style={Styles.heading}>{props.item.heading}</H3>

      <Animated.View style={props.item.type === FEED_TYPE.HORIZONTAL && { paddingLeft: horizontalPaddingLeft.current }}>
        <ApolloFlatList
          query={gql(props.item.query)}
          variables={props.item.variables}
          accessor={props.item.accessor}
          debug
          FlatListProps={{
            style: [
              Styles[`flatList${props.item.type}`],
              props.item.type === FEED_TYPE.HORIZONTAL && { width: itemWidth.current, overflow: 'visible' },
            ],
            contentContainerStyle: [
              Styles[`flatListContainer${props.item.type}`],
            ],
            showsHorizontalScrollIndicator: false,
            horizontal: [FEED_TYPE.HORIZONTAL, FEED_TYPE.HORIZONTAL_SMALL].includes(props.item.type),
            pagingEnabled: props.item.type === FEED_TYPE.HORIZONTAL,
            ItemSeparatorComponent: () => props.item.type === FEED_TYPE.HORIZONTAL_SMALL && <View style={Styles.horizontalSeparator} />,
            onScroll: props.item.type === FEED_TYPE.HORIZONTAL ? Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { x: scrollX.current } },
                },
              ],
            ) : undefined,
            scrollEventThrottle: props.item.type === FEED_TYPE.HORIZONTAL ? 16 : undefined,
          }}
          ListHeaderComponent={(args) => {
            /**
             * Handle initial load and error
             */
            switch (props.item.type) {
              case FEED_TYPE.VERTICAL:
                if (args.queryResult.loading || args.queryResult.error) {
                  return (
                    <View style={[Styles[`item${props.item.type}`], { width: itemWidth.current }]}>
                      {Array(props.item.variables.first).fill(0).map(() => {
                        switch (props.item.accessor.split('.').pop()) {
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
                      {Array(props.item.variables.first).fill(0).map(() => (
                        <>
                          <View style={[Styles[`item${props.item.type}`], { width: itemWidth.current }]}>
                            {(() => {
                              switch (props.item.accessor.split('.').pop()) {
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
            <FadeInView style={[Styles[`item${props.item.type}`], { width: itemWidth.current }]}>
              {(() => {
                switch (props.item.accessor.split('.').pop()) {
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
          disableRefresh={props.item.type === FEED_TYPE.VERTICAL}
          disablePagination={props.item.type === FEED_TYPE.VERTICAL}
        />

        {
        /**
         * Arrows
         */
        }
        {[FEED_TYPE.HORIZONTAL, FEED_TYPE.HORIZONTAL_SMALL].includes(props.item.type) && (
          <View style={Styles[`horizontalArrowWrap${props.item.type}`]} pointerEvents="none">
            <Icon
              style={Styles[`horizontalArrow${props.item.type}`]}
              name={ICON.ARROW_FORWARD}
              size="xsmall"
            />
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default FeedItem;
