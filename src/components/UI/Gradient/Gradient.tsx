import React, { FC } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ViewProps } from 'react-native';
import color from '../../../styles/definitions/color';

interface GradientProps extends ViewProps {
  type?: 'PRIMARY'; // Default Primary
}

const Gradient: FC<GradientProps> = (props) => (
  <LinearGradient colors={color.gradient[props.type?.toLocaleLowerCase() || 'primary']} {...props}>
    {props.children}
  </LinearGradient>
);

export default Gradient;
