import React, { FC } from 'react';
import { QueryResult } from 'react-apollo';
import { useDarkMode } from 'react-native-dynamic';
import { Animated, View, TouchableOpacity } from 'react-native';

import Body from '../../UI/Typography/components/Body';
import { ScreenProps, STACK } from '../../../screens/utils/interfaces';
import { getChannelSelf } from '../../../API/query/getChannelSelf/__generated__/getChannelSelf';
import ChannelHeader from '../ChannelHeader/ChannelHeader';
import color from '../../../styles/definitions/color';
import Icon, { ICON } from '../../UI/Icon/Icon';
import Styles from './ChannelSelf.style';
import ChannelSelfFeed from '../../ChannelSelfFeed/ChannelSelfFeed';
import { formatForTimezone } from '../../../utils/functions';
import { pushScreen } from '../../../screens/utils';
import UpdateChannelScreen from '../../../screens/UpdateChannelScreen/UpdateChannelScreen';
import StreamSelfsScreen from '../../../screens/StreamSelfsScreen/StreamSelfsScreen';

export interface ChannelSelfViewProps extends ScreenProps {
  queryResult: QueryResult<getChannelSelf>;
}

const ChannelSelfView: FC<ChannelSelfViewProps> = (props) => {
  const darkMode = useDarkMode();

  return (
    <ChannelHeader
      {...props}
      data={props.queryResult.data?.getChannelSelf}
      topContent={({ titleColor, followChannelColor }) => (
        <>
          <TouchableOpacity
            onPress={() => {
              pushScreen(STACK.PROFILE, StreamSelfsScreen, {});
            }}
          >
            <Animated.View
              style={[
                Styles.manageButton,
                { backgroundColor: darkMode ? color.mono.light : titleColor },
              ]}
            >
              <Animated.Text style={{ color: darkMode ? color.mono.dark : followChannelColor }}>
                <Body bold disableBaseColor>Streams</Body>
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              /**
               * Push UpdateChannelScreen
               */
              pushScreen(STACK.PROFILE, UpdateChannelScreen, {});
            }}
          >
            <Animated.View
              style={[
                Styles.editButton,
                { backgroundColor: darkMode ? color.mono.light : titleColor },
              ]}
            >
              <Icon
                name={ICON.COG}
                size="small"
                style={{ tintColor: darkMode ? color.mono.dark : followChannelColor }}
                animated
              />
            </Animated.View>
          </TouchableOpacity>
        </>
      )}
    >
      {({ coverImageHeadingDefaultHeight, headerLayout, scrollY }) => (
        <ChannelSelfFeed
          flatListProps={{
            bounces: true,
            contentContainerStyle: {
              paddingTop: coverImageHeadingDefaultHeight.current + headerLayout.height,
            },
            ListHeaderComponent: () => (
              <>
                <View style={Styles.description}>
                  <Body>{props.queryResult.data?.getChannelSelf.description}</Body>
                </View>

                <View style={Styles.description}>
                  <Body bold>Followers: {props.queryResult.data?.getChannelSelf.followersEdge}</Body>
                  <Body bold>Overall Streams: {props.queryResult.data?.getChannelSelf.viewCount}</Body>
                </View>

                <View style={Styles.description}>
                  <Body bold style={Styles.joined}>Joined: {formatForTimezone(props.queryResult.data?.getChannelSelf.createdAt, 'calendar')}</Body>
                </View>
              </>
            ),
            onScroll: Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
              { useNativeDriver: false },
            ),
            scrollEventThrottle: 16,
          }}
        />
      )}
    </ChannelHeader>
  );
};

export default ChannelSelfView;
