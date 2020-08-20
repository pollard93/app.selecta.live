import React, { FC } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import Styles from './SearchInput.style';
import Icon, { ICON } from '../../../Icon/Icon';
import TextInput, { TextInputProps } from '../TextInput/TextInput';
import LoadingIcon from '../../../LoadingIcon/LoadingIcon';

interface SearchInputProps extends TextInputProps {
  wrapStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
}

const SearchInput: FC<SearchInputProps> = (props) => (
  <View style={props.wrapStyle}>
    <View>
      <TextInput
        {...props}
        wrapStyle={null}
        style={[props.style, Styles.input]}
      />

      <View style={Styles.icon}>
        {
          !props.loading
            ? <Icon name={ICON.SEARCH} size="small" />
            : <LoadingIcon size="small" />
        }
      </View>
    </View>
  </View>
);

export default SearchInput;
