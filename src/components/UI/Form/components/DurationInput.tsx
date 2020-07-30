import React, { FC, useState } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Picker } from '@react-native-community/picker';
import TextInput from './TextInput';
import { openModalScreen } from '../../../../screens/utils';
import { ModalScreenName } from '../../../../screens/ModalScreen/ModalScreen';
import Button from '../../Button/Button';

export interface DurationInputProps {
  hoursValue: number;
  minutesValue: number;
  inputRef: React.MutableRefObject<any>;
  value?: string; // ISOString - allows component value to be updated externally
  onChange: (ms: number) => void;
  wrapStyle?: StyleProp<ViewStyle>;
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
    const Component = () => {
      const [hoursValueInternal, setHoursValueInternal] = useState(1);
      const [minutesValueInternal, setMinutesValueInternal] = useState(0);

      return (
        <View style={{ flexDirection: 'row' }}>
          <Picker
            selectedValue={hoursValueInternal}
            style={{ height: 50, width: 100 }}
            onValueChange={(v) => {
              // Don't allow 0
              if ((v as number) === 0 && minutesValueInternal === 0) {
                return;
              }

              setHoursValue(v as number);
              setHoursValueInternal(v as number);

              props.onChange(getMs({
                hours: v as number,
                minutes: minutesValueInternal,
              }));
            }}
          >
            {Array(7).fill(0).map((_, i) => (
              <Picker.Item key={i} label={`${i}`} value={i} />
            ))}
          </Picker>

          <Picker
            selectedValue={minutesValueInternal}
            style={{ height: 50, width: 100 }}
            onValueChange={(v) => {
              // Don't allow 0
              if ((v as number) === 0 && hoursValueInternal === 0) {
                return;
              }

              setMinutesValue(v as number);
              setMinutesValueInternal(v as number);

              props.onChange(getMs({
                hours: hoursValueInternal,
                minutes: v as number,
              }));
            }}
          >
            {[0, 15, 30, 45].map((v) => (
              <Picker.Item key={v} label={`${v}`} value={v} />
            ))}
          </Picker>

          <Button
            title="close"
            onPress={() => {
              Navigation.dismissModal(ModalScreenName);

              /** Blur the input so it can be triggered again */
              props.inputRef.current.blur();
            }}
          />
        </View>
      );
    };

    openModalScreen({
      component: <Component />,
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
      />
    </View>
  );
};

export default DurationInput;
