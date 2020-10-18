import React, { FC, useRef, useState } from 'react';
import { QueryResult } from 'react-apollo';
import { Dimensions, SafeAreaView, View, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getStreamSelf, getStreamSelfVariables } from '../../../API/query/getStreamSelf/__generated__/getStreamSelf';
import { useHeaderStyles } from '../../UI/Headers/Header/Header';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import StreamCardSkeleton from '../../UI/Cards/StreamCard/StreamCardSkeleton';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import StreamCard from '../../UI/Cards/StreamCard/StreamCard';
import StreamVideo from '../StreamVideo/StreamVideo';
import StreamCancelledMessage from '../StreamCancelledMessage/StreamCancelledMessage';
import StreamCommunicationWrap from '../StreamProfile/components/StreamCommunication/StreamCommunicationWrap';
import { canGoLive } from '../../../utils/streamFunctions';
import StreamInfo from '../StreamProfile/components/StreamInfo/StreamInfo';


interface StreamSelfViewProps {
  queryResult: QueryResult<getStreamSelf, getStreamSelfVariables>;
}


/**
 * Handle loading and error outside of navigation
 */
const StreamSelfView: FC<StreamSelfViewProps> = (props) => {
  const { headerHeight } = useHeaderStyles();
  const safeAreaInsets = useSafeArea();
  const window = useRef(Dimensions.get('window')).current;
  const [drawerLayout, setDrawerLayout] = useState<{minHeight: number, maxHeight: number}>();


  /**
   * Loading || Error
   */
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
   * Should only load video is lot cancelled
   * and stream is within the producers threshold to go live
   * If the stream is yet to start, this will be handled in <StreamVideo />
   */
  const shouldLoadVideo = props.queryResult.data.getStreamSelf.cancelled === null
    && canGoLive(props.queryResult.data.getStreamSelf);


  /**
   * If cancelled then use ScrollView
   */
  if (!shouldLoadVideo) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <StreamCard data={props.queryResult.data.getStreamSelf} />
        <StreamInfo data={props.queryResult.data.getStreamSelf} />

        {props.queryResult.data.getStreamSelf.cancelled !== null && (
          <StreamCancelledMessage data={props.queryResult.data.getStreamSelf} />
        )}
      </ScrollView>
    );
  }


  return (
    <>
      <SafeAreaView style={GlobalStyles.PageFill}>
        <View
          onLayout={(event) => {
            if (!drawerLayout) {
              /**
               * Using the layout of this view
               * Set the drawer min and max
               */
              const safeHeight = window.height - safeAreaInsets.top - safeAreaInsets.bottom - headerHeight - StatusBar.currentHeight;
              setDrawerLayout({
                minHeight: safeHeight - event.nativeEvent.layout.height,
                maxHeight: safeHeight,
              });
            }
          }}
        >
          <StreamCard data={props.queryResult.data.getStreamSelf} />
        </View>
      </SafeAreaView>

      <StreamVideo
        {...props}
        data={props.queryResult.data.getStreamSelf}
      />

      {drawerLayout && (
        <StreamCommunicationWrap
          drawerProps={{
            minHeight: drawerLayout.minHeight,
            maxHeight: drawerLayout.maxHeight,
          }}
          communicationProps={{
            data: props.queryResult.data.getStreamSelf,
          }}
        />
      )}
    </>
  );
};

export default StreamSelfView;
