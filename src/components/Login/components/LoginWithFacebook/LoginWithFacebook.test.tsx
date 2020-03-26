import { Button } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import sinon from 'sinon';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { ApolloProvider } from 'react-apollo';
import mockClient from '../../../../API/utils/mockClient';
import LoginWithFacebook from './LoginWithFacebook';
import { GET_ACCESS_TOKEN_QUERY } from '../../../../ApolloClient/resolvers/query/getAccessToken/getAccessTokenQuery';
import { getAccessToken } from '../../../../ApolloClient/resolvers/query/getAccessToken/__generated__/getAccessToken';
import PushNotifications from '../../../../modules/PushNotifications';
import { getSelf } from '../../../../API/query/getSelf/__generated__/getSelf';
import { GET_SELF_QUERY } from '../../../../API/query/getSelf/getSelf';

const client = mockClient();

describe('<LoginWithFacebook />', () => {
  it('should succeed', async () => {
    /**
     * Define Spies
     */
    const loginWithPermissionsSpy = sinon.spy(LoginManager as any, 'logInWithPermissions');
    const logoutSpy = sinon.spy(LoginManager as any, 'logOut');
    const getCurrentAccessTokenSpy = sinon.spy(AccessToken, 'getCurrentAccessToken');
    const pushNotificationInitSpy = sinon.spy(PushNotifications, 'init');

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
});
