import React, { FC } from 'react';
import { View } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Styles, { DynamicStyles } from './Toast.style';
import H4 from '../Typography/components/H4';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import { useHeaderStyles } from '../Headers/Header/Header';

export interface ToastProps {
  content: string;
  type?: 'INFO' | 'SUCCESS' | 'ERROR'; // Default INFO
}

const Toast: FC<ToastProps> = (props) => {
  const type = props.type || 'INFO';
  const safeAreaInsets = useSafeArea();
  const { headerHeight } = useHeaderStyles();
  const dynamicStyles = useDynamicValue(DynamicStyles);

  return (
    <View style={[Styles.outer, Styles[type], dynamicStyles[type], { paddingTop: safeAreaInsets.top }]}>
      <View style={{ minHeight: headerHeight }}>
        <View style={Styles.inner}>
          <H4 forceLight={['SUCCESS', 'ERROR'].includes(type)}>{props.content}</H4>
        </View>
      </View>
    </View>
  );
};

export default Toast;
