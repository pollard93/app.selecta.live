import React, { FC, useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { Navigation } from 'react-native-navigation';
import { GET_STREAM_SELFS_QUERY } from '../../../API/query/getStreamSelfs/getStreamSelfs';
import { getStreamSelfsVariables, getStreamSelfs, getStreamSelfs_getStreamSelfs_streams } from '../../../API/query/getStreamSelfs/__generated__/getStreamSelfs';
import StreamSelfListItem from '../StreamSelfListItem/StreamSelfListItem';
import Styles from './StreamSelfs.styles';
import H3 from '../../UI/Typography/components/H3';
import Button from '../../UI/Button/Button';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Body from '../../UI/Typography/components/Body';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { pushScreen } from '../../../screens/utils';
import CreateUpdateStreamScreen from '../../../screens/CreateUpdateStreamScreen/CreateUpdateStreamScreen';
import { StreamOrderByInput } from '../../../../__generated__/globalTypes';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import ChannelSelfHeader from '../../UI/Headers/ChannelSelfHeader/ChannelSelfHeader';
import Gradient from '../../UI/Gradient/Gradient';
import StreamCardSkeleton from '../../UI/Cards/StreamCard/StreamCardSkeleton';

class StreamSelfsFlatList extends ApolloFlatList<getStreamSelfsVariables, getStreamSelfs, getStreamSelfs_getStreamSelfs_streams> {}

export interface StreamSelfsProps {}

const StreamSelfs: FC<StreamSelfsProps> = (props) => {
  const screenProps = useScreenProps();
  const ref = useRef<FlatList>();


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


  /**
   * On Pop
   */
  const onPop = () => {
    Navigation.pop(screenProps.componentId);
  };


  /**
   * Scroll to top of flatlist
   */
  const onPressLogo = () => {
    // eslint-disable-next-line no-unused-expressions
    ref.current?.scrollToOffset({ animated: true, offset: 0 });
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <ChannelSelfHeader
        onPop={onPop}
        onPressLogo={onPressLogo}
      />

      <StreamSelfsFlatList
        innerRef={ref}
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
          <Gradient style={Styles.header}>
            <H3 forceLight>Stream Management</H3>
            <Button
              type="LIGHT"
              title="New Stream"
              size="small"
              onPress={onCreate}
            />
          </Gradient>
        )}
        ListFooterComponent={({ queryResult, maxCount }) => {
          if (queryResult.loading) {
            return <StreamCardSkeleton />;
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
                <Body>No Streams</Body>
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
