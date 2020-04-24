import { TextInput, Button } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { ApolloProvider } from 'react-apollo';
import { useToast } from 'mbp-components-rn-toast';
import SplashScreen from 'react-native-splash-screen';
import Login from './Login';
import mockClient from '../../API/utils/mockClient';
import PushNotifications from '../../modules/PushNotifications';
import { getAccessToken } from '../../ApolloClient/resolvers/query/getAccessToken/__generated__/getAccessToken';
import { GET_ACCESS_TOKEN_QUERY } from '../../ApolloClient/resolvers/query/getAccessToken/getAccessTokenQuery';
import { getSelf } from '../../API/query/getSelf/__generated__/getSelf';
import { GET_SELF_QUERY } from '../../API/query/getSelf/getSelf';
import LoginView from './LoginView';
import * as ScreenUtilsModule from '../../screens/utils';
import InAppPurchases from '../../modules/InAppPurchases';

describe('<Login >', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = sinon.createSandbox();
  let pushNotificationInitSpy = sandbox.stub(PushNotifications, 'init');
  let pushNotificationDisconnectSpy = sandbox.stub(PushNotifications, 'disconnect');
  let inAppPurchasesInitSpy = sandbox.stub(InAppPurchases, 'init');
  let inAppPurchasesDisconnectSpy = sandbox.stub(InAppPurchases, 'disconnect');
  let toastSpy = sandbox.stub(useToast(), 'push');
  let splashScreenSpy = sandbox.stub(SplashScreen, 'hide');
  let goHomeSpy = sandbox.stub(ScreenUtilsModule, 'goHome');
  let goToRequireUpdateScreenSpy = sandbox.stub(ScreenUtilsModule, 'goToRequireUpdateScreen');

  afterEach(() => {
    sandbox.restore();

    pushNotificationInitSpy = sandbox.stub(PushNotifications, 'init');
    pushNotificationDisconnectSpy = sandbox.stub(PushNotifications, 'disconnect');
    inAppPurchasesInitSpy = sandbox.stub(InAppPurchases, 'init');
    inAppPurchasesDisconnectSpy = sandbox.stub(InAppPurchases, 'disconnect');
    toastSpy = sandbox.stub(useToast(), 'push');
    splashScreenSpy = sandbox.stub(SplashScreen, 'hide');
    goHomeSpy = sandbox.stub(ScreenUtilsModule, 'goHome');
    goToRequireUpdateScreenSpy = sandbox.stub(ScreenUtilsModule, 'goToRequireUpdateScreen');
  });

  it('should succeed', async () => {
    const client = mockClient();

    const wrapper = mount(
      <ApolloProvider client={client}>
        <Login />
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
    expect(pushNotificationInitSpy.callCount).to.equal(1);

    // Pushnotifications should have been initialised
    expect(inAppPurchasesInitSpy.callCount).to.equal(1);

    // Should have goneHome
    expect(goHomeSpy.callCount).to.equal(1);

    // Update - button should not return to enabled as no errors
    wrapper.update();
    expect(wrapper.find(Button).first().props().disabled).to.be.true;
  });

  it('should remove token on mount, should toast, disconnect listeners and hide splash screen', async () => {
    const client = mockClient();

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
        <Login toastMessage="test" />
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


    /**
     * Should toast if prop passed
     */

    expect(toastSpy.callCount).to.equal(1);


    /**
     * Should disconnect pushNotifications and inAppPurchases
     */
    expect(pushNotificationDisconnectSpy.callCount).to.equal(1);
    expect(inAppPurchasesDisconnectSpy.callCount).to.equal(1);


    /**
     * Should hide splashscreen
     */

    expect(splashScreenSpy.callCount).to.equal(1);
  });

  it('should fail to login', async () => {
    /**
     * Create mock client and force login to error
     */
    const client = mockClient({
      Mutation: () => ({
        login: () => {
          throw new Error();
        },
      }),
    });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <Login />
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

    // LoginView.loading is now false
    expect(wrapper.find(LoginView).props().loading).to.be.false;

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
        <Login />
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

    // LoginView.loading is now false
    expect(wrapper.find(LoginView).props().loading).to.be.false;

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
        <Login />
      </ApolloProvider>,
    );

    // Test text change
    wrapper.find(TextInput).at(0).props().onChangeText('email@test.com');
    wrapper.find(TextInput).at(1).props().onChangeText('password');
    await wait(0);
    wrapper.update();

    // Submit
    await wrapper.find(Button).first().props().onPress({
      preventDefault: jest.fn,
      persist: jest.fn,
    } as any);

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // Pushnotifications should have been initialised
    expect(pushNotificationInitSpy.callCount).to.equal(1);

    // Pushnotifications should have been initialised
    expect(inAppPurchasesInitSpy.callCount).to.equal(1);

    // Should goToRequireUpdateScreen
    expect(goToRequireUpdateScreenSpy.callCount).to.equal(1);

    // Should not have goneHome
    expect(goHomeSpy.callCount).to.equal(0);
  });
});
