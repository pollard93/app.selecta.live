import React, { useRef, useState, useMemo, FC } from 'react';
import { View, Animated, Dimensions, LayoutRectangle, SafeAreaView } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { Navigation } from 'react-native-navigation';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import H2 from '../../UI/Typography/components/H2';
import { useGetChannelProfileQuery } from '../../../API/query/getChannelProfile/getChannelProfile';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import Styles from './ChannelProfile.style';
import scalePx from '../../../utils/scalePx';
import color from '../../../styles/definitions/color';
import FollowChannel from '../FollowChannel/FollowChannel';
import Icon, { ICON } from '../../UI/Icon/Icon';
import ChannelFeed from '../../ChannelFeed/ChannelFeed';
import FeedHeader from '../../UI/Headers/FeedHeader/FeedHeader';
import { headerHeight } from '../../UI/Headers/FeedHeader/FeedHeader.style';
import Body from '../../UI/Typography/components/Body';
import { ScreenProps } from '../../../screens/utils/interfaces';

export interface ChannelProfileProps extends ScreenProps {
  id: string;
}

const ChannelProfile: FC<ChannelProfileProps> = (props) => {
  /**
   * Get channel profile query
   */
  const queryResult = useGetChannelProfileQuery({
    variables: {
      id: props.id,
    },
  });


  const windowWidth = useRef(Dimensions.get('window').width);
  const coverImageHeadingDefaultHeight = useRef(windowWidth.current * 0.5625);
  const [headerLayout, setHeaderLayout] = useState<Partial<LayoutRectangle>>({ height: 0 });
  const [headerTopLayout, setHeaderTopLayout] = useState<Partial<LayoutRectangle>>({ height: 0 });
  const [titleLayout, setTitleLayout] = useState<Partial<LayoutRectangle>>({ height: 0 });
  const scrollY = useRef(new Animated.Value(0));
  const profileImageHeight = useRef(scalePx(120));


  /**
   * Cover image heading height interpolation
   */
  const coverImageHeadingHeight = useMemo(() => {
    if (titleLayout.height === 0) return null;

    return scrollY.current.interpolate({
      inputRange: [-1000, 0, coverImageHeadingDefaultHeight.current - titleLayout.height],
      outputRange: [1000 + coverImageHeadingDefaultHeight.current, coverImageHeadingDefaultHeight.current, titleLayout.height],
      extrapolate: 'clamp',
      // useNativeDriver: true,
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
   */
  const titleColor = useMemo(() => {
    if (headerLayout.height === 0) return null;

    return scrollY.current.interpolate({
      inputRange: [0, coverImageHeadingDefaultHeight.current, coverImageHeadingDefaultHeight.current + headerLayout.height],
      outputRange: [color.mono.dark, color.mono.dark, color.mono.light],
      extrapolate: 'clamp',
      // useNativeDriver: true,
    });
  }, [headerLayout.height]);


  /**
   * FollowChannel text and icon color interpolation
   */
  const followChannelColor = useMemo(() => {
    if (headerLayout.height === 0) return null;

    return scrollY.current.interpolate({
      inputRange: [0, coverImageHeadingDefaultHeight.current, coverImageHeadingDefaultHeight.current + headerLayout.height],
      outputRange: [color.mono.light, color.mono.light, color.mono.dark],
      extrapolate: 'clamp',
      // useNativeDriver: true,
    });
  }, [headerLayout.height]);


  /**
   * Title padding top interpolation
   */
  const titlePaddingTop = useMemo(() => {
    if (headerLayout.height === 0 || titleLayout.height === 0) return null;

    return scrollY.current.interpolate({
      inputRange: [0, coverImageHeadingDefaultHeight.current - titleLayout.height, coverImageHeadingDefaultHeight.current],
      outputRange: [0, 0, -titleLayout.height],
      extrapolate: 'clamp',
      // useNativeDriver: true,
    });
  }, [headerLayout.height, titleLayout.height]);


  /**
   * Header top height
   * Interpolates the headerTopLayout height to titleLayout.height
   */
  const headerTopHeight = useMemo(() => {
    if (headerTopLayout.height === 0 || titleLayout.height === 0 || headerLayout.height === 0) return null;

    return scrollY.current.interpolate({
      inputRange: [0, coverImageHeadingDefaultHeight.current + headerLayout.height],
      outputRange: [headerTopLayout.height, titleLayout.height],
      extrapolate: 'clamp',
      // useNativeDriver: true,
    });
  }, [headerTopLayout.height, titleLayout.height, headerLayout.height]);


  /**
   * Title padding top interpolation
   */
  const profileImageOpacity = useRef(scrollY.current.interpolate({
    inputRange: [0, coverImageHeadingDefaultHeight.current + titleLayout.height],
    outputRange: [1, 0],
    extrapolate: 'clamp',
    // useNativeDriver: true,
  }));


  return (
    <View style={GlobalStyles.PageFill}>
      <FeedHeader onPop={() => Navigation.pop(props.componentId)} />
      <SafeAreaView />

      {
        queryResult.loading || queryResult.error
          ? <LoadRetry {...queryResult} />
          : (
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
                    minHeight: titleLayout.height + headerHeight,
                  },
                ]}
              >
                <AsyncImage
                  splashUrl={queryResult.data.getChannelProfile.coverImage.url.splash}
                  fullUrl={queryResult.data.getChannelProfile.coverImage.url.full}
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
                            splashUrl={queryResult.data.getChannelProfile.profileImage.url.splash}
                            fullUrl={queryResult.data.getChannelProfile.profileImage.url.full}
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
                        name={ICON.SEARCH}
                        size="small"
                        style={[
                          Styles.headerTopContentIcon,
                          { tintColor: titleColor },
                        ]}
                        animated
                      />

                      <FollowChannel
                        data={queryResult.data.getChannelProfile}
                        wrapStyle={{ backgroundColor: titleColor }}
                        textStyle={{ color: followChannelColor }}
                        iconStyle={{ tintColor: followChannelColor }}
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
                      style={{ color: titleColor }}
                    >
                      <H2>{queryResult.data.getChannelProfile.name}</H2>
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
                        <Body>{queryResult.data.getChannelProfile.description}</Body>
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
          )
      }
    </View>
  );
};

export default ChannelProfile;
