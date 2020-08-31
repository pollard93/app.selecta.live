import React, { FC, useState } from 'react';
import { View, StyleProp, ViewStyle, TouchableOpacity, StyleSheet } from 'react-native';
import { Navigation, OptionsModalTransitionStyle } from 'react-native-navigation';
import TextInput from '../TextInput/TextInput';
import { openModalScreen } from '../../../../../screens/utils';
import { ModalScreenName } from '../../../../../screens/ModalScreen/ModalScreen';
import DurationPicker from '../../../DateTimePicker/components/DurationPicker/DurationPicker';

export interface DurationInputProps {
  defaultValue?: number; // ms (defaults to 0)
  inputRef: React.MutableRefObject<any>;
  onChange: (ms: number) => void;
  wrapStyle?: StyleProp<ViewStyle>;
  editable?: boolean;
}

const DurationInput: FC<DurationInputProps> = (props) => {
  const [hoursValue, setHoursValue] = useState(props.defaultValue ? Math.floor(props.defaultValue / 3.6e+6) : 0);
  const [minutesValue, setMinutesValue] = useState(props.defaultValue ? (props.defaultValue / 60000) - (hoursValue * 60) : 0);


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
            Navigation.dismissModal('DURATION_INPUT');

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
    }, 'DURATION_INPUT', OptionsModalTransitionStyle.crossDissolve);
  };

  return (
    <View style={props.wrapStyle}>
      <View pointerEvents="none">
        <TextInput
          setRef={props.inputRef}
          name="date"
          value={`${hoursValue} Hour${hoursValue === 1 ? '' : 's'}${minutesValue ? ` - ${minutesValue} Minutes` : ''}`}
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

          open();
        }}
      />
    </View>
  );
};

export default DurationInput;
