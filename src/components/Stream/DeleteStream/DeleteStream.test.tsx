import React from 'react';
import { mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { expect } from 'chai';
import { Alert } from 'react-native';
import sinon from 'sinon';
import wait from 'waait';
import mockClient from '../../../API/utils/mockClient';
import DeleteStream from './DeleteStream';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import Button from '../../UI/Button/Button';
import * as ToastModule from '../../../modules/Toast';

describe('<DeleteStream />', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = sinon.createSandbox();
  let alertSpy = sandbox.spy(Alert, 'alert');
  let toastSpy = sandbox.spy(ToastModule, 'pushToast');
  let onPopSpy = sandbox.spy();

  afterEach(() => {
    sandbox.restore();

    alertSpy = sandbox.spy(Alert, 'alert');
    toastSpy = sandbox.spy(ToastModule, 'pushToast');
    onPopSpy = sandbox.spy();
  });

  test('should succeed', async () => {
    const client = mockClient();

    /**
     * Create test component with getStreamSelf query
     */
    const TestComponent = () => {
      const queryResult = useGetStreamSelfQuery({
        variables: {
          id: 'test',
        },
      });
      if (queryResult.loading) return null;

      return (
        <DeleteStream
          data={queryResult.data.getStreamSelf}
          getStreamSelfsVariables={{}}
          onPop={onPopSpy}
        />
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

    // Wait for onCompleted to run
    await wait(0);

    // OnPop should have been called
    expect(onPopSpy.callCount).to.equal(1);
  });

  it('should fail', async () => {
    /**
     * Create mock client and force getSelf.requiresUpdate to be true
     */
    const client = mockClient({
      Mutation: () => ({
        deleteStream: () => {
          throw new Error();
        },
      }),
    });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <DeleteStream
          data={{ id: 'test', published: null } as any}
          getStreamSelfsVariables={{}}
          // eslint-disable-next-line no-console
          onPop={console.log}
        />
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
});
