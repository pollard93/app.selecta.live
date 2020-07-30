import React, { FC, useMemo } from 'react';
import { View, Animated, Linking } from 'react-native';
import { QueryResult } from 'react-apollo';
import { useDarkMode } from 'react-native-dynamic';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Styles from './ChannelProfile.style';
import ChannelProfileFeed from '../../ChannelProfileFeed/ChannelProfileFeed';
import Body from '../../UI/Typography/components/Body';
import { ScreenProps } from '../../../screens/utils/interfaces';
import { getChannelProfile } from '../../../API/query/getChannelProfile/__generated__/getChannelProfile';
import ChannelHeader from '../ChannelHeader/ChannelHeader';
import ShareButton from '../../UI/ShareButton/ShareButton';
import color from '../../../styles/definitions/color';
import FollowChannel from '../FollowChannel/FollowChannel';
import Icon, { ICON } from '../../UI/Icon/Icon';

export interface ChannelProfileViewProps extends ScreenProps {
  id: string;
  queryResult: QueryResult<getChannelProfile>;
}

const ChannelProfileView: FC<ChannelProfileViewProps> = (props) => {
  const darkMode = useDarkMode();

  const hasSocialLinks = useMemo(() => !!props.queryResult.data?.getChannelProfile.websiteUrl
    || !!props.queryResult.data?.getChannelProfile.twitterUrl
    || !!props.queryResult.data?.getChannelProfile.facebookUrl
    || !!props.queryResult.data?.getChannelProfile.instagramUrl,
  [props.queryResult.data?.getChannelProfile]);

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
        <ChannelProfileFeed
          id={props.id}
          flatListProps={{
            bounces: true,
            contentContainerStyle: {
              paddingTop: coverImageHeadingDefaultHeight.current + headerLayout.height,
            },
            ListHeaderComponent: () => (
              <>
                <View style={Styles.description}>
                  <Body>{props.queryResult.data.getChannelProfile.description}</Body>
                </View>

                {hasSocialLinks && (
                  <View style={Styles.socialLinks}>
                    {props.queryResult.data.getChannelProfile.websiteUrl && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(props.queryResult.data.getChannelProfile.websiteUrl)}
                        style={Styles.socialIcon}
                      >
                        <Icon name={ICON.WEBSITE} size="small" />
                      </TouchableOpacity>
                    )}
                    {props.queryResult.data.getChannelProfile.twitterUrl && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(props.queryResult.data.getChannelProfile.twitterUrl)}
                        style={Styles.socialIcon}
                      >
                        <Icon name={ICON.TWITTER} size="small" />
                      </TouchableOpacity>
                    )}
                    {props.queryResult.data.getChannelProfile.facebookUrl && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(props.queryResult.data.getChannelProfile.facebookUrl)}
                        style={Styles.socialIcon}
                      >
                        <Icon name={ICON.FACEBOOK} size="small" />
                      </TouchableOpacity>
                    )}
                    {props.queryResult.data.getChannelProfile.instagramUrl && (
                      <TouchableOpacity
                        onPress={() => Linking.openURL(props.queryResult.data.getChannelProfile.instagramUrl)}
                        style={Styles.socialIcon}
                      >
                        <Icon name={ICON.INSTAGRAM} size="small" />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
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

export default ChannelProfileView;
