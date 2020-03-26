import { TextInput, Button } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from '@apollo/react-testing';
import { useToast } from 'mbp-components-rn-toast';
import Login from './Login';
import mockClient from '../../API/utils/mockClient';
import PushNotifications from '../../modules/PushNotifications';
import { getAccessToken } from '../../ApolloClient/resolvers/query/getAccessToken/__generated__/getAccessToken';
import { GET_ACCESS_TOKEN_QUERY } from '../../ApolloClient/resolvers/query/getAccessToken/getAccessTokenQuery';
import { getSelf } from '../../API/query/getSelf/__generated__/getSelf';
import { GET_SELF_QUERY } from '../../API/query/getSelf/getSelf';
import { LOGIN_MUTATION } from '../../API/mutation/login/login';
import LoginView from './LoginView';

const client = mockClient();

describe('<Login >', () => {
  const toastStub = sinon.spy(useToast(), 'push');

  afterEach(() => {
    toastStub.restore();
  });

  it('should succeed', async () => {
    const wrapper = mount(
      <ApolloProvider client={client}>
        <Login />
      </ApolloProvider>,
    );

    // Define Spies
    const pushNotificationInitSpy = sinon.spy(PushNotifications, 'init');

    // Test password is secure
    expect(wrapper.find(TextInput).at(1).props().secureTextEntry).to.equal(true);

    // Login Button is disabled as default
    expect(wrapper.find(Button).first().props().disabled).to.be.true;

    // Test text change
    wrapper.find(TextInput).at(0).props().onChangeText('email@test.com');
    wrapper.find(TextInput).at(1).props().onChangeText('password');
    wrapper.update();

    // Form should now be valid
    expect(wrapper.find(Button).first().props().disabled).to.be.false;

    // Submit and wait for response and update
    wrapper.find(Button).first().props().onPress({} as any);
    await wait(0);
    wrapper.update();

    // Button is now disabled as loading
    expect(wrapper.find(Button).first().props().disabled).to.be.true;

    // Check that the access token has been stored
    const gat = client.readQuery<getAccessToken>({
      query: GET_ACCESS_TOKEN_QUERY,
    });
    expect(typeof gat.getAccessToken).to.equal('string');

    // Get self should now be cached
    const gs = client.readQuery<getSelf>({
      query: GET_SELF_QUERY,
    });
    expect(typeof gs.getSelf.id).to.equal('string');

    // Pushnotifications should have been initialised
    expect(pushNotificationInitSpy.called).to.be.true;

    // Update - button should not return to enabled as no errors
    wrapper.update();
    expect(wrapper.find(Button).first().props().disabled).to.be.true;
  });

  it('should remove token on mount', async () => {
    /**
     * Before mount add token
     */
    client.writeQuery<getAccessToken>({
      query: GET_ACCESS_TOKEN_QUERY,
      data: {
        getAccessToken: 'token',
      },
    });


    /**
     * Mount component
     */
    mount(
      <ApolloProvider client={client}>
        <Login />
      </ApolloProvider>,
    );


    /**
     * Mount should logout
     */

    // Wait for async to complete
    await wait(0);

    // If empty will throw
    try {
      client.readQuery<getAccessToken>({
        query: GET_ACCESS_TOKEN_QUERY,
      });
      expect.fail();
    } catch (e) {
      assert.isOk(true);
    }
  });

  it('should fail to login', async () => {
    const toastSpy = sinon.spy(useToast(), 'push');

    const mocks = [{
      request: {
        query: LOGIN_MUTATION,
      },
      error: new Error(),
    }];

    const wrapper = mount(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <Login />
      </MockedProvider>,
    );

    // Submit and update
    wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

    // LoginView.loading is now true
    expect(wrapper.find(LoginView).props().loading).to.be.true;

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // LoginView.loading is now false
    expect(wrapper.find(LoginView).props().loading).to.be.false;

    // Toast should have been executed
    expect(toastSpy.called).to.be.true;
  });

  it('should fail getSelf', async () => {
    const toastSpy = sinon.spy(useToast(), 'push');

    const mocks = [{
      request: {
        query: GET_SELF_QUERY,
      },
      error: new Error(),
    }];

    const wrapper = mount(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <Login />
      </MockedProvider>,
    );

    // Submit and update
    wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

    // LoginView.loading is now true
    expect(wrapper.find(LoginView).props().loading).to.be.true;

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // LoginView.loading is now false
    expect(wrapper.find(LoginView).props().loading).to.be.false;

    // Toast should have been executed
    expect(toastSpy.called).to.be.true;
  });
});
