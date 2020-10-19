/* eslint-disable camelcase */
import React, { useState, FC, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_CONSUMING_STREAM_PROFILES } from '../../../API/query/getConsumingStreamProfiles/getConsumingStreamProfiles';
// eslint-disable-next-line max-len
import { getConsumingStreamProfilesVariables, getConsumingStreamProfiles, getConsumingStreamProfiles_getConsumingStreamProfiles_streams } from '../../../API/query/getConsumingStreamProfiles/__generated__/getConsumingStreamProfiles';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import Styles from './ConsumingStreamProfiles.styles';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import SearchInput from '../../UI/Form/components/SearchInput/SearchInput';
import StreamCard from '../../UI/Cards/StreamCard/StreamCard';
import { pushScreen } from '../../../screens/utils';
import StreamProfileScreen from '../../../screens/StreamProfileScreen/StreamProfileScreen';
import StreamCardSkeleton from '../../UI/Cards/StreamCard/StreamCardSkeleton';
import { useDebounce } from '../../../utils/functions';
import Header, { useHeaderStyles } from '../../UI/Headers/Header/Header';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import { StreamOrderByInput } from '../../../../__generated__/globalTypes';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';

class ConsumingStreamProfilesFlatList extends ApolloFlatList<getConsumingStreamProfilesVariables, getConsumingStreamProfiles, getConsumingStreamProfiles_getConsumingStreamProfiles_streams> {}

export interface ConsumingStreamProfilesProps {}

const ConsumingStreamProfiles: FC<ConsumingStreamProfilesProps> = () => {
  const screenProps = useScreenProps();
  const { headerHeight } = useHeaderStyles();
  const safeAreaInsets = useSafeArea();
  const ref = useRef<FlatList>();


  /**
   * Define initial variables
   */
  const [variables, setVariables] = useState<getConsumingStreamProfilesVariables>({
    first: 5,
    orderBy: StreamOrderByInput.timeFrom_DESC,
  });


  /**
   * Function to debounce the variables state
   * Any values passed to it will be merged into setVariables with current variables
   */
  const debounceName = useDebounce((name) => {
    setVariables({
      ...variables,
      where: name
        ? { name_contains: name }
        : undefined,
    });
  }, 500, []);


  /**
   * Navigate to stream in this stack on press
   */
  const onPressStream = (id: string) => {
    pushScreen(screenProps.componentId, StreamProfileScreen, { id });
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
      <Header onPressLogo={onPressLogo} />

      <ConsumingStreamProfilesFlatList
        innerRef={ref}
        query={GET_CONSUMING_STREAM_PROFILES}
        variables={variables}
        accessor='getConsumingStreamProfiles.streams'
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressStream(item.id)}>
            <StreamCard data={item} showPosition />
          </TouchableOpacity>
        )}
        ListHeaderComponent={({ queryResult }) => (
          <>
            <SearchInput
              name="Search"
              onChangeText={debounceName}
              placeholder='Search name'
              returnKeyType="done"
              wrapStyle={Styles.padding}
              loading={queryResult.loading}
            />

            {!queryResult.data && queryResult.loading && <StreamCardSkeleton />}
          </>
        )}
        ListEmptyComponent={({ queryResult }) => !queryResult.loading && !queryResult.error && (
          <StreamCardSkeleton emptyMessage={variables.where?.name_contains ? 'No Streams Found' : 'No Purchased Streams'} />
        )}
        FlatListProps={{
          contentContainerStyle: [Styles.scrollViewContainer],
          ItemSeparatorComponent: () => <View style={Styles.separator} />,
          showsVerticalScrollIndicator: false,
        }}
      >
        {({ queryResult }) => {
          // Handle error
          if (queryResult.error) {
            return (
              <View pointerEvents="box-none" style={[StyleSheet.absoluteFillObject, { marginTop: headerHeight + safeAreaInsets.top }]}>
                <LoadRetry {...queryResult} />
              </View>
            );
          }

          return null;
        }}
      </ConsumingStreamProfilesFlatList>
    </View>
  );
};

export default ConsumingStreamProfiles;
