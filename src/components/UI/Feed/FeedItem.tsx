import React, { FC, useRef, useState, useMemo } from 'react';
import { View, Dimensions, Animated, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import gql from 'graphql-tag';
import { useDynamicValue } from 'react-native-dynamic';
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
import Styles, { DynamicStyles } from './Feed.styles';
import { STREAM_PROFILE_FRAGMENT_SHORT } from '../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT_SHORT';
import { CHANNEL_PROFILE_FRAGMENT_SHORT } from '../../../API/fragments/__generated__/CHANNEL_PROFILE_FRAGMENT_SHORT';
import Body from '../Typography/components/Body';

interface FeedItemProps {
  renderInfo: ListRenderItemInfo<FEED_PAYLOAD_FRAGMENT_items>;
  onPressStream: (id: string) => void;
  onPressChannel: (id: string) => void;
}

const FeedItem: FC<FeedItemProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);
  const windowWidth = useRef(Dimensions.get('window').width);

  /**
   * Get item width based on item.type
   */
  const itemWidth = useRef((() => {
    switch (props.renderInfo.item.type) {
      case FEED_TYPE.HORIZONTAL:
        return windowWidth.current * 0.9;
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
  const [maxCount, setMaxCount] = useState<number>(null);
  const horizontalPaddingLeft = useMemo(() => {
    // Only needed if the maxCount is bigger than 1 (there is multiple pages)
    if (props.renderInfo.item.type !== FEED_TYPE.HORIZONTAL || maxCount <= 1) return null;

    return scrollX.current.interpolate({
      inputRange: [0, itemWidth.current / 2],
      outputRange: [0, (windowWidth.current - itemWidth.current - Styles.horizontalSeparator.width) / 2],
      extrapolate: 'clamp',
    });
  }, [maxCount]);


  return (
    <View style={dynamicStyles[`background${props.renderInfo.item.background}`]}>
      <H3 style={Styles.heading}>{props.renderInfo.item.heading}</H3>

      <Animated.View style={props.renderInfo.item.type === FEED_TYPE.HORIZONTAL && { paddingLeft: horizontalPaddingLeft }}>
        <ApolloFlatList
          query={gql(props.renderInfo.item.query)}
          variables={props.renderInfo.item.variables}
          accessor={props.renderInfo.item.accessor}
          FlatListProps={{
            style: [
              Styles[`flatList${props.renderInfo.item.type}`],
              props.renderInfo.item.type === FEED_TYPE.HORIZONTAL && { width: itemWidth.current, overflow: 'visible' },
            ],
            contentContainerStyle: [
              Styles[`flatListContainer${props.renderInfo.item.type}`],
            ],
            showsHorizontalScrollIndicator: false,
            horizontal: [FEED_TYPE.HORIZONTAL, FEED_TYPE.HORIZONTAL_SMALL].includes(props.renderInfo.item.type),
            pagingEnabled: props.renderInfo.item.type === FEED_TYPE.HORIZONTAL,
            ItemSeparatorComponent: () => props.renderInfo.item.type === FEED_TYPE.HORIZONTAL_SMALL && <View style={Styles.horizontalSeparator} />,
            onScroll:
              /**
               * On scroll, set the scrollX variable
               * Only set this variable if HORIZONTAL
               */
              props.renderInfo.item.type === FEED_TYPE.HORIZONTAL
                ? Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX.current } } }],
                  { useNativeDriver: false },
                )
                : undefined,
            scrollEventThrottle: props.renderInfo.item.type === FEED_TYPE.HORIZONTAL ? 16 : undefined,
          }}
          ListHeaderComponent={(args) => {
            /**
             * On initial load store the maxCount of items that will be displayed
             */
            if (maxCount === null && args.maxCount !== null) {
              setMaxCount(args.maxCount);
            }


            /**
             * Handle empty results
             */
            if (args.queryResult.data && args.maxCount === 0) {
              switch (props.renderInfo.item.type) {
                case FEED_TYPE.VERTICAL:
                  return (
                    <View style={[Styles[`item${props.renderInfo.item.type}`], { width: itemWidth.current }]}>
                      {(() => {
                        switch (props.renderInfo.item.accessor.split('.').pop()) {
                          case 'streams':
                            return (
                              <StreamCardSkeleton emptyMessage={`${props.renderInfo.item.heading} will appear here`} />
                            );

                          case 'channels':
                            return (
                              <>
                                <StreamCardSkeleton emptyMessage={`${props.renderInfo.item.heading} will appear here`} />
                                <StreamCardSkeleton />
                              </>
                            );

                          default:
                            return null;
                        }
                      })()}
                    </View>
                  );

                case FEED_TYPE.HORIZONTAL:
                case FEED_TYPE.HORIZONTAL_SMALL:
                  return (
                    <View style={Styles.loadingHorizontal}>
                      {(() => {
                        switch (props.renderInfo.item.accessor.split('.').pop()) {
                          case 'streams':
                            return (
                              <View style={[Styles[`item${props.renderInfo.item.type}`], { width: itemWidth.current }]}>
                                <StreamCardSkeleton emptyMessage={`${props.renderInfo.item.heading} will appear here`} />
                              </View>
                            );

                          case 'channels':
                            return (
                              <View style={Styles.loadingHorizontal}>
                                <View style={[Styles[`item${props.renderInfo.item.type}`], { width: itemWidth.current }]}>
                                  <ChannelCardSkeleton />
                                </View>
                                <Body style={Styles.emptyMessage}>{`${props.renderInfo.item.heading} will appear here`}</Body>
                              </View>
                            );

                          default:
                            return null;
                        }
                      })()}
                    </View>
                  );

                default:
                  return null;
              }
            }


            /**
             * Handle load and error
             */
            switch (props.renderInfo.item.type) {
              case FEED_TYPE.VERTICAL:
                if (args.queryResult.loading || args.queryResult.error) {
                  return (
                    <View style={[Styles[`item${props.renderInfo.item.type}`], { width: itemWidth.current }]}>
                      {Array(props.renderInfo.item.variables.first).fill(0).map((_, i) => {
                        switch (props.renderInfo.item.accessor.split('.').pop()) {
                          case 'streams':
                            return <StreamCardSkeleton key={i} />;

                          case 'channels':
                            return <ChannelCardSkeleton key={i} />;

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
                      {Array(props.renderInfo.item.variables.first).fill(0).map((_, i) => (
                        <View key={i}>
                          <View style={[Styles[`item${props.renderInfo.item.type}`], { width: itemWidth.current }]}>
                            {(() => {
                              switch (props.renderInfo.item.accessor.split('.').pop()) {
                                case 'streams':
                                  return <StreamCardSkeleton key={i} />;

                                case 'channels':
                                  return <ChannelCardSkeleton key={i} />;

                                default:
                                  return null;
                              }
                            })()}
                          </View>
                          <View style={Styles.horizontalSeparator} />
                        </View>
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
            <FadeInView style={[Styles[`item${props.renderInfo.item.type}`], { width: itemWidth.current }]}>
              {(() => {
                switch (props.renderInfo.item.accessor.split('.').pop()) {
                  case 'streams':
                    const streamData = args.item as STREAM_PROFILE_FRAGMENT_SHORT;
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          props.onPressStream(streamData.id);
                        }}
                        delayPressIn={50}
                      >
                        <StreamCard data={streamData} />
                      </TouchableOpacity>
                    );

                  case 'channels':
                    const channelData = args.item as CHANNEL_PROFILE_FRAGMENT_SHORT;
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          props.onPressChannel(channelData.id);
                        }}
                        delayPressIn={50}
                      >
                        <ChannelCard data={channelData} />
                      </TouchableOpacity>
                    );

                  default:
                    return null;
                }
              })()}
            </FadeInView>
          )}
          disableRefresh={props.renderInfo.item.type === FEED_TYPE.VERTICAL}
          disablePagination={props.renderInfo.item.type === FEED_TYPE.VERTICAL}
        />

        {
        /**
         * Arrows
         */
        }
        {[FEED_TYPE.HORIZONTAL, FEED_TYPE.HORIZONTAL_SMALL].includes(props.renderInfo.item.type) && (
          <View style={Styles[`horizontalArrowWrap${props.renderInfo.item.type}`]} pointerEvents="none">
            <Icon
              style={Styles[`horizontalArrow${props.renderInfo.item.type}`]}
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
