import React, { FC, useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import TextInputStyles from '../TextInput/TextInput.style';
import Styles from './TagInput.style';
import Icon, { ICON } from '../../../Icon/Icon';
import color from '../../../../../styles/definitions/color';

export interface TagInputProps {
  onChange: (value: string[]) => void;
  defaultValue?: string[];
  editable?: boolean;
  wrapStyle?: StyleProp<ViewStyle>;
}

const TagInput: FC<TagInputProps> = (props) => {
  const [newTagValue, setNewTagValue] = useState('');


  const prependHash = (value: string) => {
    if (value.startsWith('#')) return value;
    return `#${value}`;
  };


  const [tags, setTags] = useState(
    props.defaultValue
      ? props.defaultValue.map((t) => prependHash(t))
      : [],
  );


  /**
   * When tags changes, execute props.onChange with new value
   * Remove the hash on all tags
   */
  const isMounted = useRef(false);
  useEffect(() => {
    // Do not execute on first render
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    props.onChange(tags.map((t) => t.substring(1)));
  }, [tags]);


  const saveNewTag = () => {
    const newTags = [...tags, newTagValue];
    setTags(newTags);
    setNewTagValue('');
  };


  const updateTagAtIndex = (title: string, index: number) => {
    const newTags = [...tags];
    newTags[index] = title;
    setTags(newTags);
  };


  const removeTagAtIndex = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };


  return (
    <View style={[props.wrapStyle, TextInputStyles.wrap, Styles.wrap, props.editable === false && TextInputStyles.disabled]}>
      {tags.map((t, i) => (
        <View
          key={i}
          style={Styles.tag}
        >
          <TextInput
            value={t}
            onChangeText={(value) => {
              updateTagAtIndex(prependHash(value), i);
            }}
            returnKeyType="done"
            style={[TextInputStyles.input, Styles.input]}
            editable={props.editable}
          />

          {props.editable !== false && (
            <TouchableOpacity
              onPress={() => {
                removeTagAtIndex(i);
              }}
              style={Styles.cross}
            >
              <Icon name={ICON.CROSS} size="xxsmall" style={Styles.crossIcon} />
            </TouchableOpacity>
          )}
        </View>
      ))}

      {props.editable !== false && (
        <View style={Styles.tag}>
          <TextInput
            placeholder="#New Tag"
            placeholderTextColor={color.mono.pale.dark}
            value={newTagValue}
            onChangeText={(value) => {
              setNewTagValue(prependHash(value));
            }}
            onBlur={saveNewTag}
            returnKeyType="done"
            style={[TextInputStyles.input, Styles.input, Styles.newInput]}
            editable={props.editable}
          />
        </View>
      )}
    </View>
  );
};

export default TagInput;
