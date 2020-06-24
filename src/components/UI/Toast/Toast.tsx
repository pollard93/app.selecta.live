import React, { FC } from 'react';
import { View } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import styles from './Toast.style';
import H4 from '../Typography/components/H4';

export interface ToastProps {
  content: string;
  type: 'INFO' | 'SUCCESS' | 'ERROR';
}

const Toast: FC<ToastProps> = (props) => {
  const { safeAreaInsets } = useToast();

  return (
    <View style={[styles.outer, styles[props.type], { paddingBottom: safeAreaInsets.bottom }]}>
      <View style={styles.inner}>
        <H4 light={props.type !== 'INFO'}>{props.content}</H4>
      </View>
    </View>
  );
};

export default Toast;
