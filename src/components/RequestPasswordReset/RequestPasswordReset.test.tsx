import { Button, TextInput } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import { ApolloProvider } from 'react-apollo';
import RequestPasswordReset from './RequestPasswordReset';
import mockClient from '../../API/utils/mockClient';

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
    expect(wrapper.contains('Please check your email')).to.be.true;
  });
});
