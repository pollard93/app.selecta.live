import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { ApolloProvider } from 'react-apollo';
import { TextInput } from 'react-native';
import mockClient from '../../../API/utils/mockClient';
import ChannelLogin from './ChannelLogin';
import * as ScreenUtilsModule from '../../../screens/utils';
import { GET_CHANNEL_ACCESS_TOKEN_QUERY } from '../../../ApolloClient/resolvers/query/getChannelAccessToken/getChannelAccessTokenQuery';
import { getChannelAccessToken } from '../../../ApolloClient/resolvers/query/getChannelAccessToken/__generated__/getChannelAccessToken';
import * as ToastModule from '../../../modules/Toast';

const flushPromises = () => new Promise((res) => process.nextTick(res));

describe('<ChannelLogin >', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = sinon.createSandbox();

  let toastSpy = sandbox.spy(ToastModule, 'pushToast');
  let goToChannelStackSpy = sandbox.spy(ScreenUtilsModule, 'goToChannelStack');

  afterEach(() => {
    sandbox.restore();

    toastSpy = sandbox.spy(ToastModule, 'pushToast');
    goToChannelStackSpy = sandbox.spy(ScreenUtilsModule, 'goToChannelStack');
  });

  it('should requestChannelLoginMutation on mount, should only be able to resend code every 30 seconds', async () => {
    jest.useFakeTimers();
    const client = mockClient();

    // Spy on mutate
    const spy = sinon.spy(client, 'mutate');

    const wrapper = mount(
      <ApolloProvider client={client}>
        <ChannelLogin id="test" />
      </ApolloProvider>,
    );

    // Mutation should have been called on mount
    expect(spy.callCount).to.equal(1);
    expect(spy.args[0][0].variables).to.deep.equal({
      id: 'test',
    });

    // Button should be disabled as countDown is 30
    expect(wrapper.findWhere((n) => n.props().testID === 'ResendButton').first().props().disabled).to.be.true;

    // Run all timers and update
    jest.runAllTimers();
    wrapper.update();

    // Button should be disabled as countDown is 0
    expect(wrapper.findWhere((n) => n.props().testID === 'ResendButton').first().props().disabled).to.be.false;

    // Press button and test mutation is called again
    wrapper.findWhere((n) => n.props().testID === 'ResendButton').first().props().onPress({} as any);
    expect(spy.callCount).to.equal(2);
    expect(spy.args[1][0].variables).to.deep.equal({
      id: 'test',
    });
    wrapper.update();

    // Button should be disabled as countDown is 30
    expect(wrapper.findWhere((n) => n.props().testID === 'ResendButton').first().props().disabled).to.be.true;
  });

  it('should login channel', async () => {
    jest.useFakeTimers();
    const client = mockClient();

    const wrapper = mount(
      <ApolloProvider client={client}>
        <ChannelLogin id="test" />
      </ApolloProvider>,
    );

    jest.runAllTimers();

    // Button should be disabled as no code in input
    expect(wrapper.findWhere((n) => n.props().testID === 'LoginButton').first().props().disabled).to.be.true;

    // Update code input
    wrapper.find(TextInput).first().props().onChangeText('000000');
    wrapper.update();

    // Button should not be disabled
    expect(wrapper.findWhere((n) => n.props().testID === 'LoginButton').first().props().disabled).to.be.false;

    // Press button
    wrapper.findWhere((n) => n.props().testID === 'LoginButton').first().props().onPress({} as any);

    // Wait for request and update
    jest.runAllTimers();
    await flushPromises();
    wrapper.update();

    // Check that the channel access token has been stored
    const gcat = client.readQuery<getChannelAccessToken>({
      query: GET_CHANNEL_ACCESS_TOKEN_QUERY,
    });
    expect(typeof gcat.getChannelAccessToken).to.equal('string');

    // goToChannelStack should have been called
    expect(goToChannelStackSpy.callCount).to.equal(1);
  });

  it('should toast if loginChannelWithCode errors', async () => {
    jest.useFakeTimers();

    /**
     * Create mock client and force loginChannelWithCode to error
     */
    const client = mockClient({
      Mutation: () => ({
        loginChannelWithCode: () => {
          throw new Error('');
        },
      }),
    });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <ChannelLogin id="test" />
      </ApolloProvider>,
    );

    jest.runAllTimers();

    // Update code input
    wrapper.find(TextInput).first().props().onChangeText('000000');
    wrapper.update();

    // Press button
    wrapper.findWhere((n) => n.props().testID === 'LoginButton').first().props().onPress({} as any);
    wrapper.update();

    // Button should be disabled
    expect(wrapper.findWhere((n) => n.props().testID === 'LoginButton').first().props().disabled).to.be.true;

    // Wait for request and update
    jest.runAllTimers();
    await flushPromises();
    wrapper.update();

    // Toast should have been called
    expect(toastSpy.callCount).to.equal(1);

    // Button should not be disabled
    expect(wrapper.findWhere((n) => n.props().testID === 'LoginButton').first().props().disabled).to.be.false;
  });

  it('should toast if getChannelSelf errors', async () => {
    jest.useFakeTimers();

    /**
     * Create mock client and force getChannelSelf to error
     */
    const client = mockClient({
      Query: () => ({
        getChannelSelf: () => {
          throw new Error('');
        },
      }),
    });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <ChannelLogin id="test" />
      </ApolloProvider>,
    );

    jest.runAllTimers();

    // Update code input
    wrapper.find(TextInput).first().props().onChangeText('000000');
    wrapper.update();

    // Press button
    wrapper.findWhere((n) => n.props().testID === 'LoginButton').first().props().onPress({} as any);
    wrapper.update();

    // Button should be disabled
    expect(wrapper.findWhere((n) => n.props().testID === 'LoginButton').first().props().disabled).to.be.true;

    // Wait for request and update
    jest.runAllTimers();
    await flushPromises();
    wrapper.update();

    // Toast should have been called
    expect(toastSpy.callCount).to.equal(1);

    // Button should not be disabled
    expect(wrapper.findWhere((n) => n.props().testID === 'LoginButton').first().props().disabled).to.be.false;
  });
});
