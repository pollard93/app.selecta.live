import React from 'react';
import { mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider, wait } from '@apollo/react-testing';
import { expect } from 'chai';
import { Button } from 'react-native';
import Sinon from 'sinon';
import { useToast } from 'mbp-components-rn-toast';
import mockClient from '../../../API/utils/mockClient';
import PayForStream from './PayForStream';
import { PAY_FOR_STREAM_MUTATION } from '../../../API/mutation/payForStream/payForStream';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';

const client = mockClient();

describe('<PayForStream />', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = Sinon.createSandbox();
  let toastSpy;

  beforeEach(() => {
    toastSpy = sandbox.spy(useToast(), 'push');
  });

  afterEach(() => {
    sandbox.restore();
  });

  test('should succeed', async () => {
    /**
     * Create test component, wrapped with getStreamProfileQuery
     */
    const TestComponent = () => {
      const queryResult = useGetStreamProfileQuery({
        variables: {
          id: 'IS_NOT_CONSUMER',
        },
      });
      if (queryResult.loading || queryResult.error) return null;

      return (
        <PayForStream
          data={queryResult.data.getStreamProfile}
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

    // Wait for get request
    await wait(0);
    wrapper.update();

    // Button should not be disabled
    expect(wrapper.find(Button).first().props().disabled).to.be.false;

    // Press button
    wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

    // Button should be disabled
    expect(wrapper.find(Button).first().props().disabled).to.be.true;

    // Wait for request
    await wait(0);
    wrapper.update();

    // Should render you have paid
    expect(wrapper.contains('You have paid for this stream')).to.be.true;
  });

  test('should fail', async () => {
    const mocks = [{
      request: {
        query: PAY_FOR_STREAM_MUTATION,
      },
      error: new Error(),
    }];

    const wrapper = mount(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <PayForStream
          data={{
            id: 'test',
            isConsumer: false,
          } as any}
        />
      </MockedProvider>,
    );

    // Submit
    wrapper.find(Button).first().props().onPress({} as any);

    // Wait for request and update
    await wait(0);
    wrapper.update();

    // Toast should have been executed
    expect(toastSpy.callCount).to.equal(1);
  });
});
