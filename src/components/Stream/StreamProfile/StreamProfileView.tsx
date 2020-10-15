import React, { FC, useRef, useState } from 'react';
import { QueryResult } from 'react-apollo';
import { Dimensions, SafeAreaView, View, StatusBar } from 'react-native';
import { getStreamProfile, getStreamProfileVariables } from '../../../API/query/getStreamProfile/__generated__/getStreamProfile';
import { useHeaderStyles } from '../../UI/Headers/Header/Header';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import StreamCardSkeleton from '../../UI/Cards/StreamCard/StreamCardSkeleton';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import StreamCard from '../../UI/Cards/StreamCard/StreamCard';
import StreamVideo from '../StreamVideo/StreamVideo';
import StreamPurchase from './components/StreamPurchase/StreamPurchase';
import StreamCancelledMessage from '../StreamCancelledMessage/StreamCancelledMessage';
import StreamCommunicationWrap from './components/StreamCommunication/StreamCommunicationWrap';


interface StreamProfileViewProps {
  queryResult: QueryResult<getStreamProfile, getStreamProfileVariables>;
}


/**
 * Handle loading and error outside of navigation
 */
const StreamProfileView: FC<StreamProfileViewProps> = (props) => {
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
   * Should only load video if user is a consumer and it hasn't been cancelled
   * If the stream is yet to start, this will be handled in <StreamVideo />
   */
  const shouldLoadVideo = props.queryResult.data.getStreamProfile.isConsumer && props.queryResult.data.getStreamProfile.cancelled === null;


  return (
    <>
      <SafeAreaView style={GlobalStyles.PageFill}>
        <View
          onLayout={async (event) => {
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
          <StreamCard data={props.queryResult.data.getStreamProfile} />
        </View>

        {!props.queryResult.data.getStreamProfile.isConsumer && props.queryResult.data.getStreamProfile.cancelled === null && (
          <StreamPurchase data={props.queryResult.data.getStreamProfile} />
        )}

        {props.queryResult.data.getStreamProfile.cancelled !== null && (
          <StreamCancelledMessage data={props.queryResult.data.getStreamProfile} />
        )}
      </SafeAreaView>

      {shouldLoadVideo && (
        <StreamVideo {...props} data={props.queryResult.data.getStreamProfile} />
      )}

      {shouldLoadVideo && drawerLayout && (
        <StreamCommunicationWrap
          drawerProps={{
            minHeight: drawerLayout.minHeight,
            maxHeight: drawerLayout.maxHeight,
          }}
          communicationProps={{
            data: props.queryResult.data.getStreamProfile,
          }}
        />
      )}
    </>
  );
};

export default StreamProfileView;
