import React, { FC } from 'react';
import { View, Animated } from 'react-native';
import { QueryResult } from 'react-apollo';
import { useDarkMode } from 'react-native-dynamic';
import Styles from './ChannelProfile.style';
import ChannelFeed from '../../ChannelFeed/ChannelFeed';
import Body from '../../UI/Typography/components/Body';
import { ScreenProps } from '../../../screens/utils/interfaces';
import { getChannelProfile } from '../../../API/query/getChannelProfile/__generated__/getChannelProfile';
import ChannelHeader from '../ChannelHeader/ChannelHeader';
import ShareButton from '../../UI/ShareButton/ShareButton';
import color from '../../../styles/definitions/color';
import FollowChannel from '../FollowChannel/FollowChannel';

export interface ChannelProfileViewProps extends ScreenProps {
  id: string;
  queryResult: QueryResult<getChannelProfile>;
}

const ChannelProfileView: FC<ChannelProfileViewProps> = (props) => {
  const darkMode = useDarkMode();

  return (
    <ChannelHeader
      {...props}
      data={props.queryResult.data?.getChannelProfile}
      topContent={({ titleColor, followChannelColor }) => (
        <>
          <ShareButton
            title="Share Channel"
            uri={`share/channel/${props.id}`}
            iconProps={{
              size: 'small',
              animated: true,
              style: [
                Styles.headerTopContentIcon,
                { tintColor: darkMode ? color.mono.light : titleColor },
              ],
            }}
          />

          <FollowChannel
            data={props.queryResult.data?.getChannelProfile}
            wrapStyle={{ backgroundColor: darkMode ? color.mono.light : titleColor }}
            textStyle={{ color: darkMode ? color.mono.dark : followChannelColor }}
            iconStyle={{ tintColor: darkMode ? color.mono.dark : followChannelColor }}
          />
        </>
      )}
    >
      {({ coverImageHeadingDefaultHeight, headerLayout, scrollY }) => (
        <ChannelFeed
          id={props.id}
          flatListProps={{
            bounces: true,
            contentContainerStyle: {
              paddingTop: coverImageHeadingDefaultHeight.current + headerLayout.height,
            },
            ListHeaderComponent: () => (
              <View style={Styles.description}>
                <Body>{props.queryResult.data.getChannelProfile.description}</Body>
              </View>
            ),
            onScroll: Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: scrollY.current } },
                },
              ],
            ),
            scrollEventThrottle: 16,
          }}
        />
      )}
    </ChannelHeader>
  );
};

export default ChannelProfileView;
