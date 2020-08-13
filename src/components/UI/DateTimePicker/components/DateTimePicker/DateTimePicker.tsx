import React, { useState } from 'react';
import DateTimePickerCommunity, { IOSNativeProps, AndroidNativeProps } from '@react-native-community/datetimepicker';
import { View } from 'react-native';
import styles from './DateTimePicker.styles';
import useSafeArea from '../../../../../modules/SafeAreaInsets/SafeAreaInsets';
import Button from '../../../Button/Button';
import spacing from '../../../../../styles/definitions/spacing';

interface DateTimePickerProps {
  pickerProps: IOSNativeProps | AndroidNativeProps;
  onDone?: (value?: Date) => void; // Pass value to confirm, null to cancel
}

const DateTimePicker = (props: DateTimePickerProps) => {
  const safeAreaInsets = useSafeArea();
  const [date, setDate] = useState(props.pickerProps.value);


  /**
   * On change set date state and execute props.onChange
   */
  const onChange = (_, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };


  return (
    <View style={styles.wrap}>
      <View style={[styles.inner, { paddingBottom: safeAreaInsets.bottom + spacing.small }]}>
        <View style={styles.buttons}>
          <Button
            title="Cancel"
            type="SECONDARY"
            size="small"
            onPress={() => {
              props.onDone();
            }}
          />

          <Button
            title="Done"
            type="PRIMARY"
            size="small"
            onPress={() => {
              props.onDone(date);
            }}
          />
        </View>

        <DateTimePickerCommunity
          {...props.pickerProps}
          value={date}
          onChange={onChange}
          style={{ paddingVertical: spacing.small }}
        />
      </View>
    </View>
  );
};

export default DateTimePicker;
