import React, { FC } from 'react';
import { TouchableOpacity, ButtonProps as BaseProps, TouchableOpacityProps, View } from 'react-native';
import Styles from './Button.style';
import Body from '../Typography/components/Body';
import Icon, { ICON } from '../Icon/Icon';
import Gradient from '../Gradient/Gradient';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import spacing from '../../../styles/definitions/spacing';


export interface ButtonProps extends BaseProps {
  type?: 'PRIMARY' | 'SECONDARY' | 'LIGHT' | 'FB' | 'GOOGLE'; // Default PRIMARY
  icon?: ICON;
  loading?: boolean;
  style?: TouchableOpacityProps['style'],
}

const Button: FC<ButtonProps> = (props) => {
  const type = props.type || 'PRIMARY';


  const Inner = () => (
    <View
      style={[
        Styles.wrap,
        Styles[type],
      ]}
    >
      <Body bold style={[Styles.text, Styles[`text${type}`]]}>{props.title}</Body>

      {props.icon && !props.loading && (
        <Icon
          name={props.icon}
          size="small"
          style={Styles.icon}
        />
      )}

      {props.loading && (
        (
          <LoadingIcon
            size="small"
            type={(() => {
              switch (props.type) {
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
