import React, { useState, FC } from 'react';
import { Picker } from '@react-native-community/picker';
import { View } from 'react-native';
import styles from './DurationPicker.styles';
import useSafeArea from '../../../../../modules/SafeAreaInsets/SafeAreaInsets';
import Button from '../../../Button/Button';
import spacing from '../../../../../styles/definitions/spacing';

interface DurationPickerProps {
  defaultHours: number; // 0 - 12
  defaultMinutes: number; // 0|15|30|45
  onDone?: (value?: { hours: number, minutes: number }) => void; // Pass value to confirm, null to cancel
}

const DurationPicker: FC<DurationPickerProps> = (props) => {
  const safeAreaInsets = useSafeArea();
  const [hoursValueInternal, setHoursValueInternal] = useState(props.defaultHours);
  const [minutesValueInternal, setMinutesValueInternal] = useState(props.defaultMinutes);


  return (
    <View style={styles.wrap}>
      <View style={[styles.inner, { paddingBottom: safeAreaInsets.bottom + spacing.small }]}>
        <View style={styles.buttons}>
          <Button
            title="Cancel"
            type="SECONDARY"
            size="small"
            onPress={() => {
              props.onDone();
            }}
          />

          <Button
            title="Done"
            type="PRIMARY"
            size="small"
            onPress={() => {
              props.onDone({
                hours: hoursValueInternal,
                minutes: minutesValueInternal,
              });
            }}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Picker
            selectedValue={hoursValueInternal}
            style={styles.picker}
            onValueChange={(v) => {
              // Don't allow 0
              if ((v as number) === 0 && minutesValueInternal === 0) {
                return;
              }

              setHoursValueInternal(v as number);
            }}
          >
            {Array(13).fill(0).map((_, i) => (
              <Picker.Item key={i} label={`${i} Hours`} value={i} />
            ))}
          </Picker>

          <Picker
            selectedValue={minutesValueInternal}
            style={styles.picker}
            onValueChange={(v) => {
              // Don't allow 0
              if ((v as number) === 0 && hoursValueInternal === 0) {
                return;
              }

              setMinutesValueInternal(v as number);
            }}
          >
            {[0, 15, 30, 45].map((v) => (
              <Picker.Item key={v} label={`${v} Minutes`} value={v} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default DurationPicker;
