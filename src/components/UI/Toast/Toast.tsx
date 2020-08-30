import React, { FC } from 'react';
import { View } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { useDynamicValue } from 'react-native-dynamic';
import Styles, { DynamicStyles } from './Toast.style';
import H4 from '../Typography/components/H4';

export interface ToastProps {
  content: string;
  type?: 'INFO' | 'SUCCESS' | 'ERROR'; // Default INFO
}

const Toast: FC<ToastProps> = (props) => {
  const type = props.type || 'INFO';
  const { safeAreaInsets } = useToast();
  const dynamicStyles = useDynamicValue(DynamicStyles);

  return (
    <View style={[Styles.outer, Styles[type], dynamicStyles[type], { paddingTop: safeAreaInsets.bottom }]}>
      <View style={Styles.inner}>
        <H4 forceLight={['SUCCESS', 'ERROR'].includes(type)}>{props.content}</H4>
      </View>
    </View>
  );
};

export default Toast;
