import React from 'react';
import { TouchableOpacity, ButtonProps as BaseProps, ActivityIndicator, TouchableOpacityProps, View } from 'react-native';
import Styles from './Button.style';
import H4 from '../Typography/components/H4';
import Icon, { ICON } from '../Icon/Icon';
import color from '../../../styles/definitions/color';
import Gradient from '../Gradient/Gradient';


export interface ButtonProps extends BaseProps {
  type?: 'PRIMARY' | 'SECONDARY' | 'LIGHT' | 'FB' | 'GOOGLE'; // Default PRIMARY
  icon?: ICON;
  loading?: boolean;
  style?: TouchableOpacityProps['style'],
}

const Button = (props: ButtonProps) => {
  const type = props.type || 'PRIMARY';


  const Inner = () => (
    <View
      style={[
        Styles.wrap,
        Styles[type],
      ]}
    >
      <H4 style={[Styles.text, Styles[`text${type}`]]}>{props.title}</H4>

      {props.icon && !props.loading && (
        <Icon
          name={props.icon}
          size="small"
          style={Styles.icon}
        />
      )}

      {props.loading && (
        <ActivityIndicator
          size="small"
          color={color.mono.light}
          style={Styles.loading}
        />
      )}
    </View>
  );


  /**
   * Primary requries Gradient
   */
  if (type === 'PRIMARY') {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          props.disabled && !props.loading && Styles.disabled,
          props.style,
        ]}
        disabled={props.disabled || props.loading}
      >
        <Gradient>
          <Inner />
        </Gradient>
      </TouchableOpacity>
    );
  }


  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        props.disabled && !props.loading && Styles.disabled,
        props.style,
      ]}
      disabled={props.disabled || props.loading}
    >
      <Inner />
    </TouchableOpacity>
  );
};

export default Button;
