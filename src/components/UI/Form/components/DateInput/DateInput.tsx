import React, { FC, useState } from 'react';
import { View, Platform, StyleProp, ViewStyle } from 'react-native';
import { Navigation } from 'react-native-navigation';
import TextInput from '../TextInput/TextInput';
import { openModalScreen } from '../../../../../screens/utils';
import DateTimePicker from '../../../DateTimePicker/components/DateTimePicker/DateTimePicker';
import { ModalScreenName } from '../../../../../screens/ModalScreen/ModalScreen';
import { formatForTimezone } from '../../../../../utils/functions';

export interface DateInputProps {
  value: string; // ISOString - allows component value to be updated externally
  inputRef: React.MutableRefObject<any>;
  onChange: (value: string) => void;
  mode: 'date' | 'time',
  minimumDate?: Date;
  maximumDate?: Date;
  wrapStyle?: StyleProp<ViewStyle>;
  editable?: boolean;
}

const DateInput: FC<DateInputProps> = (props) => {
  // const [androidActive, setAndroidActive] = useState(false);
  const [date, setDate] = useState(props.value ? new Date(props.value) : new Date());


  /**
   * iOS needs modal support, openModalScreen with DateTimePicker as child component
   */
  const openIOS = () => {
    openModalScreen({
      component: (
        <DateTimePicker
          pickerProps={{
            value: date,
            mode: props.mode,
            display: 'default',
            onChange: null, // Overridden in component
            minimumDate: props.minimumDate,
            maximumDate: props.maximumDate,
          }}
          onDone={(value) => {
            Navigation.dismissModal(ModalScreenName);

            /** Blur the input so it can be triggered again */
            props.inputRef.current.blur();

            if (value) {
              setDate(value);
              props.onChange(new Date(value).toISOString());
            }
          }}
        />
      ),
    });
  };

  return (
    <View style={props.wrapStyle}>
      <TextInput
        setRef={props.inputRef}
        name="date"
        onFocus={() => {
          if (Platform.OS === 'ios') {
            openIOS();
          }

          /** Android has native modal, open by rendering DateTimePicker below */
          // setAndroidActive(true);
        }}
        value={formatForTimezone(date.toISOString(), props.mode === 'date' ? 'DD/MM/YYYY' : 'HH:mm z')}
        editable={props.editable}
      />

      {/* {androidActive && (
        <DateTimePicker
          pickerProps={{
            value: date,
            mode: props.mode,
            display: 'default',
            onChange,
            minimumDate: props.minimumDate,
            maximumDate: props.maximumDate,
          }}
        />
      )} */}
    </View>
  );
};

export default DateInput;
