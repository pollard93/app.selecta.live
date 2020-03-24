import { Button, TextInput, Switch, Picker } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import wait from 'waait';

import Form from './Form';
import Input from '../../UI/Input/Input';
import { FormState, ConfigParams } from './FormInterfaces';

type FormExt = new () => Form<any>;
const FormExt = Form as FormExt;

describe('Form tests', () => {
  it('renders a form standard and tests validitiy', async () => {
    const onSubmit = sinon.spy();
    const onChange = sinon.spy();

    const wrapper = mount<FormExt, FormState>(<FormExt
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
      onSubmit={onSubmit}
      onChange={onChange}
    >
      {({ fields, valid, triggerSubmit }) => (
        <>
          {fields.Text}
          {fields.Email}
          {fields.Switch}
          {fields.Picker}
          <Button
            disabled={!valid}
            title='Submit'
            onPress={triggerSubmit}
          />
        </>
      )}
    </FormExt>);

    // Test render
    expect(wrapper.state().valid).to.equal(false);

    expect(wrapper.find(Button).props().disabled).to.be.true;
    expect(wrapper.find(Input)).to.have.lengthOf(4);
    expect(wrapper.find(TextInput)).to.have.lengthOf(2);
    expect(wrapper.find(Switch)).to.have.lengthOf(1);
    expect(wrapper.find(Picker)).to.have.lengthOf(1);

    // Test submit immediately
    wrapper.find(Button).first().props().onPress({} as any);
    expect(onSubmit).to.have.property('callCount', 1);
    expect(onSubmit.args[0][0].text).to.equal('');
    expect(onSubmit.args[0][0].email).to.equal('');
    expect(onSubmit.args[0][0].switch).to.equal(false);
    expect(onSubmit.args[0][0].picker).to.equal(null);

    // Test text change
    wrapper.find(TextInput).first().props().onChangeText('hello world');

    // On change should have been executed with updated variables
    expect(onChange).to.have.property('callCount', 1);
    expect(onChange.args[0][0].text).to.equal('hello world');

    // State should have been updated with change
    expect((wrapper.state().config.Text as ConfigParams).value).to.equal('hello world');
    expect((wrapper.state().config.Text as ConfigParams).touched).to.equal(true);
    expect((wrapper.state().config.Text as ConfigParams).changed).to.equal(true);
    expect((wrapper.state().config.Text as ConfigParams).valid).to.equal(true);

    // Form should still be invalid
    expect(wrapper.state().valid).to.equal(false);

    // Test email change
    wrapper.find(TextInput).at(1).props().onChangeText('hello email');

    // On change should have been executed with updated variables
    expect(onChange).to.have.property('callCount', 2);
    expect(onChange.args[1][0].email).to.equal('hello email');

    // State should have been updated with change, email should not be valid
    expect((wrapper.state().config.Email as ConfigParams).value).to.equal('hello email');
    expect((wrapper.state().config.Email as ConfigParams).touched).to.equal(true);
    expect((wrapper.state().config.Email as ConfigParams).changed).to.equal(true);
    expect((wrapper.state().config.Email as ConfigParams).valid).to.equal(false);

    // Make email valid
    wrapper.find(TextInput).at(1).props().onChangeText('g@g.com');
    expect((wrapper.state().config.Email as ConfigParams).valid).to.equal(true);

    // On change should have been executed with updated variables
    expect(onChange).to.have.property('callCount', 3);
    expect(onChange.args[2][0].email).to.equal('g@g.com');

    // Form should still be invalid
    expect(wrapper.state().valid).to.equal(false);

    // Update switch
    wrapper.find(Switch).first().props().onValueChange(true as any);
    expect((wrapper.state().config.Switch as ConfigParams).valid).to.equal(true);

    // On change should have been executed with updated variables
    expect(onChange).to.have.property('callCount', 4);
    expect(onChange.args[3][0].switch).to.equal(true);

    // Form should still be invalid
    expect(wrapper.state().valid).to.equal(false);

    // Update picker
    wrapper.find(Picker).first().props().onValueChange('label 1', null);
    expect((wrapper.state().config.Picker as ConfigParams).valid).to.equal(true);

    // On change should have been executed with updated variables
    expect(onChange).to.have.property('callCount', 5);
    expect(onChange.args[4][0].picker).to.equal('label 1');

    // Form should now be valid
    expect(wrapper.state().valid).to.equal(true);

    // Wait for response
    await wait(0);
  });

  it('renders an update form and tests validitiy', async () => {
    const onSubmit = sinon.spy();

    const wrapper = mount<FormExt, FormState>(<FormExt
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
      onSubmit={onSubmit}
      validateForm={(config, form) => {
        const anyInvalid = form.anyInvalid(config);
        const anyValidAndChanged = form.anyValidAndChanged(config);
        return !anyInvalid && anyValidAndChanged;
      }}
      reduceVariables={(config, form) => form.flattenVariables(config, null, true)}
    >
      {({ fields, valid, triggerSubmit }) => (
        <>
          {fields.Text}
          {fields.Email}
          <Button
            disabled={!valid}
            title='Submit'
            onPress={triggerSubmit}
          />
        </>
      )}
    </FormExt>);

    // Test render
    expect(wrapper.state().valid).to.equal(false);
    expect(wrapper.find(Button).props().disabled).to.be.true;

    // Test text change
    wrapper.find(TextInput).first().props().onChangeText('hello world');

    // Test submit, submission should only have the values that have changed
    wrapper.find(Button).first().props().onPress({} as any);
    expect(onSubmit).to.have.property('callCount', 1);
    expect(Object.keys(onSubmit.args[0][0])).to.have.lengthOf(1);
    expect(onSubmit.args[0][0].text).to.equal('hello world');

    // Wait for response
    await wait(0);
  });
});
