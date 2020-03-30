import { Button } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import sinon from 'sinon';
import { GoogleSignin } from '@react-native-community/google-signin';
import { ApolloProvider } from 'react-apollo';
import mockClient from '../../../../API/utils/mockClient';
import LoginWithGoogle from './LoginWithGoogle';
import { GET_ACCESS_TOKEN_QUERY } from '../../../../ApolloClient/resolvers/query/getAccessToken/getAccessTokenQuery';
import { getAccessToken } from '../../../../ApolloClient/resolvers/query/getAccessToken/__generated__/getAccessToken';
import PushNotifications from '../../../../modules/PushNotifications';
import { getSelf } from '../../../../API/query/getSelf/__generated__/getSelf';
import { GET_SELF_QUERY } from '../../../../API/query/getSelf/getSelf';

const client = mockClient();

describe('<LoginWithGoogle />', () => {
  it('should succeed', async () => {
    /**
     * Define Spies
     */
    const configureSpy = sinon.spy(GoogleSignin, 'configure');
    const hasPlayServicesSpy = sinon.spy(GoogleSignin, 'hasPlayServices');
    const signInSpy = sinon.spy(GoogleSignin, 'signIn');
    const getTokensSpy = sinon.spy(GoogleSignin, 'getTokens');
    const revokeAccessSpy = sinon.spy(GoogleSignin, 'revokeAccess');
    const signOutSpy = sinon.spy(GoogleSignin, 'signOut');
    const pushNotificationInitSpy = sinon.spy(PushNotifications, 'init');

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
});
