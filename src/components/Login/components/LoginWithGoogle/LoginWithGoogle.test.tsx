import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import sinon from 'sinon';
import { GoogleSignin } from '@react-native-community/google-signin';
import { ApolloProvider } from 'react-apollo';
import { useToast } from 'mbp-components-rn-toast';
import mockClient from '../../../../API/utils/mockClient';
import LoginWithGoogle from './LoginWithGoogle';
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

describe('<LoginWithGoogle />', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = sinon.createSandbox();
  let configureSpy = sandbox.spy(GoogleSignin, 'configure');
  let hasPlayServicesSpy = sandbox.spy(GoogleSignin, 'hasPlayServices');
  let signInSpy = sandbox.spy(GoogleSignin, 'signIn');
  let getTokensSpy = sandbox.spy(GoogleSignin, 'getTokens');
  let revokeAccessSpy = sandbox.spy(GoogleSignin, 'revokeAccess');
  let signOutSpy = sandbox.spy(GoogleSignin, 'signOut');
  let pushNotificationInitSpy = sandbox.stub(PushNotifications, 'init');
  let inAppPurchasesInitSpy = sandbox.stub(InAppPurchases, 'init');
  let toastSpy = sandbox.stub(useToast(), 'push');
  let goHomeSpy = sandbox.stub(ScreenUtilsModule, 'goHome');
  let goToRequireUpdateScreenSpy = sandbox.stub(ScreenUtilsModule, 'goToRequireUpdateScreen');
  let pushScreenV2Spy = sandbox.stub(ScreenUtilsModule, 'pushScreenV2');

  afterEach(() => {
    sandbox.restore();

    configureSpy = sandbox.spy(GoogleSignin, 'configure');
    hasPlayServicesSpy = sandbox.spy(GoogleSignin, 'hasPlayServices');
    signInSpy = sandbox.spy(GoogleSignin, 'signIn');
    getTokensSpy = sandbox.spy(GoogleSignin, 'getTokens');
    revokeAccessSpy = sandbox.spy(GoogleSignin, 'revokeAccess');
    signOutSpy = sandbox.spy(GoogleSignin, 'signOut');
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
        <LoginWithGoogle buttonText="text" />
      </ApolloProvider>,
    );

    // Test configure was called on mount
    expect(configureSpy.called).to.be.true;

    // Button is not disabled
    expect(wrapper.find(Button).first().props().disabled).to.be.false;

    // Submit form
    await wrapper.find(Button).first().props().onPress({} as any);

    // Test google packages are called
    expect(hasPlayServicesSpy.called).to.be.true;
    expect(signInSpy.called).to.be.true;
    expect(getTokensSpy.called).to.be.true;

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // Button is now disabled
    expect(wrapper.find(Button).first().props().disabled).to.be.true;

    // Google should now be signed out
    expect(revokeAccessSpy.called).to.be.true;
    expect(signOutSpy.called).to.be.true;

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
        <LoginWithGoogle buttonText="text" />
      </ApolloProvider>,
    );

    // Submit and update
    wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // Button.disabled is now false
    expect(wrapper.find(Button).props().disabled).to.be.false;

    // Google should be signed out
    expect(signOutSpy.callCount).to.equal(1);

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
        <LoginWithGoogle buttonText="text" />
      </ApolloProvider>,
    );

    // Submit and update
    wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // Button.disabled is now false
    expect(wrapper.find(Button).props().disabled).to.be.false;

    // Google should be signed out
    expect(signOutSpy.callCount).to.equal(1);

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
        <LoginWithGoogle buttonText="text" />
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
        <LoginWithGoogle buttonText="text" />
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
