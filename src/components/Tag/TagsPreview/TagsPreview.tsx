import React, { FC, useEffect, useRef } from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Icon, { ICON } from '../../UI/Icon/Icon';
import Body from '../../UI/Typography/components/Body';
import Styles, { DynamicStyles } from './TagsPreview.styles';

interface TagsPreviewProps {
  tags: string[];
  onRemoveTag?: (tag: string) => void;
}

const TagsPreview: FC<TagsPreviewProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);
  const scrollView = useRef<ScrollView>();
  const contentHeight = useRef<number>();
  const scrollViewHeight = useRef<number>();


  /**
   * When new tags are appended scroll to bottom
   */
  const previousTags = useRef(props.tags);
  useEffect(() => {
    if (!props.tags || props.tags.length === 0) return undefined;

    if (previousTags.current?.length < props.tags.length) {
      const timeout = setTimeout(() => {
        const scrollHeight = contentHeight.current - scrollViewHeight.current;
        if (scrollHeight > 0) {
          // eslint-disable-next-line no-unused-expressions
          scrollView.current?.scrollTo(scrollHeight);
        }
      }, 300);

      previousTags.current = props.tags;
      return () => clearTimeout(timeout);
    }

    previousTags.current = props.tags;
    return undefined;
  }, [props.tags]);


  if (!props.tags || props.tags.length === 0) return null;


  return (
    <ScrollView
      ref={scrollView}
      style={Styles.tags}
      contentContainerStyle={Styles.tagsInner}
      bounces={false}
      onContentSizeChange={(w, h) => contentHeight.current = h}
      onLayout={(ev) => scrollViewHeight.current = ev.nativeEvent.layout.height}
    >
      {props.tags.map((t) => (
        <View style={[Styles.tag, dynamicStyles.tag]}>
          {props.onRemoveTag && (
            <TouchableOpacity
              onPress={() => {
                props.onRemoveTag(t);
              }}
              style={[Styles.cross, dynamicStyles.cross]}
            >
              <Icon name={ICON.CROSS} size="xxsmall" />
            </TouchableOpacity>
          )}

          <Body style={[Styles.text, dynamicStyles.text]}># {t}</Body>
        </View>
      ))}
    </ScrollView>
  );
};

export default TagsPreview;
