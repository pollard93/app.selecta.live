import React from 'react';
import DateTimePickerCommunity, { IOSNativeProps, AndroidNativeProps } from '@react-native-community/datetimepicker';
import { View, Button } from 'react-native';
import styles from './DateTimePicker.styles';

interface DateTimePickerProps {
  pickerProps: IOSNativeProps | AndroidNativeProps,
  dismissModal?: () => void;
}

const DateTimePicker = (props: DateTimePickerProps) => {
  /**
   * If props.dismissModal is passed
   * Then component is shown in a modal
   * Wrap with position:asbolute and show ui to close modal
   */
  if (props.dismissModal) {
    return (
      <View style={styles.wrap}>
        <DateTimePickerCommunity {...props.pickerProps} />

        <Button
          title="close"
          onPress={props.dismissModal}
        />
      </View>
    );
  }


  return (
    <DateTimePickerCommunity {...props.pickerProps} />
  );
};

export default DateTimePicker;
