import React, { FC, useState, useRef, useEffect } from 'react';
import { View, Platform } from 'react-native';
import moment from 'moment-timezone';
import { Navigation } from 'react-native-navigation';
import TextInput from './TextInput';
import { openModalScreen } from '../../../../screens/utils';
import DateTimePicker from '../../DateTimePicker/components/DateTimePicker/DateTimePicker';
import { ModalScreenName } from '../../../../screens/ModalScreen/ModalScreen';
import Styles from '../Form.style';

export interface DateInputProps {
  defaultValue: string; // ISOString
  value?: string; // ISOString - allows component value to be updated externally
  onChange: (value: string) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

const DateInput: FC<DateInputProps> = (props) => {
  const [androidActive, setAndroidActive] = useState(false);
  const [date, setDate] = useState(props.defaultValue ? new Date(props.defaultValue) : new Date());
  const input = useRef(null);


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
      setAndroidActive(false);
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

            /** Blur the input so it can be triggered again */
            input.current.blur();
          }}
        />
      ),
    });
  };

  return (
    <View>
      <TextInput
        setRef={input}
        name="date"
        onFocus={() => {
          if (Platform.OS === 'ios') {
            openIOS('date');
            return;
          }

          /** Android has native modal, open by rendering DateTimePicker below */
          setAndroidActive(true);
        }}
        value={moment(date).format('DD/MM/YYYY')}
        style={Styles.DateInput}
      />

      {androidActive && (
        <DateTimePicker
          pickerProps={{
            timeZoneOffsetInMinutes: 0,
            value: date,
            mode: 'date',
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

export default DateInput;
