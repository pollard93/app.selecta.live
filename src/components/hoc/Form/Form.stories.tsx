import React from 'react';
import { Button, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import Form from './Form';
import AssetPickerProvider from '../../../modules/AssetPickerProvider/AssetPickerProvider';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';

class FormExt extends Form<any> {}

storiesOf('Form', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator((getStory) => <AssetPickerProvider>{getStory()}</AssetPickerProvider>)
  .add('Form Default', () => (
    <FormExt
      config={{
        Text: {
          type: 'text',
          name: 'text',
          value: '',
          required: true,
          textInputProps: {
            placeholder: 'Text input',
          },
        },
        Email: {
          type: 'email',
          name: 'email',
          value: '',
          required: true,
          textInputProps: {
            placeholder: 'Email input',
          },
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
        Image: {
          type: 'image',
          name: 'image',
          value: null,
          required: true,
          imageProps: {
            asyncImageProps: {
              splashUrl: null,
              // If wanting image to fade back when reset, give initial value
              fullUrl: 'https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop',
              containerProps: {
                style: {
                  width: 250,
                  height: 250,
                },
              },
            },
          },
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
          {fields.Image}
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
          value: 'test name',
          required: false,
          textInputProps: {
            placeholder: 'Text input',
          },
        },
        Email: {
          type: 'email',
          name: 'email',
          value: 'test@test.com',
          required: false,
          textInputProps: {
            placeholder: 'Email input',
          },
        },
        Image: {
          type: 'image',
          name: 'image',
          value: null,
          required: false,
          imageProps: {
            asyncImageProps: {
              splashUrl: null,
              fullUrl: 'https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop',
              containerProps: {
                style: {
                  width: 250,
                  height: 250,
                },
              },
            },
          },
        },
      }}
      onSubmit={console.log}
      onChange={console.log}
      validateForm={(config, form) => {
        const anyInvalid = form.anyInvalid(config);
        console.log('anyInvalid', anyInvalid);
        const anyValidAndChanged = form.anyValidAndChanged(config);
        console.log('anyValidAndChanged', anyValidAndChanged);
        return !anyInvalid && anyValidAndChanged;
      }}
      reduceVariables={(config, form) => form.flattenVariables(config, null, true)}
    >
      {({ config, fields, valid, triggerSubmit }) => (
        <View style={{
          width: '100%',
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: '#d6d7da',
        }}>
          {console.log(config)}
          {fields.Text}
          {fields.Email}
          {fields.Image}
          <Button
            disabled={!valid}
            title='Submit'
            onPress={triggerSubmit}
          />
        </View>
      )}
    </FormExt>
  ));
