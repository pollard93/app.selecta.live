/* eslint-disable camelcase */
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import React, { FC, useReducer, useRef, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import { Navigation } from 'react-native-navigation';
import { GET_TAG_PROFILES_QUERY } from '../../../API/query/getTagProfiles/getTagProfiles';
import { getTagProfiles, getTagProfilesVariables, getTagProfiles_getTagProfiles_tags } from '../../../API/query/getTagProfiles/__generated__/getTagProfiles';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import spacing from '../../../styles/definitions/spacing';
import GlobalStyles, { GlobalDynamicStyles } from '../../../styles/stylesheets/GlobalStyles';
import { useDebounce } from '../../../utils/functions';
import Button from '../../UI/Button/Button';
import SearchInput from '../../UI/Form/components/SearchInput/SearchInput';
import { useHeaderStyles } from '../../UI/Headers/Header/Header';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import Body from '../../UI/Typography/components/Body';
import TagsPreview from '../TagsPreview/TagsPreview';
import Styles from './Tags.styles';

class TagProfilesFlatList extends ApolloFlatList<getTagProfilesVariables, getTagProfiles, getTagProfiles_getTagProfiles_tags> {}

interface Action {
  type: 'increment' | 'decrement';
  data: string;
}

interface TagsProps {
  defaultValue: string[];
  onDone: (tags: string[]) => void;
}

const Tags: FC<TagsProps> = (props) => {
  const safeAreaInsets = useSafeArea();
  const ref = useRef<TextInput>();
  const screenProps = useScreenProps();
  const { headerHeight } = useHeaderStyles();
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);


  /**
   * Tags reducer
   */
  const [selectedTags, dispatch] = useReducer((state, action: Action) => {
    switch (action.type) {
      case 'increment':
        return !state.find((t) => t === action.data)
          ? [...state, action.data]
          : state;

      case 'decrement':
        return state.filter((t) => t !== action.data);

      default:
        return state;
    }
  }, props.defaultValue || []);


  /**
   * Define initial variables
   */
  const [variables, setVariables] = useState<getTagProfilesVariables>({
    first: 5,
  });


  /**
   * Function to debounce the variables state
   * Any values passed to it will be merged into setVariables with current variables
   */
  const debounce = useDebounce((title) => {
    setVariables({
      ...variables,
      where: title
        // eslint-disable-next-line camelcase
        ? { title_contains: title }
        : undefined,
    });
  }, 500, []);


  const addTag = (tag: string) => {
    dispatch({
      type: 'increment',
      data: tag,
    });
  };


  const removeTag = (tag: string) => {
    dispatch({
      type: 'decrement',
      data: tag,
    });
  };


  const onDone = () => {
    Navigation.dismissModal(screenProps.componentId);
    props.onDone(selectedTags);
  };


  return (
    <View style={[GlobalStyles.PageFill, globalDynamicStyles.background]}>
      <SafeAreaView style={GlobalStyles.PageFill}>
        <View style={[GlobalStyles.PageFill, Styles.wrap]}>
          <SearchInput
            setRef={ref}
            name="Search"
            onChangeText={debounce}
            placeholder='Search for tag'
            returnKeyType="done"
          />

          {selectedTags.length > 0 && (
            <View style={Styles.selectedTags}>
              <TagsPreview
                tags={selectedTags}
                onRemoveTag={removeTag}
              />
            </View>
          )}

          {variables.where && (
            <View style={GlobalStyles.PageFill}>
              <TagProfilesFlatList
                query={GET_TAG_PROFILES_QUERY}
                variables={variables}
                accessor='getTagProfiles.tags'
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => addTag(item.title)}>
                    <Body># {item.title}</Body>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={({ queryResult }) => {
                  /**
                   * If the user has searched for a tag and there is no results
                   * Show a button to add the tag
                   */
                  if (!queryResult.loading && !queryResult.error && queryResult.variables?.where?.title_contains.length > 1) {
                    return (
                      <Button
                        title={`Create '# ${queryResult.variables.where.title_contains}'`}
                        onPress={() => {
                          addTag(queryResult.variables?.where.title_contains);
                          setVariables({
                            ...variables,
                            where: undefined,
                          });
                          // eslint-disable-next-line no-unused-expressions
                          ref.current?.clear();
                        }}
                      />
                    );
                  }

                  return null;
                }}
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
                      <View pointerEvents="box-none" style={[StyleSheet.absoluteFillObject, { marginTop: headerHeight }]}>
                        <LoadRetry {...queryResult} />
                      </View>
                    );
                  }

                  return null;
                }}
              </TagProfilesFlatList>
            </View>
          )}
        </View>
      </SafeAreaView>

      <View
        style={[
          Styles.button,
          // eslint-disable-next-line react-native/no-inline-styles
          { paddingBottom: safeAreaInsets.bottom + spacing.small },
        ]}
      >
        <Button
          title="Done"
          onPress={onDone}
        />
      </View>
    </View>
  );
};

export default Tags;
