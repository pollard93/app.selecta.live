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

describe('<InitScreen >', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = sinon.createSandbox();
  let pushNotificationInitSpy = sandbox.spy(PushNotifications, 'init');
  let getTokenSpy = sandbox.spy(AClientModule, 'getToken');
  let goToLoginSpy = sandbox.spy(ScreenUtilsModule, 'goToLogin');
  let goHomeSpy = sandbox.spy(ScreenUtilsModule, 'goHome');
  let goToRequireUpdateScreenSpy = sandbox.spy(ScreenUtilsModule, 'goToRequireUpdateScreen');

  afterEach(async () => {
    sandbox.restore();

    pushNotificationInitSpy = sandbox.spy(PushNotifications, 'init');
    getTokenSpy = sandbox.spy(AClientModule, 'getToken');
    goToLoginSpy = sandbox.spy(ScreenUtilsModule, 'goToLogin');
    goHomeSpy = sandbox.spy(ScreenUtilsModule, 'goHome');
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


  it('should goToLogin with no stored token', async () => {
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

  it('should goHome with stored token', async () => {
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

    expect(pushNotificationInitSpy.callCount).to.equal(1);
    expect(getTokenSpy.callCount).to.equal(1);
    expect(goHomeSpy.callCount).to.equal(1);
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

    expect(getTokenSpy.callCount).to.equal(1);
    expect(goToLoginSpy.callCount).to.equal(1);
  });

  it('should goToRequireUpdateScreen if getSelf.requiresUpdate is true', async () => {
    /**
     * Create mock client and force getSelf.requiresUpdate to be true
     */
    const client = mockClient({
      Query: () => ({
        getSelf: () => ({
          requiresUpdate: true,
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

    // Should goToRequireUpdateScreen
    expect(goToRequireUpdateScreenSpy.callCount).to.equal(1);

    // Should not have goneHome
    expect(goHomeSpy.callCount).to.equal(0);
  });
});
