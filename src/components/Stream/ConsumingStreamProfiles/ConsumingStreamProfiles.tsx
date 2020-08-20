import React, { useState, FC } from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';

import { GET_CONSUMING_STREAM_PROFILES } from '../../../API/query/getConsumingStreamProfiles/getConsumingStreamProfiles';
// eslint-disable-next-line max-len
import { getConsumingStreamProfilesVariables, getConsumingStreamProfiles, getConsumingStreamProfiles_getConsumingStreamProfiles_streams } from '../../../API/query/getConsumingStreamProfiles/__generated__/getConsumingStreamProfiles';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import Styles from './ConsumingStreamProfiles.styles';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import SearchInput from '../../UI/Form/components/SearchInput/SearchInput';
import { ScreenProps, STACK } from '../../../screens/utils/interfaces';
import StreamCard from '../../UI/Cards/StreamCard/StreamCard';
import { pushScreen } from '../../../screens/utils';
import StreamProfileScreen from '../../../screens/StreamProfileScreen/StreamProfileScreen';
import StreamCardSkeleton from '../../UI/Cards/StreamCard/StreamCardSkeleton';
import { useDebounce } from '../../../utils/functions';

class ConsumingStreamProfilesFlatList extends ApolloFlatList<getConsumingStreamProfilesVariables, getConsumingStreamProfiles, getConsumingStreamProfiles_getConsumingStreamProfiles_streams> {}

export interface ConsumingStreamProfilesProps extends ScreenProps {}

const ConsumingStreamProfiles: FC<ConsumingStreamProfilesProps> = () => {
  const [variables, setVariables] = useState<getConsumingStreamProfilesVariables>({
    first: 5,
  });


  /**
   * Function to debounce the variables state
   * Any values passed to it will be merged into setVariables with current variables
   */
  const debounceName = useDebounce((name) => {
    setVariables({
      ...variables,
      where: name
        ? {
          // eslint-disable-next-line camelcase
          name_contains: name,
        }
        : undefined,
    });
  }, 500, []);


  /**
   * Navigate to stream in this stack on press
   */
  const onPressStream = (id: string) => {
    pushScreen(STACK.TAB_MY_STREAMS, StreamProfileScreen, { id });
  };


  return (
    <SafeAreaView style={GlobalStyles.PageFill}>
      <ConsumingStreamProfilesFlatList
        query={GET_CONSUMING_STREAM_PROFILES}
        variables={variables}
        accessor='getConsumingStreamProfiles.streams'
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressStream(item.id)}>
            <StreamCard data={item} />
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

            {!queryResult.data && queryResult.loading && (
              <StreamCardSkeleton />
            )}

            {queryResult.error && (
              <View style={Styles.padding}>
                <LoadRetry {...queryResult} />
              </View>
            )}
          </>
        )}
        ListEmptyComponent={({ queryResult }) => !queryResult.loading && !queryResult.error && (
          <StreamCardSkeleton emptyMessage="No Results" />
        )}
        FlatListProps={{
          contentContainerStyle: Styles.scrollViewContainer,
          ItemSeparatorComponent: () => <View style={Styles.separator} />,
          showsVerticalScrollIndicator: false,
        }}
      />
    </SafeAreaView>
  );
};

export default ConsumingStreamProfiles;
