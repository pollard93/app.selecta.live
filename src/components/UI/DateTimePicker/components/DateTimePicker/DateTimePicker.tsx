import React, { useState } from 'react';
import DateTimePickerCommunity, { IOSNativeProps, AndroidNativeProps } from '@react-native-community/datetimepicker';
import { View, Platform } from 'react-native';
import Styles from './DateTimePicker.styles';
import useSafeArea from '../../../../../modules/SafeAreaInsets/SafeAreaInsets';
import Button from '../../../Button/Button';
import spacing from '../../../../../styles/definitions/spacing';
import DrawerV2 from '../../../DrawerV2/DrawerV2';

interface DateTimePickerProps {
  pickerProps: IOSNativeProps | AndroidNativeProps;
  onDone: (value?: Date) => void; // Pass value to confirm, null to cancel
}

const DateTimePicker = (props: DateTimePickerProps) => {
  const safeAreaInsets = useSafeArea();
  const [date, setDate] = useState(props.pickerProps.value);


  /**
   * On change set date state and execute props.onChange
   */
  const onChange = (_, selectedDate) => {
    /**
     * If android pass selectedDate, will be null if cancel was pressed
     */
    if (Platform.OS === 'android') {
      props.onDone(selectedDate);
      return;
    }


    if (selectedDate) {
      setDate(selectedDate);
    }
  };


  /**
   * If android render here (renders modal)
   */
  if (Platform.OS === 'android') {
    return (
      <DateTimePickerCommunity
        {...props.pickerProps}
        value={date}
        onChange={onChange}
        style={{ paddingVertical: spacing.small }}
      />
    );
  }


  return (
    <DrawerV2 onClosed={props.onDone}>
      {({ onClose }) => (
        <View style={[Styles.inner, { paddingBottom: safeAreaInsets.bottom + spacing.small }]}>
          <View style={Styles.buttons}>
            <Button
              title="Cancel"
              type="SECONDARY"
              size="small"
              onPress={() => {
                onClose();
              }}
            />

            <Button
              title="Done"
              type="PRIMARY"
              size="small"
              onPress={() => {
                onClose(date);
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
      )}
    </DrawerV2>
  );
};

export default DateTimePicker;
