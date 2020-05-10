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
    expect(getChannelTokenSpy.callCount).to.equal(1);
    expect(goHomeSpy.callCount).to.equal(1);
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

  it('should goToLogin with stored expired general token', async () => {
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
});
