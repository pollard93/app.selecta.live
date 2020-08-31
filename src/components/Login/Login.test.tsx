import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { ApolloProvider } from 'react-apollo';
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
import RequestPasswordResetScreen from '../../screens/RequestPasswordResetScreen/RequestPasswordResetScreen';
import RegisterScreen from '../../screens/RegisterScreen/RegisterScreen';
import OnboardingWelcomeScreen from '../../screens/OnboardingScreens/OnboardingWelcomeScreen/OnboardingWelcomeScreen';
import { store } from '../../utils/storage';
import * as ToastModule from '../../modules/Toast';

describe('<Login >', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = sinon.createSandbox();
  let pushNotificationInitSpy = sandbox.stub(PushNotifications, 'init');
  let inAppPurchasesInitSpy = sandbox.stub(InAppPurchases, 'init');
  let toastSpy = sandbox.stub(ToastModule, 'pushToast');
  let splashScreenSpy = sandbox.stub(SplashScreen, 'hide');
  let goHomeSpy = sandbox.stub(ScreenUtilsModule, 'goHome');
  let pushScreenSpy = sandbox.stub(ScreenUtilsModule, 'pushScreen');
  let goToRequireUpdateScreenSpy = sandbox.stub(ScreenUtilsModule, 'goToRequireUpdateScreen');

  afterEach(() => {
    sandbox.restore();

    pushNotificationInitSpy = sandbox.stub(PushNotifications, 'init');
    inAppPurchasesInitSpy = sandbox.stub(InAppPurchases, 'init');
    toastSpy = sandbox.stub(ToastModule, 'pushToast');
    splashScreenSpy = sandbox.stub(SplashScreen, 'hide');
    goHomeSpy = sandbox.stub(ScreenUtilsModule, 'goHome');
    pushScreenSpy = sandbox.stub(ScreenUtilsModule, 'pushScreen');
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
    expect(wrapper.findWhere((n) => n.prop('testID') === 'password').first().props().secureTextEntry).to.equal(true);

    // Login Button is disabled as default
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().disabled).to.be.true;

    // Test text change and validate form
    wrapper.findWhere((n) => n.prop('testID') === 'email').first().props().onChangeText('email@test.com');
    wrapper.findWhere((n) => n.prop('testID') === 'email').first().props().onBlur();
    wrapper.findWhere((n) => n.prop('testID') === 'password').first().props().onChangeText('ValidPassword1!');
    wrapper.findWhere((n) => n.prop('testID') === 'password').first().props().onBlur();
    await wait(0);
    wrapper.update();

    // Form should now be valid
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().disabled).to.be.false;

    // Submit and wait for response and update
    await wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({
      preventDefault: jest.fn,
      persist: jest.fn,
    } as any);
    await wait(0);
    wrapper.update();

    // Button is now be loading
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().loading).to.be.true;

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

    // GetSelf result should be stored in async storage
    const gsc = await store('getSelf');
    expect(gsc).to.not.be.empty;

    // Pushnotifications should have been initialised
    expect(pushNotificationInitSpy.callCount).to.equal(1);

    // Pushnotifications should have been initialised
    expect(inAppPurchasesInitSpy.callCount).to.equal(1);

    // Should have goneHome
    expect(goHomeSpy.callCount).to.equal(1);

    // Update - button should not return to enabled as no errors
    wrapper.update();
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().loading).to.be.true;
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
    wrapper.findWhere((n) => n.prop('testID') === 'email').first().props().onChangeText('email@test.com');
    wrapper.findWhere((n) => n.prop('testID') === 'password').first().props().onChangeText('ValidPassword1!');
    wrapper.update();

    // Submit and update
    await wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({
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
    wrapper.findWhere((n) => n.prop('testID') === 'email').first().props().onChangeText('email@test.com');
    wrapper.findWhere((n) => n.prop('testID') === 'password').first().props().onChangeText('ValidPassword1!');
    wrapper.update();

    // Submit and update
    await wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({
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
    wrapper.findWhere((n) => n.prop('testID') === 'email').first().props().onChangeText('email@test.com');
    wrapper.findWhere((n) => n.prop('testID') === 'password').first().props().onChangeText('ValidPassword1!');
    await wait(0);
    wrapper.update();

    // Submit
    await wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({
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

  it('should go to OnboardingWelcomeScreen if getSelf.username is null', async () => {
    /**
     * Create mock client and force getSelf.requiresUpdate to be true
     */
    const client = mockClient({
      Query: () => ({
        getSelf: () => ({
          requiresUpdate: null,
          username: null,
        }),
      }),
    });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <Login />
      </ApolloProvider>,
    );

    // Test text change
    wrapper.findWhere((n) => n.prop('testID') === 'email').first().props().onChangeText('email@test.com');
    wrapper.findWhere((n) => n.prop('testID') === 'password').first().props().onChangeText('ValidPassword1!');
    await wait(0);
    wrapper.update();

    // Submit
    await wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({
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

    // Should have gone to OnboardingWelcomeScreen
    expect(pushScreenSpy.callCount).to.equal(1);
    expect(pushScreenSpy.args[0][1]).to.equal(OnboardingWelcomeScreen);
    expect(pushScreenSpy.args[0][2]).to.be.empty;

    // Should not have goneHome
    expect(goHomeSpy.callCount).to.equal(0);
  });

  it('should succeed in calling functional props', async () => {
    const client = mockClient();

    const wrapper = mount(
      <ApolloProvider client={client}>
        <Login />
      </ApolloProvider>,
    );

    // Update email
    wrapper.findWhere((n) => n.prop('testID') === 'email').first().props().onChangeText('email@test.com');
    await wait(0);
    wrapper.update();

    // Call onReset
    await wrapper.findWhere((n) => n.prop('testID') === 'reset').first().props().onPress({
      preventDefault: jest.fn,
      persist: jest.fn,
    } as any);

    // Should have gone to RequestPasswordResetScreen
    expect(pushScreenSpy.callCount).to.equal(1);
    expect(pushScreenSpy.args[0][1]).to.equal(RequestPasswordResetScreen);
    expect((pushScreenSpy.args[0][2] as any).defaultEmailValue).to.equal('email@test.com');
    expect((pushScreenSpy.args[0][2] as any).onCompletion).to.be.instanceOf(Function);

    // Call onRegister
    await wrapper.findWhere((n) => n.prop('testID') === 'register').first().props().onPress({
      preventDefault: jest.fn,
      persist: jest.fn,
    } as any);

    // Should have gone to RegisterScreen
    expect(pushScreenSpy.callCount).to.equal(2);
    expect(pushScreenSpy.args[1][1]).to.equal(RegisterScreen);
  });
});
