import React, { FC } from 'react';
import { View } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { Navigation } from 'react-native-navigation';
import { GET_STREAM_SELFS_QUERY } from '../../../API/query/getStreamSelfs/getStreamSelfs';
import { getStreamSelfsVariables, getStreamSelfs, getStreamSelfs_getStreamSelfs_streams } from '../../../API/query/getStreamSelfs/__generated__/getStreamSelfs';
import StreamSelfListItem from '../StreamSelfListItem/StreamSelfListItem';
import Styles from './StreamSelfs.styles';
import H2 from '../../UI/Typography/components/H2';
import Button from '../../UI/Button/Button';
import { ScreenProps, STACK } from '../../../screens/utils/interfaces';
import Header, { useHeaderStyles } from '../../UI/Headers/Header/Header';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Body from '../../UI/Typography/components/Body';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { pushScreen } from '../../../screens/utils';
import CreateUpdateStreamScreen from '../../../screens/CreateUpdateStreamScreen/CreateUpdateStreamScreen';

class StreamSelfsFlatList extends ApolloFlatList<getStreamSelfsVariables, getStreamSelfs, getStreamSelfs_getStreamSelfs_streams> {}

export interface StreamSelfsProps extends ScreenProps {}

const StreamSelfs: FC<StreamSelfsProps> = (props) => {
  const { headerHeight } = useHeaderStyles();
  const safeAreaInsets = useSafeArea();


  /**
   * Push CreateUpdateStreamScreen
   */
  const onCreate = () => {
    pushScreen(STACK.TAB_PRODUCER, CreateUpdateStreamScreen, {});
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={() => Navigation.pop(props.componentId)} />
      <View style={[GlobalStyles.PageFill, { paddingTop: safeAreaInsets.top + headerHeight }]}>
        <StreamSelfsFlatList
          query={GET_STREAM_SELFS_QUERY}
          variables={{
            first: 5,
          }}
          accessor='getStreamSelfs.streams'
          renderItem={({ item }) => (
            <View style={Styles.item}>
              <StreamSelfListItem data={item} />
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={Styles.header}>
              <H2>Stream Management</H2>
              <Button
                type="PRIMARY"
                title="Create New Stream"
                onPress={onCreate}
                style={Styles.createButton}
              />
            </View>
          )}
          ListFooterComponent={({ queryResult, maxCount }) => {
            if (queryResult.loading || queryResult.error) {
              return (
                <View style={Styles.header}>
                  <LoadRetry {...queryResult} />
                </View>
              );
            }

            if (maxCount === 0) {
              return (
                <View style={Styles.header}>
                  <Body>Your streams will appear here</Body>
                </View>
              );
            }

            return null;
          }}
        />
      </View>
    </View>
  );
};

export default StreamSelfs;
