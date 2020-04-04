import { Button, TextInput } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import { ApolloProvider } from 'react-apollo';
import RequestPasswordReset from './RequestPasswordReset';
import mockClient from '../../API/utils/mockClient';
import RequestPasswordResetView from './RequestPasswordResetView';

describe('<RequestPasswordReset />', () => {
  it('should succeed', async () => {
    const client = mockClient();

    const wrapper = mount(
      <ApolloProvider client={client}>
        <RequestPasswordReset />
      </ApolloProvider>,
    );

    // Login Button is disabled as default
    expect(wrapper.find(Button).first().props().disabled).to.be.true;

    // Test text change
    wrapper.find(TextInput).at(0).props().onChangeText('email@test.com');
    await wait(0);
    wrapper.update();

    // Form should now be valid
    expect(wrapper.find(Button).first().props().disabled).to.be.false;

    // Submit and wait for response and update
    await wrapper.find(Button).first().props().onPress({
      preventDefault: jest.fn,
      persist: jest.fn,
    } as any);
    await wait(0);
    wrapper.update();

    // Should render success message
    expect(wrapper.find(RequestPasswordResetView).props().complete).to.be.true;
    expect(wrapper.contains('Please check your email')).to.be.true;
  });

  it('should fail to requestPasswordReset', async () => {
    /**
     * Create mock client and force getSelf to error
     */
    const client = mockClient({
      Mutation: () => ({
        requestPasswordReset: () => {
          throw new Error();
        },
      }),
    });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <RequestPasswordReset />
      </ApolloProvider>,
    );

    // Test text change
    wrapper.find(TextInput).at(0).props().onChangeText('email@test.com');
    wrapper.update();

    // Submit and update
    await wrapper.find(Button).first().props().onPress({
      preventDefault: jest.fn,
      persist: jest.fn,
    } as any);

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // RequestPasswordResetView.loading is now false
    expect(wrapper.find(RequestPasswordResetView).props().loading).to.be.false;
  });
});
