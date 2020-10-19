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
  let goToRequireUpdateScreenSpy = sandbox.stub(ScreenUtilsModule, 'goToRequireUpdateScreen');
  let goHomeSpy = sandbox.stub(ScreenUtilsModule, 'goHome');

  afterEach(() => {
    sandbox.restore();

    pushNotificationInitSpy = sandbox.stub(PushNotifications, 'init');
    inAppPurchasesInitSpy = sandbox.stub(InAppPurchases, 'init');
    toastSpy = sandbox.stub(ToastModule, 'pushToast');
    goToRequireUpdateScreenSpy = sandbox.stub(ScreenUtilsModule, 'goToRequireUpdateScreen');
    goHomeSpy = sandbox.stub(ScreenUtilsModule, 'goHome');
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

    // Test text change and validate form
    wrapper.findWhere((n) => n.prop('testID') === 'email').first().props().onChangeText('email@test.com');
    wrapper.findWhere((n) => n.prop('testID') === 'password').first().props().onChangeText('ValidPassword1!');
    wrapper.findWhere((n) => n.prop('testID') === 'username').first().props().onChangeText('username');
    await wait(0);
    wrapper.update();

    // Submit and wait for response and update
    await wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({
      preventDefault: jest.fn,
      persist: jest.fn,
    } as any);
    await wait(0);
    wrapper.update();

    // Button should now be loading
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().disabled).to.be.true;
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submitLoading').first()).to.have.length;

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
    wrapper.findWhere((n) => n.prop('testID') === 'username').first().props().onChangeText('username');
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
    wrapper.findWhere((n) => n.prop('testID') === 'username').first().props().onChangeText('username');
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
    wrapper.findWhere((n) => n.prop('testID') === 'username').first().props().onChangeText('username');
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
  });
});
