import React, { FC, useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Picker } from '@react-native-community/picker';
import TextInput from './TextInput';
import { openModalScreen } from '../../../../screens/utils';
import { ModalScreenName } from '../../../../screens/ModalScreen/ModalScreen';
import DurationPicker from '../../DateTimePicker/components/DurationPicker/DurationPicker';

export interface DurationInputProps {
  hoursValue: number;
  minutesValue: number;
  inputRef: React.MutableRefObject<any>;
  value?: string; // ISOString - allows component value to be updated externally
  onChange: (ms: number) => void;
  wrapStyle?: StyleProp<ViewStyle>;
  editable?: boolean;
}

const DurationInput: FC<DurationInputProps> = (props) => {
  const [hoursValue, setHoursValue] = useState(props.hoursValue);
  const [minutesValue, setMinutesValue] = useState(props.minutesValue - props.hoursValue * 60);


  /**
   * Get milliseconds from hours and minutes
   */
  const getMs = ({ hours, minutes }) => (hours * 3.6e+6) + (minutes * 60000);


  /**
   * openModalScreen with Hour and Minutes picker component
   */
  const open = () => {
    openModalScreen({
      component: (
        <DurationPicker
          defaultHours={hoursValue}
          defaultMinutes={minutesValue}
          onDone={(value) => {
            Navigation.dismissModal(ModalScreenName);

            /** Blur the input so it can be triggered again */
            props.inputRef.current.blur();

            if (value) {
              setHoursValue(value.hours);
              setMinutesValue(value.minutes);
              props.onChange(getMs(value));
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
          open();
        }}
        value={`${hoursValue} Hour${hoursValue === 1 ? '' : 's'}${minutesValue ? ` - ${minutesValue} Minutes` : ''}`}
        editable={props.editable}
      />
    </View>
  );
};

export default DurationInput;
