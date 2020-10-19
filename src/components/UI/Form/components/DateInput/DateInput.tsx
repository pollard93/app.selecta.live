import React, { FC, useState } from 'react';
import { View, Platform, StyleProp, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native';
import { Navigation, OptionsModalTransitionStyle } from 'react-native-navigation';
import TextInput from '../TextInput/TextInput';
import { openModalScreen } from '../../../../../screens/utils';
import DateTimePicker from '../../../DateTimePicker/components/DateTimePicker/DateTimePicker';
import { formatForTimezone } from '../../../../../utils/functions';

export interface DateInputProps {
  defaultValue?: string; // ISOString
  inputRef: React.MutableRefObject<any>;
  onChange: (value: string) => void;
  mode: 'date' | 'time',
  minimumDate?: Date;
  maximumDate?: Date;
  wrapStyle?: StyleProp<ViewStyle>;
  editable?: boolean;
}

const DateInput: FC<DateInputProps> = (props) => {
  const [androidActive, setAndroidActive] = useState(false);
  const [date, setDate] = useState(props.defaultValue ? new Date(props.defaultValue) : new Date());


  /**
   * Modals will pass null if cancelled, or a date value if 'done' selected
   */
  const onDone = (value?: Date) => {
    if (Platform.OS === 'ios') {
      Navigation.dismissModal('DATE_INPUT');
    } else {
      setAndroidActive(false);
    }

    /** Blur the input so it can be triggered again */
    // eslint-disable-next-line no-unused-expressions
    props.inputRef?.current?.blur();

    if (value) {
      setDate(value);
      props.onChange(new Date(value).toISOString());
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
            onChange: null, // Overridden in component
            minimumDate: props.minimumDate,
            maximumDate: props.maximumDate,
          }}
          onDone={onDone}
        />
      ),
    }, 'DATE_INPUT', OptionsModalTransitionStyle.crossDissolve);
  };

  return (
    <View style={props.wrapStyle}>
      <View pointerEvents="none">
        <TextInput
          setRef={props.inputRef}
          name="date"
          value={formatForTimezone(date.toISOString(), props.mode === 'date' ? 'DD/MM/YYYY' : 'HH:mm z')}
          editable={props.editable}
        />
      </View>

      <TouchableOpacity
        style={StyleSheet.absoluteFillObject}
        onPress={() => {
          /**
           * Handle on open here and not onFocus of the input to prevent the keyboard appearing
           * Don't allow the user to manually edit the input
           */

          // If disabled
          if (props.editable === false) return;

          if (Platform.OS === 'ios') {
            openIOS();
            return;
          }

          /** Android has native modal, open by rendering DateTimePicker below */
          setAndroidActive(true);
        }}
      />

      {androidActive && (
        <DateTimePicker
          pickerProps={{
            value: date,
            mode: props.mode,
            display: 'default',
            onChange: null,
            minimumDate: props.minimumDate,
            maximumDate: props.maximumDate,
          }}
          onDone={onDone}
        />
      )}
    </View>
  );
};

export default DateInput;
