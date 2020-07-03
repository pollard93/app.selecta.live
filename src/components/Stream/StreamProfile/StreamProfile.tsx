import React, { FC, useRef, useState } from 'react';
import { View, SafeAreaView, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { ScreenProps } from '../../../screens/utils/interfaces';
import StreamVideo from '../StreamVideo/StreamVideo';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import StreamCard from '../../UI/Cards/StreamCard/StreamCard';
import Header, { useHeaderStyles } from '../../UI/Headers/Header/Header';
import StreamMessages from '../../StreamMessage/StreamMessages/StreamMessages';
import Drawer from '../../UI/Drawer/Drawer';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import FadeInView from '../../UI/FadeInView/FadeInView';
import Styles from './StreamProfile.styles';

export interface StreamProfileProps extends ScreenProps {
  id: string;
}

const StreamProfile: FC<StreamProfileProps> = (props) => {
  const { headerHeight, headerZindex } = useHeaderStyles();
  const safeAreaInsets = useSafeArea();
  const windowHeight = useRef(Dimensions.get('window').height).current;
  const [drawerLayout, setDrawerLayout] = useState<{minHeight: number, maxHeight: number}>();

  /**
   * Query
   */
  const queryResult = useGetStreamProfileQuery({
    variables: {
      id: props.id,
    },
  });


  /**
   * Load | Retry
   */
  if (queryResult.loading || queryResult.error) {
    return <LoadRetry {...queryResult} />;
  }


  const { data: { getStreamProfile } } = queryResult;
  return (
    <View style={[GlobalStyles.PageFill, { paddingBottom: safeAreaInsets.bottom }]}>
      <Header onPop={() => Navigation.pop(props.componentId)} />

      <SafeAreaView style={GlobalStyles.PageFill}>
        <View
          style={[Styles.flex, { paddingTop: headerHeight / 2 }]}
          onLayout={(event) => {
            if (!drawerLayout) {
              /**
               * Using the layout of this view
               * Set the drawer min and max
               */
              setDrawerLayout({
                minHeight: event.nativeEvent.layout.height - headerHeight / 2,
                maxHeight: windowHeight - safeAreaInsets.top - safeAreaInsets.bottom,
              });
            }
          }}
        >
          <StreamCard data={getStreamProfile} />
        </View>
      </SafeAreaView>

      {drawerLayout && (
        <FadeInView style={[Styles.flex, { zIndex: headerZindex + 1 }]}>
          <Drawer
            minHeight={drawerLayout.minHeight}
            maxHeight={drawerLayout.maxHeight}
          >
            <StreamMessages id={getStreamProfile.id} />
          </Drawer>
        </FadeInView>
      )}

      <StreamVideo {...props} data={getStreamProfile} />
    </View>
  );
};

export default StreamProfile;
