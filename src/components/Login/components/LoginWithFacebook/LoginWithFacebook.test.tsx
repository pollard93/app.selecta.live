import { Button } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import sinon from 'sinon';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { ApolloProvider } from 'react-apollo';
import { useToast } from 'mbp-components-rn-toast';
import { MockedProvider } from '@apollo/react-testing';
import mockClient from '../../../../API/utils/mockClient';
import LoginWithFacebook from './LoginWithFacebook';
import { GET_ACCESS_TOKEN_QUERY } from '../../../../ApolloClient/resolvers/query/getAccessToken/getAccessTokenQuery';
import { getAccessToken } from '../../../../ApolloClient/resolvers/query/getAccessToken/__generated__/getAccessToken';
import PushNotifications from '../../../../modules/PushNotifications';
import { getSelf } from '../../../../API/query/getSelf/__generated__/getSelf';
import { GET_SELF_QUERY } from '../../../../API/query/getSelf/getSelf';
import { LOGIN_WITH_SOCIAL_MUTATION } from '../../../../API/mutation/loginWithSocial/loginWithSocial';

const client = mockClient();

describe('<LoginWithFacebook />', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = sinon.createSandbox();
  let loginWithPermissionsSpy;
  let logoutSpy;
  let getCurrentAccessTokenSpy;
  let pushNotificationInitSpy;
  let toastSpy;

  beforeEach(() => {
    loginWithPermissionsSpy = sandbox.spy(LoginManager as any, 'logInWithPermissions');
    logoutSpy = sandbox.spy(LoginManager as any, 'logOut');
    getCurrentAccessTokenSpy = sandbox.spy(AccessToken, 'getCurrentAccessToken');
    pushNotificationInitSpy = sandbox.spy(PushNotifications, 'init');
    toastSpy = sandbox.spy(useToast(), 'push');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should succeed', async () => {
    const wrapper = mount(
      <ApolloProvider client={client}>
        <LoginWithFacebook />
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
    expect(pushNotificationInitSpy.called).to.be.true;

    // Update - button should not return to enabled as no errors
    wrapper.update();
    expect(wrapper.find(Button).first().props().disabled).to.be.true;
  });

  it('should fail to loginWithSocial', async () => {
    const mocks = [{
      request: {
        query: LOGIN_WITH_SOCIAL_MUTATION,
      },
      error: new Error(),
    }];

    const wrapper = mount(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <LoginWithFacebook />
      </MockedProvider>,
    );

    // Submit and update
    wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

    // Button.disabled is now true
    expect(wrapper.find(Button).props().disabled).to.be.true;

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // Button.disabled is now false
    expect(wrapper.find(Button).props().disabled).to.be.false;

    // Facebook should now be signed out
    expect(logoutSpy.callCount).to.equal(1);

    // Toast should have been executed
    expect(toastSpy.callCount).to.equal(1);
  });

  it('should fail getSelf', async () => {
    const mocks = [{
      request: {
        query: GET_SELF_QUERY,
      },
      error: new Error(),
    }];

    const wrapper = mount(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <LoginWithFacebook />
      </MockedProvider>,
    );

    // Submit and update
    wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

    // Button.disabled is now true
    expect(wrapper.find(Button).props().disabled).to.be.true;

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // Button.disabled is now false
    expect(wrapper.find(Button).props().disabled).to.be.false;

    // Facebook should now be signed out
    expect(logoutSpy.callCount).to.equal(1);

    // Toast should have been executed
    expect(toastSpy.callCount).to.equal(1);
  });
});
