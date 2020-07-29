import React, { useRef, useState, useMemo, FC, ReactNode, useEffect } from 'react';
import { View, Animated, Dimensions, LayoutRectangle, StyleSheet } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useDarkMode, useDynamicValue } from 'react-native-dynamic';
import { QueryResult } from 'react-apollo';
import { NetworkStatus } from 'apollo-client';
import H2 from '../../UI/Typography/components/H2';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import Styles from './ChannelHeader.style';
import scalePx from '../../../utils/scalePx';
import color from '../../../styles/definitions/color';
import { useHeaderStyles } from '../../UI/Headers/Header/Header';
import { ScreenProps } from '../../../screens/utils/interfaces';
import ChannelHeaderSkeleton from './ChannelHeaderSkeleton';
import { CHANNEL_PROFILE_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_PROFILE_FRAGMENT';
import { CHANNEL_SELF_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_SELF_FRAGMENT';
import FadeInView from '../../UI/FadeInView/FadeInView';
import GlobalStyles, { GlobalDynamicStyles } from '../../../styles/stylesheets/GlobalStyles';

export interface ChannelHeaderProps extends ScreenProps {
  queryResult: QueryResult<any>;
  data: CHANNEL_PROFILE_FRAGMENT | CHANNEL_SELF_FRAGMENT;
  topContent: (args: {
    titleColor: Animated.AnimatedInterpolation;
    followChannelColor: Animated.AnimatedInterpolation;
  }) => ReactNode;
  children: (args: {
    coverImageHeadingDefaultHeight: React.MutableRefObject<number>;
    headerLayout: Partial<LayoutRectangle>;
    scrollY: React.MutableRefObject<Animated.Value>;
  }) => ReactNode;
}

const ChannelHeader: FC<ChannelHeaderProps> = (props) => {
  const windowWidth = useRef(Dimensions.get('window').width);
  const coverImageHeadingDefaultHeight = useRef(windowWidth.current * 0.5625);
  const [headerLayout, setHeaderLayout] = useState<Partial<LayoutRectangle>>({ height: 0 });
  const [headerTopLayout, setHeaderTopLayout] = useState<Partial<LayoutRectangle>>({ height: 0 });
  const [titleLayout, setTitleLayout] = useState<Partial<LayoutRectangle>>({ height: 0 });
  const scrollY = useRef(new Animated.Value(0));
  const profileImageHeight = useRef(scalePx(120));
  const { headerHeight } = useHeaderStyles();
  const darkMode = useDarkMode();
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);


  /**
   * If name changes (when edited by owner in UpdateChannel)
   * Reset all layouts and refetch to cause a full re render
   */
  useEffect(() => {
    // Not on first render
    if (headerLayout.height !== 0) {
      setHeaderLayout({ height: 0 });
      setHeaderTopLayout({ height: 0 });
      setTitleLayout({ height: 0 });
      props.queryResult.refetch();
    }
  }, [props.data?.name]);


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


  if (props.queryResult.loading || props.queryResult.networkStatus === NetworkStatus.refetch) {
    return <ChannelHeaderSkeleton />;
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
          splashUrl={props.data.coverImage?.url.splash}
          fullUrl={props.data.coverImage?.url.full}
          placeholderImageProps={{
            source: require('../../../assets/images/logo-icon.png'),
            resizeMode: 'contain',
            style: Styles.skeletonCoverImageIcon,
          }}
          containerProps={{
            style: [Styles.coverImage, globalDynamicStyles.skeleton],
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
                    splashUrl={props.data.profileImage?.url.splash}
                    fullUrl={props.data.profileImage?.url.full}
                    placeholderImageProps={{
                      source: require('../../../assets/images/logo-icon.png'),
                      resizeMode: 'contain',
                      style: Styles.skeletonProfileImageIcon,
                    }}
                    containerProps={{
                      style: [Styles.profileImage, globalDynamicStyles.skeleton],
                    }}
                  />
                </View>
              </View>
            </Animated.View>

            <View style={Styles.headerTopContent}>
              {props.topContent({
                titleColor,
                followChannelColor,
              })}
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
              <H2 disableBaseColor>{props.data.name}</H2>
            </Animated.Text>
          </Animated.View>
        </View>
      </Animated.View>

      {headerLayout.height !== 0 && (
        <FadeInView style={GlobalStyles.PageFill}>
          {props.children({
            coverImageHeadingDefaultHeight,
            headerLayout,
            scrollY,
          })}
        </FadeInView>
      )}
    </View>
  );
};

export default ChannelHeader;
