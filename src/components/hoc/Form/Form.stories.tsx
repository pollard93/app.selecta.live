/* eslint-disable */
import React from 'react';
import { Button, Text, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import Form from './Form';
import CenterView from '../CenterView/CenterView';

type FormExt = new () => Form<any>;
const FormExt = Form as FormExt;

storiesOf('Form', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Form Default', () => (
    <FormExt
      config={{
        Text: {
          type: 'text',
          name: 'text',
          value: '',
          required: true,
          valid: false,
        },
        Email: {
          type: 'email',
          name: 'email',
          value: '',
          required: true,
          valid: false,
        },
        Switch: {
          type: 'switch',
          name: 'switch',
          value: false,
          required: true,
          valid: false,
        },
        Picker: {
          type: 'picker',
          name: 'picker',
          value: null,
          required: true,
          valid: false,
          options: [
            {
              label: 'select one',
              value: null,
            },
            {
              label: 'label 1',
              value: 'label 1',
            },
            {
              label: 'label 2',
              value: 'label 2',
            },
          ],
        },
      }}
      onSubmit={console.log}
      onChange={console.log}
    >
      {({ fields, valid, triggerSubmit }) => (
        <View style={{
          width: '100%',
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: '#d6d7da',
        }}>
          {fields.Text}
          {fields.Email}
          {fields.Switch}
          {fields.Picker}
          <Button
            disabled={!valid}
            title='Submit'
            onPress={triggerSubmit}
          />
        </View>
      )}
    </FormExt>
  ))
  .add('Form Update', () => (
    <FormExt
      config={{
        Text: {
          type: 'text',
          name: 'text',
          value: '',
          required: false,
          valid: false,
        },
        Email: {
          type: 'email',
          name: 'email',
          value: '',
          required: false,
          valid: false,
        },
      }}
      onSubmit={console.log}
      onChange={console.log}
      validateForm={(config, form) => {
        const anyInvalid = form.anyInvalid(config);
        const anyValidAndChanged = form.anyValidAndChanged(config);
        return !anyInvalid && anyValidAndChanged;
      }}
      reduceVariables={(config, form) => form.flattenVariables(config, null, true)}
    >
      {({ fields, valid, triggerSubmit }) => (
        <View style={{
          width: '100%',
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: '#d6d7da',
        }}>
          {fields.Text}
          {fields.Email}
          <Button
            disabled={!valid}
            title='Submit'
            onPress={triggerSubmit}
          />
        </View>
      )}
    </FormExt>
  ))
