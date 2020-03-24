import { Button, TextInput } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import sinon from 'sinon';
import { MockedProvider } from '@apollo/react-testing';
import Register from './Register';
import RegisterView, { RegisterViewProps } from './RegisterView';
import { store } from '../../utils/storage';
import { REGISTER_MUTATION } from '../../API/mutation/register/register';
import { login_login } from '../../API/mutation/login/__generated__/login';
import resolvers from '../../ApolloClient/resolvers';
import { LOCAL_AUTH_KEY } from '../../ApolloClient/resolvers/mutation/putAccessToken/putAccessToken';

describe('Register tests', () => {
  it('tests registerrender and submit handler', () => {
    const onSubmit = sinon.spy();

    const wrapper = mount<RegisterViewProps>(
      <RegisterView
        loading={false}
        onSubmit={onSubmit}
      />,
    );

    // Test render
    expect(wrapper.find(Button).props().disabled).to.be.true;
    expect(wrapper.find(Button)).to.have.lengthOf(1);
    expect(wrapper.find(Button).first().props().title).to.equal('Register');
    expect(wrapper.find('Input')).to.have.lengthOf(2);
    expect(wrapper.find(TextInput)).to.have.lengthOf(2);
    expect(wrapper.find('Form')).to.have.lengthOf(1);

    // Test password field has secureTextEntry prop set
    expect(wrapper.find(TextInput).at(1).props().secureTextEntry).to.equal(true);

    // Test submit immediately
    wrapper.find(Button).first().props().onPress({} as any);
    expect(onSubmit).to.have.property('callCount', 1);
    expect(onSubmit.args[0][0].email).to.equal('');
    expect(onSubmit.args[0][0].password).to.equal('');

    // Test text change
    wrapper.find(TextInput).at(0).props().onChangeText('email@test.com');
    wrapper.find(TextInput).at(1).props().onChangeText('password');
    wrapper.update();

    expect(wrapper.find(Button).first().props().disabled).to.be.false;

    // Submit again
    wrapper.find(Button).first().props().onPress({} as any);
    expect(onSubmit).to.have.property('callCount', 2);
    expect(onSubmit.args[1][0].email).to.equal('email@test.com');
    expect(onSubmit.args[1][0].password).to.equal('password');
  });

  it('tests register loading state', () => {
    // Mount loading state of login view
    const wrapper = mount<RegisterViewProps>(
      <RegisterView
        loading={true}
        onSubmit={null}
      />,
    );

    // Both buttons should be disabled
    expect(wrapper.find(Button).first().props().disabled).to.be.true;
    expect(wrapper.find(Button).first().props().title).to.equal('Loading');
  });

  it('tests register error', async () => {
    const mocks = [
      {
        request: {
          query: REGISTER_MUTATION,
          variables: {
            email: '',
            password: '',
          },
        },
        error: new Error(),
      },
    ];

    const wrapper = mount(
      <MockedProvider
        mocks={mocks}
        resolvers={resolvers}
        addTypename={false}
      >
        <Register />
      </MockedProvider>,
    );

    // Submit form
    wrapper.find(Button).first().props().onPress({} as any);

    // Wait for response
    await wait(0);

    // Check that no response is stored
    const localAuth = await store(LOCAL_AUTH_KEY);
    expect(localAuth).to.deep.equal(null);
  });

  it('tests register success', async () => {
    const register: login_login = {
      __typename: 'AuthPayload',
      token: 'token-here',
    };

    const mocks = [
      {
        request: {
          query: REGISTER_MUTATION,
          variables: {
            email: '',
            password: '',
          },
        },
        result: {
          data: {
            register,
          },
        },
      },
    ];

    const wrapper = mount(
      <MockedProvider
        mocks={mocks}
        resolvers={resolvers}
        addTypename={false}
      >
        <Register />
      </MockedProvider>,
    );

    // Submit form
    wrapper.find(Button).first().props().onPress({} as any);

    // Wait for response
    await wait(0);

    // Check that the response is stored
    const token = await store(LOCAL_AUTH_KEY);
    expect(token).to.deep.equal(register.token);
  });
});
