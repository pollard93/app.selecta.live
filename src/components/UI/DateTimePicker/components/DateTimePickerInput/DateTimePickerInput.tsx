import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { openModalScreen } from '../../../../../screens/utils';
import { ModalScreenName } from '../../../../../screens/ModalScreen/ModalScreen';
import DateTimePicker from '../DateTimePicker/DateTimePicker';

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
  const openIOS = () => {
    openModalScreen({
      component: (
        <DateTimePicker
          pickerProps={{
            timeZoneOffsetInMinutes: 0,
            value: date,
            mode: 'datetime',
            is24Hour: true,
            display: 'default',
            onChange,
            minimumDate: props.minimumDate,
            maximumDate: props.maximumDate,
          }}
          dismissModal={() => {
            Navigation.dismissModal(ModalScreenName);
          }}
        />
      ),
    });
  };


  return (
    <View ref={props.setRef}>
      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === 'ios') {
            openIOS();
            return;
          }

          /**
           * Android has native modal, open by rendering DateTimePicker below
           */
          setAndroidMode('date');
        }}
      >
        <Text>DATE: {date.toISOString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === 'ios') {
            openIOS();
            return;
          }

          /**
           * Android has native modal, open by rendering DateTimePicker below
           */
          setAndroidMode('time');
        }}
      >
        <Text>TIME: {date.toISOString()}</Text>
      </TouchableOpacity>

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
