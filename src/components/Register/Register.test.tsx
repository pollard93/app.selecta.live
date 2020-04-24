import { Button, TextInput } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import sinon from 'sinon';
import { ApolloProvider } from 'react-apollo';
import { useToast } from 'mbp-components-rn-toast';
import Register from './Register';
import mockClient from '../../API/utils/mockClient';
import PushNotifications from '../../modules/PushNotifications';
import { getAccessToken } from '../../ApolloClient/resolvers/query/getAccessToken/__generated__/getAccessToken';
import { GET_ACCESS_TOKEN_QUERY } from '../../ApolloClient/resolvers/query/getAccessToken/getAccessTokenQuery';
import { getSelf } from '../../API/query/getSelf/__generated__/getSelf';
import { GET_SELF_QUERY } from '../../API/query/getSelf/getSelf';
import RegisterView from './RegisterView';
import * as ScreenUtilsModule from '../../screens/utils';

describe('<Register />', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = sinon.createSandbox();
  let pushNotificationInitSpy = sandbox.spy(PushNotifications, 'init');
  let toastSpy = sandbox.spy(useToast(), 'push');
  let goHomeSpy = sandbox.spy(ScreenUtilsModule, 'goHome');
  let goToRequireUpdateScreenSpy = sandbox.spy(ScreenUtilsModule, 'goToRequireUpdateScreen');

  afterEach(() => {
    sandbox.restore();

    pushNotificationInitSpy = sandbox.spy(PushNotifications, 'init');
    toastSpy = sandbox.spy(useToast(), 'push');
    goHomeSpy = sandbox.spy(ScreenUtilsModule, 'goHome');
    goToRequireUpdateScreenSpy = sandbox.spy(ScreenUtilsModule, 'goToRequireUpdateScreen');
  });

  it('should succeed', async () => {
    const client = mockClient();

    const wrapper = mount(
      <ApolloProvider client={client}>
        <Register />
      </ApolloProvider>,
    );

    // Test password is secure
    expect(wrapper.find(TextInput).at(1).props().secureTextEntry).to.equal(true);

    // Login Button is disabled as default
    expect(wrapper.find(Button).first().props().disabled).to.be.true;

    // Test text change
    wrapper.find(TextInput).at(0).props().onChangeText('email@test.com');
    wrapper.find(TextInput).at(1).props().onChangeText('password');
    await wait(0);
    wrapper.update();

    // Form should now be valid
    expect(wrapper.find(Button).first().props().disabled).to.be.false;

    // Submit and wait for response and update
    await wrapper.find(Button).first().props().onPress({
      preventDefault: jest.fn,
      persist: jest.fn,
    } as any);
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

    // Should have goneHome
    expect(goHomeSpy.callCount).to.equal(1);

    // Update - button should not return to enabled as no errors
    wrapper.update();
    expect(wrapper.find(Button).first().props().disabled).to.be.true;
  });

  it('should fail to register', async () => {
    /**
     * Create mock client and force register to error
     */
    const client = mockClient({
      Mutation: () => ({
        register: () => {
          throw new Error();
        },
      }),
    });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <Register />
      </ApolloProvider>,
    );

    // Test text change
    wrapper.find(TextInput).at(0).props().onChangeText('email@test.com');
    wrapper.find(TextInput).at(1).props().onChangeText('password');
    wrapper.update();

    // Submit and update
    await wrapper.find(Button).first().props().onPress({
      preventDefault: jest.fn,
      persist: jest.fn,
    } as any);

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // RegisterView.loading is now false
    expect(wrapper.find(RegisterView).props().loading).to.be.false;

    // Toast should have been executed
    expect(toastSpy.callCount).to.equal(1);
  });

  it('should fail getSelf', async () => {
    /**
     * Create mock client and force getSelf to error
     */
    const client = mockClient({
      Query: () => ({
        getSelf: () => {
          throw new Error();
        },
      }),
    });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <Register />
      </ApolloProvider>,
    );

    // Test text change
    wrapper.find(TextInput).at(0).props().onChangeText('email@test.com');
    wrapper.find(TextInput).at(1).props().onChangeText('password');
    wrapper.update();

    // Submit and update
    await wrapper.find(Button).first().props().onPress({
      preventDefault: jest.fn,
      persist: jest.fn,
    } as any);

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // RegisterView.loading is now false
    expect(wrapper.find(RegisterView).props().loading).to.be.false;

    // Toast should have been executed
    expect(toastSpy.callCount).to.equal(1);
  });

  it('should goToRequireUpdateScreen if getSelf.requiresUpdate is true', async () => {
    /**
     * Create mock client and force getSelf.requiresUpdate to be true
     */
    const client = mockClient({
      Query: () => ({
        getSelf: () => ({
          requiresUpdate: {
            appStoreUrl: '',
            playStoreUrl: '',
          },
        }),
      }),
    });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <Register />
      </ApolloProvider>,
    );

    // Test text change
    wrapper.find(TextInput).at(0).props().onChangeText('email@test.com');
    wrapper.find(TextInput).at(1).props().onChangeText('password');
    wrapper.update();

    // Submit and update
    await wrapper.find(Button).first().props().onPress({
      preventDefault: jest.fn,
      persist: jest.fn,
    } as any);

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // Should goToRequireUpdateScreen
    expect(goToRequireUpdateScreenSpy.callCount).to.equal(1);

    // Should not have goneHome
    expect(goHomeSpy.callCount).to.equal(0);
  });
});
