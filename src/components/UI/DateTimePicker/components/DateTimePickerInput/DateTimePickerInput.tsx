import React, { useState, useEffect, useRef } from 'react';
import { View, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { openModalScreen } from '../../../../../screens/utils';
import { ModalScreenName } from '../../../../../screens/ModalScreen/ModalScreen';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import TextInput from '../../../Form/components/TextInput';
import Styles from './DateTimePickerInput.style';

interface DateTimePickerInputProps {
  defaultValue: string; // ISOString
  value?: string; // ISOString - allows component value to be updated externally
  onChange: (value: string) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

const DateTimePickerInput = (props: DateTimePickerInputProps) => {
  const [androidMode, setAndroidMode] = useState<'date' | 'time'>(null);
  const [date, setDate] = useState(props.defaultValue ? new Date(props.defaultValue) : new Date());

  const dateInput = useRef(null);
  const timeInput = useRef(null);

  /**
   * If props.value is set, watch for changes
   * If it changes, and the value differs from the internal state
   * Then set the state to match
   */
  useEffect(() => {
    if (props.value && props.value !== date.toISOString()) {
      setDate(new Date(props.value));
    }
  }, [props.value]);


  /**
   * On change set date state and execute props.onChange
   */
  const onChange = (_, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      props.onChange(new Date(selectedDate).toISOString());
    }

    /**
     * On change is executed when the user has finished their selection and the modal is closed
     * Set android mode to null to remove component from render
     */
    if (Platform.OS === 'android') {
      setAndroidMode(null);
    }
  };


  /**
   * iOS needs modal support, openModalScreen with DateTimePicker as child component
   */
  const openIOS = (mode: 'date' | 'time') => {
    openModalScreen({
      component: (
        <DateTimePicker
          pickerProps={{
            timeZoneOffsetInMinutes: 0,
            value: date,
            mode,
            is24Hour: true,
            display: 'default',
            onChange,
            minimumDate: props.minimumDate,
            maximumDate: props.maximumDate,
          }}
          dismissModal={() => {
            Navigation.dismissModal(ModalScreenName);

            /** Blur the inputs so they can trigger the modal again */
            dateInput.current.blur();
            timeInput.current.blur();
          }}
        />
      ),
    });
  };


  return (
    <View>
      <TextInput
        setRef={dateInput}
        name="date"
        onFocus={() => {
          if (Platform.OS === 'ios') {
            openIOS('date');
            return;
          }

          /** Android has native modal, open by rendering DateTimePicker below */
          setAndroidMode('date');
        }}
        value={date.toISOString()}
        style={Styles.input}
      />

      <TextInput
        setRef={timeInput}
        name="time"
        onFocus={() => {
          if (Platform.OS === 'ios') {
            openIOS('time');
            return;
          }

          /** Android has native modal, open by rendering DateTimePicker below */
          setAndroidMode('time');
        }}
        value={date.toISOString()}
        style={Styles.input}
      />

      {androidMode && (
        <DateTimePicker
          pickerProps={{
            timeZoneOffsetInMinutes: 0,
            value: date,
            mode: androidMode,
            is24Hour: true,
            display: 'default',
            onChange,
            minimumDate: props.minimumDate,
            maximumDate: props.maximumDate,
          }}
        />
      )}
    </View>
  );
};

export default DateTimePickerInput;
