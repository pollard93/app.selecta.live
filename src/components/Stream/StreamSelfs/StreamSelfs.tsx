import React, { FC, useState } from 'react';
import { View } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { Navigation } from 'react-native-navigation';
import { GET_STREAM_SELFS_QUERY } from '../../../API/query/getStreamSelfs/getStreamSelfs';
import { getStreamSelfsVariables, getStreamSelfs, getStreamSelfs_getStreamSelfs_streams } from '../../../API/query/getStreamSelfs/__generated__/getStreamSelfs';
import StreamSelfListItem from '../StreamSelfListItem/StreamSelfListItem';
import Styles from './StreamSelfs.styles';
import H2 from '../../UI/Typography/components/H2';
import Button from '../../UI/Button/Button';
import Header from '../../UI/Headers/Header/Header';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Body from '../../UI/Typography/components/Body';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { pushScreen } from '../../../screens/utils';
import CreateUpdateStreamScreen from '../../../screens/CreateUpdateStreamScreen/CreateUpdateStreamScreen';
import { StreamOrderByInput } from '../../../../__generated__/globalTypes';
import StreamSelfListItemSkeleton from '../StreamSelfListItem/StreamSelfListItemSkeleton';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';

class StreamSelfsFlatList extends ApolloFlatList<getStreamSelfsVariables, getStreamSelfs, getStreamSelfs_getStreamSelfs_streams> {}

export interface StreamSelfsProps {
  test: string;
}

const StreamSelfs: FC<StreamSelfsProps> = (props) => {
  const screenProps = useScreenProps();


  /**
   * Initial Variables
   */
  const [variables] = useState<getStreamSelfsVariables>({
    first: 5,
    orderBy: StreamOrderByInput.createdAt_DESC,
    after: null,
  });


  /**
   * Push CreateUpdateStreamScreen
   */
  const onCreate = () => {
    pushScreen(screenProps.componentId, CreateUpdateStreamScreen, {
      getStreamSelfsVariables: variables,
    });
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={() => Navigation.pop(screenProps.componentId)} />

      <StreamSelfsFlatList
        query={GET_STREAM_SELFS_QUERY}
        variables={variables}
        accessor='getStreamSelfs.streams'
        renderItem={({ item }) => (
          <View style={Styles.item}>
            <StreamSelfListItem
              {...props}
              data={item}
              getStreamSelfsVariables={variables}
            />
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
          if (queryResult.loading) {
            return <StreamSelfListItemSkeleton />;
          }

          if (queryResult.error) {
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
  );
};

export default StreamSelfs;
