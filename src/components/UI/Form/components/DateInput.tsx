import React, { FC, useState, useRef, useEffect } from 'react';
import { View, Platform, StyleProp, ViewStyle } from 'react-native';
import moment from 'moment-timezone';
import { Navigation } from 'react-native-navigation';
import TextInput from './TextInput';
import { openModalScreen } from '../../../../screens/utils';
import DateTimePicker from '../../DateTimePicker/components/DateTimePicker/DateTimePicker';
import { ModalScreenName } from '../../../../screens/ModalScreen/ModalScreen';
import Styles from '../Form.style';
import { formatForTimezone } from '../../../../utils/functions';

export interface DateInputProps {
  value: string; // ISOString - allows component value to be updated externally
  inputRef: React.MutableRefObject<any>;
  onChange: (value: string) => void;
  mode: 'date' | 'time',
  minimumDate?: Date;
  maximumDate?: Date;
  wrapStyle?: StyleProp<ViewStyle>;
}

const DateInput: FC<DateInputProps> = (props) => {
  const [androidActive, setAndroidActive] = useState(false);
  const [date, setDate] = useState(props.value ? new Date(props.value) : new Date());


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
  const openIOS = () => {
    openModalScreen({
      component: (
        <DateTimePicker
          pickerProps={{
            value: date,
            mode: props.mode,
            display: 'default',
            onChange,
            minimumDate: props.minimumDate,
            maximumDate: props.maximumDate,
          }}
          dismissModal={() => {
            Navigation.dismissModal(ModalScreenName);

            /** Blur the input so it can be triggered again */
            props.inputRef.current.blur();
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
            return;
          }

          /** Android has native modal, open by rendering DateTimePicker below */
          setAndroidActive(true);
        }}
        value={formatForTimezone(date.toISOString(), props.mode === 'date' ? 'DD/MM/YYYY' : 'HH:mm z')}
      />

      {androidActive && (
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
      )}
    </View>
  );
};

export default DateInput;
