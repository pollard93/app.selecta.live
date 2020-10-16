import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { expect } from 'chai';
import { ApolloProvider } from 'react-apollo';
import sinon from 'sinon';
import RequestPasswordReset from './RequestPasswordReset';
import mockClient from '../../API/utils/mockClient';
import RequestPasswordResetView from './RequestPasswordResetView';

describe('<RequestPasswordReset />', () => {
  it('should succeed', async () => {
    const client = mockClient();
    const completionSpy = sinon.spy();

    const wrapper = mount(
      <ApolloProvider client={client}>
        <RequestPasswordReset
          onCompletion={completionSpy}
        />
      </ApolloProvider>,
    );

    // Test text change
    wrapper.findWhere((n) => n.prop('testID') === 'email').first().props().onChangeText('email@test.com');
    wrapper.findWhere((n) => n.prop('testID') === 'email').first().props().onBlur();
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

    // Should have called onCompletion
    expect(completionSpy.callCount).to.equal(1);
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
    const completionSpy = sinon.spy();

    const wrapper = mount(
      <ApolloProvider client={client}>
        <RequestPasswordReset
          onCompletion={completionSpy}
        />
      </ApolloProvider>,
    );

    // Test text change
    wrapper.findWhere((n) => n.prop('testID') === 'email').at(0).props().onChangeText('email@test.com');
    wrapper.update();

    // Submit and update
    await wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({
      preventDefault: jest.fn,
      persist: jest.fn,
    } as any);

    // Wait for response and update
    await wait(0);
    wrapper.update();

    // RequestPasswordResetView.loading is now false
    expect(wrapper.find(RequestPasswordResetView).props().loading).to.be.false;

    // Should not have called onCompletion
    expect(completionSpy.callCount).to.equal(0);
  });
});
