import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import sinon from 'sinon';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import mockClient from '../../API/utils/mockClient';
import PushNotifications from '../../modules/PushNotifications';
import { getAccessToken } from '../../ApolloClient/resolvers/query/getAccessToken/__generated__/getAccessToken';
import { GET_ACCESS_TOKEN_QUERY } from '../../ApolloClient/resolvers/query/getAccessToken/getAccessTokenQuery';
import InitScreen from './InitScreen';
import * as AClientModule from '../../ApolloClient';
import * as ScreenUtilsModule from '../utils';
import { GET_CHANNEL_ACCESS_TOKEN_QUERY } from '../../ApolloClient/resolvers/query/getChannelAccessToken/getChannelAccessTokenQuery';
import { getChannelAccessToken } from '../../ApolloClient/resolvers/query/getChannelAccessToken/__generated__/getChannelAccessToken';
import InAppPurchases from '../../modules/InAppPurchases';
import * as SafeAreaInsetsModule from '../../modules/SafeAreaInsets/SafeAreaInsets';
import { store } from '../../utils/storage';
import { GET_SELF_QUERY } from '../../API/query/getSelf/getSelf';
import { getSelf } from '../../API/query/getSelf/__generated__/getSelf';

describe('<InitScreen >', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = sinon.createSandbox();
  let pushNotificationInitSpy = sandbox.stub(PushNotifications, 'init');
  let inAppPurchasesInitSpy = sandbox.stub(InAppPurchases, 'init');
  let getTokenSpy = sandbox.spy(AClientModule, 'getToken');
  let getChannelTokenSpy = sandbox.spy(AClientModule, 'getChannelToken');
  let goToLoginSpy = sandbox.spy(ScreenUtilsModule, 'goToLogin');
  let goHomeSpy = sandbox.spy(ScreenUtilsModule, 'goHome');
  let goToChannelStackSpy = sandbox.spy(ScreenUtilsModule, 'goToChannelStack');
  let goToRequireUpdateScreenSpy = sandbox.spy(ScreenUtilsModule, 'goToRequireUpdateScreen');
  let goToOnboardingSpy = sandbox.stub(ScreenUtilsModule, 'goToOnboarding');
  let setSafeAreaSpy = sandbox.stub(SafeAreaInsetsModule, 'setSafeArea');

  afterEach(async () => {
    sandbox.restore();

    pushNotificationInitSpy = sandbox.stub(PushNotifications, 'init');
    inAppPurchasesInitSpy = sandbox.stub(InAppPurchases, 'init');
    getTokenSpy = sandbox.spy(AClientModule, 'getToken');
    getChannelTokenSpy = sandbox.spy(AClientModule, 'getChannelToken');
    goToLoginSpy = sandbox.spy(ScreenUtilsModule, 'goToLogin');
    goHomeSpy = sandbox.spy(ScreenUtilsModule, 'goHome');
    goToChannelStackSpy = sandbox.spy(ScreenUtilsModule, 'goToChannelStack');
    goToRequireUpdateScreenSpy = sandbox.spy(ScreenUtilsModule, 'goToRequireUpdateScreen');
    goToOnboardingSpy = sandbox.stub(ScreenUtilsModule, 'goToOnboarding');
    setSafeAreaSpy = sandbox.stub(SafeAreaInsetsModule, 'setSafeArea');

    // Clear getSelf store
    await store('getSelf', null);
  });


  /**
   * Utility to write getAccessToken query
   */
  const writeGeneralTokenToCache = (client: ApolloClient<any>) => {
    client.writeQuery<getAccessToken>({
      query: GET_ACCESS_TOKEN_QUERY,
      data: {
        getAccessToken: 'token',
      },
    });
  };


  /**
   * Utility to write getChannelAccessToken query
   */
  const writeChannelTokenToCache = (client: ApolloClient<any>) => {
    client.writeQuery<getChannelAccessToken>({
      query: GET_CHANNEL_ACCESS_TOKEN_QUERY,
      data: {
        getChannelAccessToken: 'token',
      },
    });
  };


  it('should goToLogin with no stored general token', async () => {
    const client = mockClient();

    const wrapper = mount(
      <ApolloProvider client={client}>
        <InitScreen />
      </ApolloProvider>,
    );
    wrapper.update();
    await wait(0);

    expect(getTokenSpy.callCount).to.equal(1);
    expect(goToLoginSpy.callCount).to.equal(1);

    /**
     * Get safearea should always be called
     */
    expect(global.safeAreaInsets).to.be.undefined;
    expect(setSafeAreaSpy.callCount).to.equal(1);
    expect(global.safeAreaInsets).to.not.be.null;
  });

  it('should goHome with stored general token', async () => {
    const client = mockClient();

    // Store general token
    writeGeneralTokenToCache(client);

    const wrapper = mount(
      <ApolloProvider client={client}>
        <InitScreen />
      </ApolloProvider>,
    );
    wrapper.update();
    await wait(0);

    expect(getTokenSpy.callCount).to.equal(1);
    expect(pushNotificationInitSpy.callCount).to.equal(1);
    expect(inAppPurchasesInitSpy.callCount).to.equal(1);
    expect(getChannelTokenSpy.callCount).to.equal(1);
    expect(goHomeSpy.callCount).to.equal(1);

    // Get self should now be cached
    const gs = client.readQuery<getSelf>({
      query: GET_SELF_QUERY,
    });
    expect(typeof gs.getSelf.id).to.equal('string');

    // GetSelf result should be stored in async storage
    const gss = await store('getSelf');
    expect(gss).to.not.be.empty;
  });

  it('should goToChannelStack with stored general and channel token', async () => {
    const client = mockClient();

    // Store general and channel token
    writeGeneralTokenToCache(client);
    writeChannelTokenToCache(client);

    const wrapper = mount(
      <ApolloProvider client={client}>
        <InitScreen />
      </ApolloProvider>,
    );
    wrapper.update();
    await wait(0);
    await wait(0);

    expect(getTokenSpy.callCount).to.equal(1);
    expect(pushNotificationInitSpy.callCount).to.equal(1);
    expect(getChannelTokenSpy.callCount).to.equal(1);
    expect(goToChannelStackSpy.callCount).to.equal(1);
  });

  it('should goToLogin on getSelf error and no getSelf is stored', async () => {
    /**
     * Create mock client and force getSelf to error
     */
    const client = mockClient({
      Query: () => ({
        getSelf: () => {
          throw new Error('');
        },
      }),
    });

    // Store general and channel token
    writeGeneralTokenToCache(client);

    const wrapper = mount(
      <ApolloProvider client={client}>
        <InitScreen />
      </ApolloProvider>,
    );
    wrapper.update();
    await wait(0);
    await wait(0);
    await wait(0);
    await wait(0);

    expect(getTokenSpy.callCount).to.equal(1);
    expect(goToLoginSpy.callCount).to.equal(1);
  });

  it('should goHome on getSelf error getSelf is stored', async () => {
    /**
     * Create mock client and force getSelf to error
     */
    const client = mockClient({
      Query: () => ({
        getSelf: () => {
          throw new Error('');
        },
      }),
    });

    // Store general and channel token
    writeGeneralTokenToCache(client);

    // Store getSelf
    await store('getSelf', { id: 'test', __typename: 'User' });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <InitScreen />
      </ApolloProvider>,
    );
    wrapper.update();
    await wait(0);
    await wait(0);
    await wait(0);
    await wait(0);

    expect(getTokenSpy.callCount).to.equal(1);
    expect(goHomeSpy.callCount).to.equal(1);

    // Get self should now be cached from stored value, even though getSelf errors
    const gs = client.readQuery<getSelf>({
      query: GET_SELF_QUERY,
    });
    expect(gs.getSelf.id).to.equal('test');
  });

  it('should goHome with stored general token and expired channel token', async () => {
    /**
     * Create mock client and force getChannelSelf to error
     */
    const client = mockClient({
      Query: () => ({
        getChannelSelf: () => {
          throw new Error('');
        },
      }),
    });

    // Store general and channel token
    writeGeneralTokenToCache(client);
    writeChannelTokenToCache(client);

    const wrapper = mount(
      <ApolloProvider client={client}>
        <InitScreen />
      </ApolloProvider>,
    );
    wrapper.update();
    await wait(0);
    await wait(0);
    await wait(0);
    await wait(0);
    await wait(0);

    expect(getTokenSpy.callCount).to.equal(1);
    expect(getChannelTokenSpy.callCount).to.equal(1);
    expect(goHomeSpy.callCount).to.equal(1);
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

    // Store general token
    writeGeneralTokenToCache(client);

    const wrapper = mount(
      <ApolloProvider client={client}>
        <InitScreen />
      </ApolloProvider>,
    );
    wrapper.update();
    await wait(0);
    await wait(0);
    await wait(0);
    await wait(0);
    await wait(0);

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

    // Store general token
    writeGeneralTokenToCache(client);

    const wrapper = mount(
      <ApolloProvider client={client}>
        <InitScreen />
      </ApolloProvider>,
    );
    wrapper.update();
    await wait(0);
    await wait(0);
    await wait(0);
    await wait(0);
    await wait(0);

    // Pushnotifications should have been initialised
    expect(pushNotificationInitSpy.callCount).to.equal(1);

    // Pushnotifications should have been initialised
    expect(inAppPurchasesInitSpy.callCount).to.equal(1);

    // Should have gone to OnboardingWelcomeScreen
    expect(goToOnboardingSpy.callCount).to.equal(1);

    // Should not have goneHome
    expect(goHomeSpy.callCount).to.equal(0);
  });
});
