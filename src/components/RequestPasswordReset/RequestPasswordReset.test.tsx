import { Button, TextInput } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from '@apollo/react-testing';
import RequestPasswordReset from './RequestPasswordReset';
import mockClient from '../../API/utils/mockClient';
import RequestPasswordResetView from './RequestPasswordResetView';
import { REQUEST_PASSWORD_RESET_MUTATION } from '../../API/mutation/requestPasswordReset/requestPasswordReset';

const client = mockClient();

describe('<RequestPasswordReset />', () => {
  it('should succeed', async () => {
    const wrapper = mount(
      <ApolloProvider client={client}>
        <RequestPasswordReset />
      </ApolloProvider>,
    );

    // Login Button is disabled as default
    expect(wrapper.find(Button).first().props().disabled).to.be.true;

    // Test text change
    wrapper.find(TextInput).at(0).props().onChangeText('email@test.com');
    wrapper.update();

    // Form should now be valid
    expect(wrapper.find(Button).first().props().disabled).to.be.false;

    // Submit and wait for response and update
    wrapper.find(Button).first().props().onPress({} as any);
    await wait(0);
    wrapper.update();

    // Should render success message
    expect(wrapper.find(RequestPasswordResetView).props().complete).to.be.true;
    expect(wrapper.contains('Please check your email')).to.be.true;
  });

  it('should fail to requestPasswordReset', async () => {
    const mocks = [{
      request: {
        query: REQUEST_PASSWORD_RESET_MUTATION,
      },
      error: new Error(),
    }];

    const wrapper = mount(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <RequestPasswordReset />
      </MockedProvider>,
    );

    // Submit and update
    wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

    // RequestPasswordResetView.loading is now true
    expect(wrapper.find(RequestPasswordResetView).props().loading).to.be.true;

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // RequestPasswordResetView.loading is now false
    expect(wrapper.find(RequestPasswordResetView).props().loading).to.be.false;
  });
});
