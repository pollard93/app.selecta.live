import { Button } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import sinon from 'sinon';
import { GoogleSignin } from '@react-native-community/google-signin';
import { ApolloProvider } from 'react-apollo';
import { useToast } from 'mbp-components-rn-toast';
import { MockedProvider } from '@apollo/react-testing';
import mockClient from '../../../../API/utils/mockClient';
import LoginWithGoogle from './LoginWithGoogle';
import { GET_ACCESS_TOKEN_QUERY } from '../../../../ApolloClient/resolvers/query/getAccessToken/getAccessTokenQuery';
import { getAccessToken } from '../../../../ApolloClient/resolvers/query/getAccessToken/__generated__/getAccessToken';
import PushNotifications from '../../../../modules/PushNotifications';
import { getSelf } from '../../../../API/query/getSelf/__generated__/getSelf';
import { GET_SELF_QUERY } from '../../../../API/query/getSelf/getSelf';
import { LOGIN_WITH_SOCIAL_MUTATION } from '../../../../API/mutation/loginWithSocial/loginWithSocial';

const client = mockClient();

describe('<LoginWithGoogle />', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = sinon.createSandbox();
  let configureSpy;
  let hasPlayServicesSpy;
  let signInSpy;
  let getTokensSpy;
  let revokeAccessSpy;
  let signOutSpy;
  let pushNotificationInitSpy;
  let toastSpy;

  beforeEach(() => {
    configureSpy = sandbox.spy(GoogleSignin, 'configure');
    hasPlayServicesSpy = sandbox.spy(GoogleSignin, 'hasPlayServices');
    signInSpy = sandbox.spy(GoogleSignin, 'signIn');
    getTokensSpy = sandbox.spy(GoogleSignin, 'getTokens');
    revokeAccessSpy = sandbox.spy(GoogleSignin, 'revokeAccess');
    signOutSpy = sandbox.spy(GoogleSignin, 'signOut');
    pushNotificationInitSpy = sandbox.spy(PushNotifications, 'init');
    toastSpy = sandbox.spy(useToast(), 'push');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should succeed', async () => {
    const wrapper = mount(
      <ApolloProvider client={client}>
        <LoginWithGoogle />
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
        <LoginWithGoogle />
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

    // Google should be signed out
    expect(signOutSpy.callCount).to.equal(1);

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
        <LoginWithGoogle />
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

    // Google should be signed out
    expect(signOutSpy.callCount).to.equal(1);

    // Toast should have been executed
    expect(toastSpy.callCount).to.equal(1);
  });
});
