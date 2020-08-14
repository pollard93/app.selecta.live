import React, { FC } from 'react';
import { Switch as SwitchRN, SwitchProps } from 'react-native';
import color from '../../../../../styles/definitions/color';

const Switch: FC<SwitchProps> = (props) => (
  <SwitchRN
    trackColor={{
      true: color.accent.primary,
      false: color.mono.light,
    }}
    thumbColor={color.mono.light}
    {...props}
  />
);

export default Switch;
