import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import sinon from 'sinon';
import { ApolloProvider } from 'react-apollo';
import Register from './Register';
import mockClient from '../../API/utils/mockClient';
import PushNotifications from '../../modules/PushNotifications';
import { getAccessToken } from '../../ApolloClient/resolvers/query/getAccessToken/__generated__/getAccessToken';
import { GET_ACCESS_TOKEN_QUERY } from '../../ApolloClient/resolvers/query/getAccessToken/getAccessTokenQuery';
import { getSelf } from '../../API/query/getSelf/__generated__/getSelf';
import { GET_SELF_QUERY } from '../../API/query/getSelf/getSelf';
import RegisterView from './RegisterView';
import * as ScreenUtilsModule from '../../screens/utils';
import InAppPurchases from '../../modules/InAppPurchases';
import OnboardingWelcomeScreen from '../../screens/OnboardingScreens/OnboardingWelcomeScreen/OnboardingWelcomeScreen';
import { store } from '../../utils/storage';
import * as ToastModule from '../../modules/Toast';

describe('<Register />', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = sinon.createSandbox();
  let pushNotificationInitSpy = sandbox.stub(PushNotifications, 'init');
  let inAppPurchasesInitSpy = sandbox.stub(InAppPurchases, 'init');
  let toastSpy = sandbox.stub(ToastModule, 'pushToast');
  let pushScreenSpy = sandbox.stub(ScreenUtilsModule, 'pushScreen');
  let goToRequireUpdateScreenSpy = sandbox.stub(ScreenUtilsModule, 'goToRequireUpdateScreen');

  afterEach(() => {
    sandbox.restore();

    pushNotificationInitSpy = sandbox.stub(PushNotifications, 'init');
    inAppPurchasesInitSpy = sandbox.stub(InAppPurchases, 'init');
    toastSpy = sandbox.stub(ToastModule, 'pushToast');
    pushScreenSpy = sandbox.stub(ScreenUtilsModule, 'pushScreen');
    goToRequireUpdateScreenSpy = sandbox.stub(ScreenUtilsModule, 'goToRequireUpdateScreen');
  });

  it('should succeed', async () => {
    const client = mockClient();

    const wrapper = mount(
      <ApolloProvider client={client}>
        <Register />
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

    expect(pushScreenSpy.args[0][1]).to.equal(OnboardingWelcomeScreen);
    expect(pushScreenSpy.args[0][2]).to.be.empty;

    // Update - button should not return to state as no errors
    wrapper.update();
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().loading).to.be.true;
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

    // Pushnotifications should have been initialised
    expect(pushNotificationInitSpy.callCount).to.equal(1);

    // Pushnotifications should have been initialised
    expect(inAppPurchasesInitSpy.callCount).to.equal(1);

    // Should goToRequireUpdateScreen
    expect(goToRequireUpdateScreenSpy.callCount).to.equal(1);

    // Should not have called OnboardingWelcomeScreen
    expect(pushScreenSpy.callCount).to.equal(0);
  });
});
