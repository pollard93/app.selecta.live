import React, { FC } from 'react';
import { TouchableOpacity, ButtonProps as BaseProps, TouchableOpacityProps, View } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';
import Styles from './Button.style';
import Body from '../Typography/components/Body';
import Gradient from '../Gradient/Gradient';
import LoadingIcon from '../LoadingIcon/LoadingIcon';


export interface ButtonProps extends BaseProps {
  type?: 'PRIMARY' | 'SECONDARY' | 'LIGHT' | 'FORCE_LIGHT' | 'FB' | 'GOOGLE'; // Default PRIMARY
  size?: 'small' | 'regular'; // Default regular
  icon?: JSX.Element;
  loading?: boolean;
  style?: TouchableOpacityProps['style'];
}

const Button: FC<ButtonProps> = (props) => {
  const darkMode = useDarkMode();
  const size = props.size || 'regular';


  /**
   * Get type
   */
  const type = (() => {
    if (darkMode) {
      if (props.type === 'LIGHT') return 'SECONDARY';
      if (props.type === 'SECONDARY') return 'LIGHT';
    }
    return props.type || 'PRIMARY';
  })();


  const Inner = () => (
    <View
      style={[
        Styles.wrap,
        Styles[type],
        Styles[size],
      ]}
    >
      {props.icon && (
        <View style={Styles.icon}>
          {props.icon}
        </View>
      )}

      <Body bold style={[Styles.text, Styles[`text${type}`]]}>{props.title}</Body>


      {props.loading && (
        (
          <LoadingIcon
            size="small"
            type={(() => {
              switch (type) {
                case 'LIGHT':
                  return 'PRIMARY';
                default:
                  return 'LIGHT';
              }
            })()}
            style={Styles.loading}
          />
        )
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
          Styles[`touch${size}`],
          props.disabled && !props.loading && Styles.disabled,
          props.style,
          Styles.radius,
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
        Styles[`touch${size}`],
        props.disabled && !props.loading && Styles.disabled,
        props.style,
        Styles.radius,
      ]}
      disabled={props.disabled || props.loading}
    >
      <Inner />
    </TouchableOpacity>
  );
};

export default Button;
