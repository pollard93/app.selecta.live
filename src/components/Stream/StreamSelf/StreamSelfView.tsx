import React, { FC, useRef, useState } from 'react';
import { QueryResult } from 'react-apollo';
import { Dimensions, SafeAreaView, View, KeyboardAvoidingView, Platform } from 'react-native';
import { getStreamSelf, getStreamSelfVariables } from '../../../API/query/getStreamSelf/__generated__/getStreamSelf';
import { useHeaderStyles } from '../../UI/Headers/Header/Header';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import StreamCardSkeleton from '../../UI/Cards/StreamCard/StreamCardSkeleton';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import StreamCard from '../../UI/Cards/StreamCard/StreamCard';
import FadeInView from '../../UI/FadeInView/FadeInView';
import Drawer from '../../UI/Drawer/Drawer';
import StreamVideo from '../StreamVideo/StreamVideo';
import Styles from './StreamSelf.styles';
import StreamCommunication from '../StreamProfile/components/StreamCommunication/StreamCommunication';
import StreamCancelledMessage from '../StreamCancelledMessage/StreamCancelledMessage';


interface StreamSelfViewProps {
  queryResult: QueryResult<getStreamSelf, getStreamSelfVariables>;
}


/**
 * Handle loading and error outside of navigation
 */
const StreamSelfView: FC<StreamSelfViewProps> = (props) => {
  const { headerHeight, headerZindex } = useHeaderStyles();
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
   * Should only load video and communication if stream hasn't been cancelled
   * If the stream is yet to start, this will be handled in <StreamVideo />
   */
  const isCancelled = props.queryResult.data.getStreamSelf.cancelled !== null;


  return (
    <>
      <SafeAreaView style={GlobalStyles.PageFill}>
        <View
          onLayout={(event) => {
            if (!isCancelled && !drawerLayout) {
              /**
               * Using the layout of this view
               * Set the drawer min and max
               */
              const safeHeight = window.height - safeAreaInsets.top - safeAreaInsets.bottom - headerHeight;
              setDrawerLayout({
                minHeight: safeHeight - event.nativeEvent.layout.height,
                maxHeight: safeHeight,
              });
            }
          }}
        >
          <StreamCard data={props.queryResult.data.getStreamSelf} />
        </View>

        {isCancelled && (
          <StreamCancelledMessage data={props.queryResult.data.getStreamSelf} />
        )}
      </SafeAreaView>

      {!isCancelled && drawerLayout && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[Styles.flex, { zIndex: headerZindex + 1 }]}
        >
          <FadeInView style={Styles.flex}>
            <Drawer
              minHeight={drawerLayout.minHeight}
              maxHeight={drawerLayout.maxHeight}
            >
              <StreamCommunication data={props.queryResult.data.getStreamSelf} />
            </Drawer>
          </FadeInView>
        </KeyboardAvoidingView>
      )}

      {!isCancelled && (
        <StreamVideo
          {...props}
          data={props.queryResult.data.getStreamSelf}
        />
      )}
    </>
  );
};

export default StreamSelfView;
