import { TextInput, Button } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import sinon from 'sinon';
import { MockedProvider } from '@apollo/react-testing';
import LoginView, { LoginViewProps } from './LoginView';
import { LOGIN_MUTATION } from '../../API/mutation/login/login';
import Login from './Login';
import { store } from '../../utils/storage';
import { REQUEST_PASSWORD_RESET_MUTATION } from '../../API/mutation/requestPasswordReset/requestPasswordReset';
import { login_login } from '../../API/mutation/login/__generated__/login';
import resolvers from '../../ApolloClient/resolvers';
import { LOCAL_AUTH_KEY } from '../../ApolloClient/resolvers/mutation/putAccessToken/putAccessToken';

describe('Login tests', () => {
  it('Tests render and submission handler', () => {
    const onReset = sinon.spy();
    const onSubmit = sinon.spy();
    const onRegister = sinon.spy();

    // Mount initial state of login view
    const wrapper = mount<LoginViewProps>(
      <LoginView
        loading={false}
        reset={false}
        onReset={onReset}
        onSubmit={onSubmit}
        onRegister={onRegister}
      />,
    );

    // Test render
    expect(wrapper.find(Button)).to.have.lengthOf(3);
    expect(wrapper.find(Button).first().props().disabled).to.be.true;
    expect(wrapper.find(Button).first().props().title).to.equal('Login');
    expect(wrapper.find(Button).at(1).props().disabled).to.be.false;
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

    // Form should now be valid
    expect(wrapper.find(Button).first().props().disabled).to.be.false;

    // Submit again
    wrapper.find(Button).first().props().onPress({} as any);
    expect(onSubmit).to.have.property('callCount', 2);
    expect(onSubmit.args[1][0].email).to.equal('email@test.com');
    expect(onSubmit.args[1][0].password).to.equal('password');

    // Test press of reset button
    wrapper.find(Button).at(1).props().onPress({} as any);
    expect(onReset).to.have.property('callCount', 1);

    // Test press of reset button
    wrapper.find(Button).at(2).props().onPress({} as any);
    expect(onRegister).to.have.property('callCount', 1);
  });

  it('Tests login loading state', () => {
    // Mount loading state of login view
    const wrapper = mount<LoginViewProps>(
      <LoginView
        loading={true}
        reset={false}
        onReset={null}
        onSubmit={null}
        onRegister={null}
      />,
    );

    // All buttons should be disabled
    expect(wrapper.find(Button)).to.have.lengthOf(3);
    expect(wrapper.find(Button).first().props().disabled).to.be.true;
    expect(wrapper.find(Button).first().props().title).to.equal('Logging in');
    expect(wrapper.find(Button).at(1).props().disabled).to.be.true;
    expect(wrapper.find(Button).at(2).props().disabled).to.be.true;
  });

  it('Tests password reset render and submission handler', async () => {
    const onSubmit = sinon.spy();
    const onReset = sinon.spy();

    // Mount reset state of login view
    const wrapper = mount<LoginViewProps>(
      <LoginView
        loading={false}
        reset={true}
        onReset={onReset}
        onSubmit={onSubmit}
        onRegister={null}
      />,
    );

    // Test render
    expect(wrapper.find(Button)).to.have.lengthOf(2);
    expect(wrapper.find(Button).first().props().disabled).to.be.true;
    expect(wrapper.find(Button).first().props().title).to.equal('Request Reset');
    expect(wrapper.find('Input')).to.have.lengthOf(1);
    expect(wrapper.find(TextInput)).to.have.lengthOf(1);
    expect(wrapper.find('Form')).to.have.lengthOf(1);

    // Test submit immediately
    wrapper.find(Button).first().props().onPress({} as any);
    expect(onSubmit).to.have.property('callCount', 1);
    expect(onSubmit.args[0][0].email).to.equal('');

    // Test text change
    wrapper.find(TextInput).at(0).props().onChangeText('email@test.com');
    wrapper.update();

    // Form should now be valid
    expect(wrapper.find(Button).first().props().disabled).to.be.false;

    // Submit again
    wrapper.find(Button).first().props().onPress({} as any);
    expect(onSubmit).to.have.property('callCount', 2);
    expect(onSubmit.args[1][0].email).to.equal('email@test.com');
  });

  it('Tests reset loading state', () => {
    // Mount loading state of login view
    const wrapper = mount<LoginViewProps>(
      <LoginView
        loading={true}
        reset={true}
        onReset={null}
        onSubmit={null}
        onRegister={null}
      />,
    );

    // Button should be disabled
    expect(wrapper.find(Button)).to.have.lengthOf(2);
    expect(wrapper.find(Button).first().props().disabled).to.be.true;
    expect(wrapper.find(Button).first().props().title).to.equal('Requesting Reset');
  });

  it('Tests login error', async () => {
    const mocks = [
      {
        request: {
          query: LOGIN_MUTATION,
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
        <Login />
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

  it('Tests login success', async () => {
    const login: login_login = {
      __typename: 'AuthPayload',
      token: 'token-here',
    };

    const mocks = [
      {
        request: {
          query: LOGIN_MUTATION,
          variables: {
            email: '',
            password: '',
          },
        },
        result: {
          data: {
            login,
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
        <Login />
      </MockedProvider>,
    );

    // Submit form
    wrapper.find(Button).first().props().onPress({} as any);

    // Wait for response
    await wait(0);

    // Check that the response is stored
    const token = await store(LOCAL_AUTH_KEY);
    expect(token).to.deep.equal(login.token);
  });

  it('Tests reset success', async () => {
    const mocks = [
      {
        request: {
          query: REQUEST_PASSWORD_RESET_MUTATION,
          variables: {
            email: '',
          },
        },
        result: {
          data: {
            requestPasswordReset: true,
          },
        },
      },
    ];

    const wrapper = mount(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <Login />
      </MockedProvider>,
    );

    // Reset Password button
    wrapper.find(Button).at(1).props().onPress({} as any);
    wrapper.update();
    expect(wrapper.find(LoginView).props().reset).to.be.true;

    // Submit
    wrapper.find(Button).at(0).props().onPress({} as any);

    // Wait for response
    await wait(0);
  });
});
