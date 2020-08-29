import React from 'react';
import { mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { wait } from '@apollo/react-testing';
import { expect } from 'chai';
import Sinon from 'sinon';
import { useToast } from 'mbp-components-rn-toast';
import mockClient from '../../../../../API/utils/mockClient';
import StreamPurchase from './StreamPurchase';
import { useGetStreamProfileQuery } from '../../../../../API/query/getStreamProfile/getStreamProfile';
import { GET_SELF_QUERY } from '../../../../../API/query/getSelf/getSelf';
import { getSelf } from '../../../../../API/query/getSelf/__generated__/getSelf';
import * as ScreenUtilsModule from '../../../../../screens/utils';


describe('<StreamPurchase />', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = Sinon.createSandbox();
  let toastSpy = sandbox.stub(useToast(), 'push');
  let openTopUpModalSpy = sandbox.stub(ScreenUtilsModule, 'openTopUpModal');

  afterEach(() => {
    sandbox.restore();

    toastSpy = sandbox.stub(useToast(), 'push');
    openTopUpModalSpy = sandbox.stub(ScreenUtilsModule, 'openTopUpModal');
  });

  test('should succeed if user has credit', async () => {
    const client = mockClient();

    /**
     * Setup user to have 10 credits
     */
    const getSelfQueryResult = await client.query<getSelf>({
      query: GET_SELF_QUERY,
    });
    client.writeQuery<getSelf>({
      query: GET_SELF_QUERY,
      data: {
        getSelf: {
          ...getSelfQueryResult.data.getSelf,
          credit: 10,
        },
      },
    });


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
        <StreamPurchase
          data={{
            ...queryResult.data.getStreamProfile,
            cost: 10,
          }}
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

    // Button should not be loading
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().loading).to.be.false;

    // Press button twice
    wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({} as any);
    wrapper.update();
    wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({} as any);
    wrapper.update();

    // Button should be loading
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().loading).to.be.true;

    // Wait for request
    await wait(0);
    wrapper.update();

    // Credit for user should have been deducted from getSelf cache
    const dataAfter = client.readQuery<getSelf>({
      query: GET_SELF_QUERY,
    });
    expect(dataAfter.getSelf.credit).to.equal(0);

    // Toast should have been executed
    expect(toastSpy.callCount).to.equal(1);
  });

  test('should openTopUpModal if user has insufficient credit', async () => {
    const client = mockClient();

    /**
     * Setup user to have 0 credits
     */
    const getSelfQueryResult = await client.query<getSelf>({
      query: GET_SELF_QUERY,
    });
    client.writeQuery<getSelf>({
      query: GET_SELF_QUERY,
      data: {
        getSelf: {
          ...getSelfQueryResult.data.getSelf,
          credit: 0,
        },
      },
    });


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
        <StreamPurchase
          data={{
            ...queryResult.data.getStreamProfile,
            cost: 10,
          }}
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

    // Button should not be loading
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().loading).to.be.false;

    // Press button
    wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({} as any);
    wrapper.update();

    // Toast should have been executed
    expect(openTopUpModalSpy.callCount).to.equal(1);
  });

  test('should fail', async () => {
    /**
     * Create mock client and force purchaseStream to error
     */
    const client = mockClient({
      Mutation: () => ({
        purchaseStream: () => {
          throw new Error();
        },
      }),
    });

    /**
     * Setup user to have 10 credits
     */
    const getSelfQueryResult = await client.query<getSelf>({
      query: GET_SELF_QUERY,
    });
    client.writeQuery<getSelf>({
      query: GET_SELF_QUERY,
      data: {
        getSelf: {
          ...getSelfQueryResult.data.getSelf,
          credit: 10,
        },
      },
    });


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
        <StreamPurchase
          data={{
            ...queryResult.data.getStreamProfile,
            cost: 10,
          }}
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

    // Press button twice
    wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({} as any);
    wrapper.update();
    wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({} as any);
    wrapper.update();

    // Wait for request and update
    await wait(0);
    wrapper.update();

    // Toast should have been executed
    expect(toastSpy.callCount).to.equal(1);
  });
});
