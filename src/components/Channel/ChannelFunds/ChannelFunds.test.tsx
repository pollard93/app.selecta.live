import React from 'react';
import { mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { expect } from 'chai';
import { Button, Alert, Text } from 'react-native';
import sinon from 'sinon';
import wait from 'waait';
import mockClient from '../../../API/utils/mockClient';
import ChannelFunds from './ChannelFunds';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import * as ToastModule from '../../../modules/Toast';

describe('<ChannelFunds />', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = sinon.createSandbox();
  let alertSpy = sandbox.spy(Alert, 'alert');
  let toastSpy = sandbox.spy(ToastModule, 'pushToast');

  afterEach(() => {
    sandbox.restore();
    alertSpy = sandbox.spy(Alert, 'alert');
    toastSpy = sandbox.spy(ToastModule, 'pushToast');
  });

  test('should succeed', async () => {
    const client = mockClient();

    /**
     * Create test component with getChannelSelf query
     */
    const TestComponent = () => {
      const queryResult = useGetChannelSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <ChannelFunds data={queryResult.data.getChannelSelf} />
      );
    };

    /**
     * Mount
     */
    const wrapper = mount(
      <ApolloProvider client={client}>
        <TestComponent />
      </ApolloProvider>,
    );

    // Wait for initial query
    await wait(0);
    wrapper.update();

    // Test render
    const dataBefore = wrapper.find(ChannelFunds).props().data;
    expect(wrapper.contains(<Text>Value of credit: £{(dataBefore.credit * dataBefore.creditWithdrawalValue) / 100}</Text>)).to.be.true;

    // Button should not be disabled
    expect(wrapper.find(Button).first().props().disabled).to.be.false;

    // Simulate button press
    wrapper.find(Button).first().props().onPress({} as any);

    // Alert should have been called
    expect(alertSpy.callCount).to.equal(1);

    // Simulate confirmation action
    alertSpy.args[0][2][1].onPress();
    wrapper.update();

    // Button should be disabled
    expect(wrapper.find(Button).first().props().disabled).to.be.true;

    // Wait for results
    await wait(0);
    wrapper.update();

    // Test render after mutation
    const dataAfter = wrapper.find(ChannelFunds).props().data;
    expect(wrapper.contains(<Text>Value of credit: £{(dataAfter.credit * dataAfter.creditWithdrawalValue) / 100}</Text>)).to.be.true;
  });

  it('should fail', async () => {
    /**
     * Create mock client and force withdrawFunds to error
     */
    const client = mockClient({
      Mutation: () => ({
        withdrawFunds: () => {
          throw new Error();
        },
      }),
    });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <ChannelFunds data={{ id: 'test', cancelled: null } as any} />
      </ApolloProvider>,
    );

    // Wait for initial query
    await wait(0);
    wrapper.update();

    // Simulate button press
    wrapper.find(Button).first().props().onPress({} as any);

    // Simulate confirmation action
    alertSpy.args[0][2][1].onPress();

    // Wait for results
    await wait(0);
    wrapper.update();

    // Toast should have been called
    expect(toastSpy.callCount).to.equal(1);

    // Button should not be disabled
    expect(wrapper.find(Button).first().props().disabled).to.be.false;
  });

  it('should not allow user to withdraw funds if the credit is below the minimum', async () => {
    const client = mockClient();

    const wrapper = mount(
      <ApolloProvider client={client}>
        <ChannelFunds data={{ id: 'test', credit: 1, creditWithdrawalMinimum: 2 } as any} />
      </ApolloProvider>,
    );

    // Button should not be disabled
    expect(wrapper.find(Button).first().props().disabled).to.be.true;
  });
});
