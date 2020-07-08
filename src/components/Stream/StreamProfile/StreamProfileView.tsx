import React, { FC, useRef, useState, useMemo } from 'react';
import { QueryResult } from 'react-apollo';
import { Dimensions, SafeAreaView, View } from 'react-native';
import { getStreamProfile, getStreamProfileVariables } from '../../../API/query/getStreamProfile/__generated__/getStreamProfile';
import { useHeaderStyles } from '../../UI/Headers/Header/Header';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import StreamCardSkeleton from '../../UI/Cards/StreamCard/StreamCardSkeleton';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import StreamCard from '../../UI/Cards/StreamCard/StreamCard';
import FadeInView from '../../UI/FadeInView/FadeInView';
import Drawer from '../../UI/Drawer/Drawer';
import StreamVideo from '../StreamVideo/StreamVideo';
import Styles from './StreamProfile.styles';
import StreamCommunication from './components/StreamCommunication/StreamCommunication';


interface StreamProfileViewProps {
  queryResult: QueryResult<getStreamProfile, getStreamProfileVariables>;
}


/**
 * Handle loading and error outside of navigation
 */
const StreamProfileView: FC<StreamProfileViewProps> = (props) => {
  const { headerHeight, headerZindex } = useHeaderStyles();
  const safeAreaInsets = useSafeArea();
  const window = useRef(Dimensions.get('window')).current;
  const [drawerLayout, setDrawerLayout] = useState<{minHeight: number, maxHeight: number}>();

  if (props.queryResult.loading) {
    return (
      <SafeAreaView style={GlobalStyles.PageFill}>
        <StreamCardSkeleton />
      </SafeAreaView>
    );
  }

  if (props.queryResult.error) {
    return <LoadRetry {...props.queryResult} />;
  }


  /**
   * Should only load video if user is a consumer and it hasn't been cancelled
   * If the stream is yet to start, this will be handled in <StreamVideo />
   */
  const shouldLoadVideo = props.queryResult.data.getStreamProfile.isConsumer && props.queryResult.data.getStreamProfile.cancelled === null;


  return (
    <>
      <SafeAreaView style={GlobalStyles.PageFill}>
        <View
          style={{ paddingTop: headerHeight / 2 }}
          onLayout={(event) => {
            if (!drawerLayout) {
              /**
               * Using the layout of this view
               * Set the drawer min and max
               */
              const safeHeight = window.height - safeAreaInsets.top - safeAreaInsets.bottom;
              setDrawerLayout({
                minHeight: safeHeight - event.nativeEvent.layout.height,
                maxHeight: safeHeight,
              });
            }
          }}
        >
          <StreamCard data={props.queryResult.data.getStreamProfile} />
        </View>
      </SafeAreaView>

      {drawerLayout && (
        <FadeInView style={[Styles.flex, { zIndex: headerZindex + 1 }]}>
          <Drawer
            minHeight={drawerLayout.minHeight}
            maxHeight={drawerLayout.maxHeight}
          >
            <StreamCommunication data={props.queryResult.data.getStreamProfile} />
          </Drawer>
        </FadeInView>
      )}

      {shouldLoadVideo && (
        <StreamVideo {...props} data={props.queryResult.data.getStreamProfile} />
      )}
    </>
  );
};

export default StreamProfileView;
