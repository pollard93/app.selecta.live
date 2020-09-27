import React, { useState, FC } from 'react';
import { Picker } from '@react-native-community/picker';
import { View } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Styles, { DynamicStyles } from './DurationPicker.styles';
import useSafeArea from '../../../../../modules/SafeAreaInsets/SafeAreaInsets';
import Button from '../../../Button/Button';
import spacing from '../../../../../styles/definitions/spacing';
import DrawerV2 from '../../../DrawerV2/DrawerV2';

interface DurationPickerProps {
  defaultHours: number; // 0 - 12
  defaultMinutes: number; // 0|15|30|45
  onDone: (value?: { hours: number, minutes: number }) => void; // Pass value to confirm, null to cancel
}

const DurationPicker: FC<DurationPickerProps> = (props) => {
  const safeAreaInsets = useSafeArea();
  const [hoursValueInternal, setHoursValueInternal] = useState(props.defaultHours);
  const [minutesValueInternal, setMinutesValueInternal] = useState(props.defaultMinutes);
  const dynamicStyles = useDynamicValue(DynamicStyles);


  return (
    <DrawerV2 onClosed={props.onDone}>
      {({ onClose }) => (
        <View style={[Styles.inner, { paddingBottom: safeAreaInsets.bottom + spacing.small }]}>
          <View style={Styles.buttons}>
            <Button
              title="Cancel"
              type="SECONDARY"
              size="small"
              onPress={() => {
                onClose();
              }}
            />

            <Button
              title="Done"
              type="PRIMARY"
              size="small"
              onPress={() => {
                onClose({
                  hours: hoursValueInternal,
                  minutes: minutesValueInternal,
                });
              }}
            />
          </View>

          <View style={Styles.pickerWrap}>
            <Picker
              selectedValue={hoursValueInternal}
              style={Styles.picker}
              onValueChange={(v) => {
                // Don't allow 0
                if ((v as number) === 0 && minutesValueInternal === 0) {
                  return;
                }

                setHoursValueInternal(v as number);
              }}
            >
              {Array(13).fill(0).map((_, i) => (
                <Picker.Item
                  key={i}
                  label={`${i} Hours`}
                  value={i}
                  color={dynamicStyles.text.color}
                />
              ))}
            </Picker>

            <Picker
              selectedValue={minutesValueInternal}
              style={Styles.picker}
              onValueChange={(v) => {
                // Don't allow 0
                if ((v as number) === 0 && hoursValueInternal === 0) {
                  return;
                }

                setMinutesValueInternal(v as number);
              }}
            >
              {[0, 15, 30, 45].map((v) => (
                <Picker.Item
                  key={v}
                  label={`${v} Minutes`}
                  value={v}
                  color={dynamicStyles.text.color}
                />
              ))}
            </Picker>
          </View>
        </View>
      )}
    </DrawerV2>
  );
};

export default DurationPicker;
