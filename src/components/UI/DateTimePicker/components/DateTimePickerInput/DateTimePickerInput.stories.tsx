/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button, View } from 'react-native';
import { useForm } from 'react-hook-form';
import SafeAreaViewDecorator from '../../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';
import DateTimePickerInput from './DateTimePickerInput';

type FormData = {
  dateTime: string;
};

storiesOf('DateTimePickerInput', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('DateTimePickerInput - unpopulated', () => {
    const TestComponent = () => {
      const { register, setValue, handleSubmit, formState: { isValid, dirty } } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
          dateTime: undefined,
        },
      });

      return (
        <View>
          <DateTimePickerInput
            ref={
              register(
                { name: 'dateTime' },
                { required: true },
              )
            }
            /**
             * Defaults to now
             */
            defaultValue={null}
            onChange={(value) => setValue('dateTime', value, true)}
          />

          <Button
            title="Submit"
            disabled={!isValid || !dirty}
            onPress={handleSubmit(console.log)}
          />
        </View>
      );
    };

    return <TestComponent />;
  })
  .add('DateTimePickerInput - populated', () => {
    const TestComponent = () => {
      const { register, setValue, handleSubmit, formState: { isValid, dirty } } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
          dateTime: new Date(0).toISOString(),
        },
      });

      return (
        <View>
          <DateTimePickerInput
            ref={
              register(
                { name: 'dateTime' },
                { required: true },
              )
            }
            defaultValue={new Date(0).toISOString()}
            onChange={(value) => setValue('dateTime', value, true)}
          />

          <Button
            title="Submit"
            disabled={!isValid || !dirty}
            onPress={handleSubmit(console.log)}
          />
        </View>
      );
    };

    return <TestComponent />;
  });
