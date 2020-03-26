import React from 'react';
import { View, Text } from 'react-native';
import styles from './Toast.style';

interface ToastProps {
  content: string;
}

const Toast = (props: ToastProps) => (
  <View style={styles.wrap}>
    <Text>{props.content}</Text>
  </View>
);

export default Toast;
