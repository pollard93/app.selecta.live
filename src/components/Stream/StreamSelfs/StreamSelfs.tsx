import React, { FC } from 'react';
import { View } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { Navigation } from 'react-native-navigation';
import { GET_STREAM_SELFS_QUERY } from '../../../API/query/getStreamSelfs/getStreamSelfs';
import { getStreamSelfsVariables, getStreamSelfs, getStreamSelfs_getStreamSelfs_streams } from '../../../API/query/getStreamSelfs/__generated__/getStreamSelfs';
import StreamSelfListItem from '../StreamSelfListItem/StreamSelfListItem';
import styles from './StreamSelfs.styles';
import H2 from '../../UI/Typography/components/H2';
import Button from '../../UI/Button/Button';
import { ScreenProps } from '../../../screens/utils/interfaces';
import Header, { useHeaderStyles } from '../../UI/Headers/Header/Header';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';

class StreamSelfsFlatList extends ApolloFlatList<getStreamSelfsVariables, getStreamSelfs, getStreamSelfs_getStreamSelfs_streams> {}

export interface StreamSelfsProps extends ScreenProps {}

const StreamSelfs: FC<StreamSelfsProps> = (props) => {
  const { headerHeight } = useHeaderStyles();
  const safeAreaInsets = useSafeArea();

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
            <View style={styles.item}>
              <StreamSelfListItem data={item} />
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <H2>Stream Management</H2>
              <Button
                type="PRIMARY"
                title="Create New Stream"
                onPress={console.log}
                style={styles.createButton}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default StreamSelfs;
