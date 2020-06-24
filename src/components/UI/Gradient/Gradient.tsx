import React, { FC } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../../styles/definitions/color';

interface GradientProps {
  type?: 'PRIMARY'; // Default Primary
}

const Gradient: FC<GradientProps> = (props) => (
  <LinearGradient colors={color.gradient[props.type?.toLocaleLowerCase() || 'primary']}>
    {props.children}
  </LinearGradient>
);

export default Gradient;
