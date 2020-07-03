import React, { FC } from 'react';
import { TextInput, TextInputProps, View, ViewStyle, ActivityIndicator, StyleProp } from 'react-native';
import Styles from '../Form.style';
import color from '../../../../styles/definitions/color';
import Icon, { ICON } from '../../Icon/Icon';

interface SearchInputProps extends TextInputProps {
  wrapStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
}

const SearchInput: FC<SearchInputProps> = (props) => (
  <View style={[Styles.SearchInput, props.wrapStyle]}>
    <TextInput
      placeholderTextColor={color.mono.pale.dark}
      {...props}
      style={[Styles.TextInput, props.style]}
    />

    {
      !props.loading
        ? <Icon name={ICON.SEARCH} size="small" />
        : <ActivityIndicator size="small" color={color.mono.dark} />
    }
  </View>
);

export default SearchInput;
