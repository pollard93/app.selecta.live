import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import sinon from 'sinon';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { ApolloProvider } from 'react-apollo';
import { useToast } from 'mbp-components-rn-toast';
import mockClient from '../../../../API/utils/mockClient';
import LoginWithFacebook from './LoginWithFacebook';
import { GET_ACCESS_TOKEN_QUERY } from '../../../../ApolloClient/resolvers/query/getAccessToken/getAccessTokenQuery';
import { getAccessToken } from '../../../../ApolloClient/resolvers/query/getAccessToken/__generated__/getAccessToken';
import PushNotifications from '../../../../modules/PushNotifications';
import { getSelf } from '../../../../API/query/getSelf/__generated__/getSelf';
import { GET_SELF_QUERY } from '../../../../API/query/getSelf/getSelf';
import * as ScreenUtilsModule from '../../../../screens/utils';
import InAppPurchases from '../../../../modules/InAppPurchases';
import { STACK } from '../../../../screens/utils/interfaces';
import OnboardingWelcomeScreen from '../../../../screens/OnboardingScreens/OnboardingWelcomeScreen/OnboardingWelcomeScreen';
import Button from '../../../UI/Button/Button';

describe('<LoginWithFacebook />', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = sinon.createSandbox();
  let loginWithPermissionsSpy = sandbox.spy(LoginManager as any, 'logInWithPermissions');
  let logoutSpy = sandbox.spy(LoginManager as any, 'logOut');
  let getCurrentAccessTokenSpy = sandbox.spy(AccessToken, 'getCurrentAccessToken');
  let pushNotificationInitSpy = sandbox.stub(PushNotifications, 'init');
  let inAppPurchasesInitSpy = sandbox.stub(InAppPurchases, 'init');
  let toastSpy = sandbox.stub(useToast(), 'push');
  let goHomeSpy = sandbox.stub(ScreenUtilsModule, 'goHome');
  let goToRequireUpdateScreenSpy = sandbox.stub(ScreenUtilsModule, 'goToRequireUpdateScreen');
  let pushScreenV2Spy = sandbox.stub(ScreenUtilsModule, 'pushScreenV2');

  afterEach(() => {
    sandbox.restore();

    loginWithPermissionsSpy = sandbox.spy(LoginManager as any, 'logInWithPermissions');
    logoutSpy = sandbox.spy(LoginManager as any, 'logOut');
    getCurrentAccessTokenSpy = sandbox.spy(AccessToken, 'getCurrentAccessToken');
    pushNotificationInitSpy = sandbox.stub(PushNotifications, 'init');
    inAppPurchasesInitSpy = sandbox.stub(InAppPurchases, 'init');
    toastSpy = sandbox.stub(useToast(), 'push');
    goHomeSpy = sandbox.stub(ScreenUtilsModule, 'goHome');
    goToRequireUpdateScreenSpy = sandbox.stub(ScreenUtilsModule, 'goToRequireUpdateScreen');
    pushScreenV2Spy = sandbox.stub(ScreenUtilsModule, 'pushScreenV2');
  });

  it('should succeed', async () => {
    const client = mockClient();

    const wrapper = mount(
      <ApolloProvider client={client}>
        <LoginWithFacebook buttonText="text" />
      </ApolloProvider>,
    );

    // Button is not disabled
    expect(wrapper.find(Button).first().props().disabled).to.be.false;

    // Submit form
    await wrapper.find(Button).first().props().onPress({} as any);

    // Test facebook packages are called
    expect(loginWithPermissionsSpy.called).to.be.true;
    expect(loginWithPermissionsSpy.args[0][0]).to.deep.equal(['public_profile', 'email']);

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // Current access token called
    expect(getCurrentAccessTokenSpy.called).to.be.true;

    // Button is now disabled
    expect(wrapper.find(Button).first().props().disabled).to.be.true;

    // Facebook should now be signed out
    expect(logoutSpy.called).to.be.true;

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

  it('should fail to loginWithSocial', async () => {
    /**
     * Create mock client and force loginSocial to error
     */
    const client = mockClient({
      Mutation: () => ({
        loginWithSocial: () => {
          throw new Error();
        },
      }),
    });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <LoginWithFacebook buttonText="text" />
      </ApolloProvider>,
    );

    // Submit and update
    wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // Button is not disabled as loading is false
    expect(wrapper.find(Button).props().disabled).to.be.false;

    // Facebook should now be signed out
    expect(logoutSpy.callCount).to.equal(1);

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
        <LoginWithFacebook buttonText="text" />
      </ApolloProvider>,
    );

    // Submit and update
    wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // Button is not disabled as loading is false
    expect(wrapper.find(Button).props().disabled).to.be.false;

    // Facebook should now be signed out
    expect(logoutSpy.callCount).to.equal(1);

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
        <LoginWithFacebook buttonText="text" />
      </ApolloProvider>,
    );

    // Submit and update
    wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

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

  it('should go to OnboardingWelcomeScreen if getSelf.name is null', async () => {
    /**
     * Create mock client and force getSelf.requiresUpdate to be true
     */
    const client = mockClient({
      Query: () => ({
        getSelf: () => ({
          requiresUpdate: null,
          name: null,
        }),
      }),
    });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <LoginWithFacebook buttonText="text" />
      </ApolloProvider>,
    );

    // Submit form
    await wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // Should have gone to OnboardingWelcomeScreen
    expect(pushScreenV2Spy.callCount).to.equal(1);
    expect(pushScreenV2Spy.args[0][0]).to.equal(STACK.ONBOARDING);
    expect(pushScreenV2Spy.args[0][1]).to.equal(OnboardingWelcomeScreen);
    expect(pushScreenV2Spy.args[0][2]).to.be.empty;

    // Should not have goneHome
    expect(goHomeSpy.callCount).to.equal(0);
  });
});
