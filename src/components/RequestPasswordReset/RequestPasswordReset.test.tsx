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

    // Login Button is disabled as default
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().disabled).to.be.true;

    // Test text change
    wrapper.findWhere((n) => n.prop('testID') === 'email').first().props().onChangeText('email@test.com');
    wrapper.findWhere((n) => n.prop('testID') === 'email').first().props().onBlur();
    await wait(0);
    wrapper.update();

    // Form should now be valid
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().disabled).to.be.false;

    // Submit and wait for response and update
    await wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({
      preventDefault: jest.fn,
      persist: jest.fn,
    } as any);
    await wait(0);

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

  it('should render defaultEmailValue and be valid', async () => {
    const client = mockClient();

    const wrapper = mount(
      <ApolloProvider client={client}>
        <RequestPasswordReset
          onCompletion={jest.fn()}
          defaultEmailValue="dev@madebyprism.com"
        />
      </ApolloProvider>,
    );
    await wait(0);
    wrapper.update();

    // Test text
    expect(wrapper.findWhere((n) => n.prop('testID') === 'email').at(0).props().defaultValue).to.equal('dev@madebyprism.com');

    // Form should be valid
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().disabled).to.be.false;
  });

  it('should render defaultEmailValue and be invalid', async () => {
    const client = mockClient();

    const wrapper = mount(
      <ApolloProvider client={client}>
        <RequestPasswordReset
          onCompletion={jest.fn()}
          defaultEmailValue="invalid-email"
        />
      </ApolloProvider>,
    );
    await wait(0);
    wrapper.update();

    // Form should be invalid
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().disabled).to.be.true;
  });
});
