import React, { useRef, useState, useMemo, FC } from 'react';
import { View, Animated, Dimensions, LayoutRectangle } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useDarkMode } from 'react-native-dynamic';
import { QueryResult } from 'react-apollo';
import H2 from '../../UI/Typography/components/H2';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import Styles from './ChannelProfile.style';
import scalePx from '../../../utils/scalePx';
import color from '../../../styles/definitions/color';
import FollowChannel from '../FollowChannel/FollowChannel';
import Icon, { ICON } from '../../UI/Icon/Icon';
import ChannelFeed from '../../ChannelFeed/ChannelFeed';
import { useHeaderStyles } from '../../UI/Headers/Header/Header';
import Body from '../../UI/Typography/components/Body';
import { ScreenProps } from '../../../screens/utils/interfaces';
import { getChannelProfile } from '../../../API/query/getChannelProfile/__generated__/getChannelProfile';
import ChannelProfileSkeleton from './ChannelProfileSkeleton';

export interface ChannelProfileViewProps extends ScreenProps {
  id: string;
  queryResult: QueryResult<getChannelProfile>;
}

const ChannelProfileView: FC<ChannelProfileViewProps> = (props) => {
  const windowWidth = useRef(Dimensions.get('window').width);
  const coverImageHeadingDefaultHeight = useRef(windowWidth.current * 0.5625);
  const [headerLayout, setHeaderLayout] = useState<Partial<LayoutRectangle>>({ height: 0 });
  const [headerTopLayout, setHeaderTopLayout] = useState<Partial<LayoutRectangle>>({ height: 0 });
  const [titleLayout, setTitleLayout] = useState<Partial<LayoutRectangle>>({ height: 0 });
  const scrollY = useRef(new Animated.Value(0));
  const profileImageHeight = useRef(scalePx(120));
  const { headerHeight } = useHeaderStyles();
  const darkMode = useDarkMode();


  /**
   * Cover image heading height interpolation
   */
  const coverImageHeadingHeight = useMemo(() => {
    if (titleLayout.height === 0) return null;

    return scrollY.current.interpolate({
      inputRange: [-1000, 0, coverImageHeadingDefaultHeight.current - titleLayout.height + headerHeight / 2],
      outputRange: [1000 + coverImageHeadingDefaultHeight.current, coverImageHeadingDefaultHeight.current, headerHeight / 2],
      extrapolate: 'clamp',
    });
  }, [titleLayout.height]);


  /**
   * Title padding top interpolation
   */
  const coverImageCoverOpacity = useRef(scrollY.current.interpolate({
    inputRange: [0, coverImageHeadingDefaultHeight.current],
    outputRange: [0, 1],
    extrapolate: 'clamp',
    // useNativeDriver: true,
  }));


  /**
   * Title color interpolation
   * If dark mode interpolation is not needed
   */
  const titleColor = useMemo(() => {
    if (headerLayout.height === 0 || darkMode) return null;

    return scrollY.current.interpolate({
      inputRange: [0, coverImageHeadingDefaultHeight.current, coverImageHeadingDefaultHeight.current + headerLayout.height],
      outputRange: [color.mono.dark, color.mono.dark, color.mono.light],
      extrapolate: 'clamp',
    });
  }, [headerLayout.height, darkMode]);


  /**
   * FollowChannel text and icon color interpolation
   * If dark mode interpolation is not needed
   */
  const followChannelColor = useMemo(() => {
    if (headerLayout.height === 0 || darkMode) return null;

    return scrollY.current.interpolate({
      inputRange: [0, coverImageHeadingDefaultHeight.current, coverImageHeadingDefaultHeight.current + headerLayout.height],
      outputRange: [color.mono.light, color.mono.light, color.mono.dark],
      extrapolate: 'clamp',
    });
  }, [headerLayout.height, darkMode]);


  /**
   * Title padding top interpolation
   */
  const titlePaddingTop = useMemo(() => {
    if (headerLayout.height === 0 || titleLayout.height === 0) return null;

    return scrollY.current.interpolate({
      inputRange: [0, coverImageHeadingDefaultHeight.current - titleLayout.height, coverImageHeadingDefaultHeight.current],
      outputRange: [0, 0, -titleLayout.height],
      extrapolate: 'clamp',
    });
  }, [headerLayout.height, titleLayout.height]);


  /**
   * Header top height
   * Interpolates the headerTopLayout height to titleLayout.height
   */
  const headerTopHeight = useMemo(() => {
    if (headerTopLayout.height === 0 || titleLayout.height === 0 || headerLayout.height === 0) return null;

    return scrollY.current.interpolate({
      inputRange: [0, headerTopLayout.height],
      outputRange: [headerTopLayout.height, titleLayout.height],
      extrapolate: 'clamp',
    });
  }, [headerTopLayout.height, titleLayout.height, headerLayout.height]);


  /**
   * Title padding top interpolation
   */
  const profileImageOpacity = useRef(scrollY.current.interpolate({
    inputRange: [0, coverImageHeadingDefaultHeight.current],
    outputRange: [1, 0],
    extrapolate: 'clamp',
    // useNativeDriver: true,
  }));


  if (props.queryResult.loading) {
    return <ChannelProfileSkeleton />;
  }


  if (props.queryResult.error) {
    return <LoadRetry {...props.queryResult} />;
  }


  return (
    <View style={[
      Styles.wrap,
      // Only show after all layouts have been set
      // eslint-disable-next-line react-native/no-inline-styles
      { opacity: (headerTopLayout.height === 0 || titleLayout.height === 0 || headerLayout.height === 0) ? 0 : 1 },
    ]}>
      <Animated.View
        style={[
          Styles.coverImageWrap,
          {
            height: coverImageHeadingHeight,
            minHeight: titleLayout.height + headerHeight / 2,
          },
        ]}
      >
        <AsyncImage
          splashUrl={props.queryResult.data.getChannelProfile.coverImage.url.splash}
          fullUrl={props.queryResult.data.getChannelProfile.coverImage.url.full}
          containerProps={{
            style: Styles.coverImage,
          }}
          imageProps={{
            resizeMode: 'cover',
          }}
        />
        <Animated.View
          style={[
            Styles.coverImageCover,
            { opacity: coverImageCoverOpacity.current },
          ]}
        />
      </Animated.View>

      <Animated.View
        style={[
          Styles.headerWrap,
          { paddingTop: coverImageHeadingHeight },
        ]}
      >
        <View
          onLayout={(event) => {
            if (headerLayout.height === 0) {
              setHeaderLayout(event.nativeEvent.layout);
            }
          }}
        >
          <Animated.View
            onLayout={(event) => {
              if (headerTopLayout.height === 0) {
                setHeaderTopLayout(event.nativeEvent.layout);
              }
            }}
            style={[
              Styles.headerTop,
              { height: headerTopHeight || undefined },
            ]}
          >
            <Animated.View
              style={{
                opacity: profileImageOpacity.current,
                height: profileImageHeight.current / 2,
                width: profileImageHeight.current,
              }}
            >
              <View
                style={[
                  Styles.profileImageWrap,
                  {
                    width: profileImageHeight.current,
                    height: profileImageHeight.current,
                  },
                ]}
              >
                <View style={Styles.profileImageInner}>
                  <AsyncImage
                    splashUrl={props.queryResult.data.getChannelProfile.profileImage.url.splash}
                    fullUrl={props.queryResult.data.getChannelProfile.profileImage.url.full}
                    containerProps={{
                      style: Styles.profileImage,
                    }}
                  />
                </View>
              </View>
            </Animated.View>

            <View
              style={Styles.headerTopContent}
            >
              <Icon
                name={ICON.SHARE}
                size="small"
                style={[
                  Styles.headerTopContentIcon,
                  { tintColor: darkMode ? color.mono.light : titleColor },
                ]}
                animated
              />

              <FollowChannel
                data={props.queryResult.data.getChannelProfile}
                wrapStyle={{ backgroundColor: darkMode ? color.mono.light : titleColor }}
                textStyle={{ color: darkMode ? color.mono.dark : followChannelColor }}
                iconStyle={{ tintColor: darkMode ? color.mono.dark : followChannelColor }}
              />
            </View>
          </Animated.View>


          <Animated.View
            onLayout={(event) => {
              if (titleLayout.height === 0) {
                setTitleLayout(event.nativeEvent.layout);
              }
            }}
            style={[
              Styles.title,
              { marginTop: titlePaddingTop || undefined },
            ]}
          >
            <Animated.Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{ color: darkMode ? color.mono.light : titleColor }}
            >
              <H2 disableBaseColor>{props.queryResult.data.getChannelProfile.name}</H2>
            </Animated.Text>
          </Animated.View>
        </View>
      </Animated.View>

      {headerLayout.height !== 0 && (
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
    </View>
  );
};

export default ChannelProfileView;
