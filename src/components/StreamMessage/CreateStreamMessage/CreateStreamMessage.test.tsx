import React from 'react';
import { mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { wait } from '@apollo/react-testing';
import { expect } from 'chai';
import Sinon from 'sinon';
import mockClient from '../../../API/utils/mockClient';
import CreateStreamMessage from './CreateStreamMessage';
import { GET_STREAM_MESSAGES_QUERY } from '../../../API/query/getStreamMessages/getStreamMessages';
import { getStreamMessages, getStreamMessagesVariables } from '../../../API/query/getStreamMessages/__generated__/getStreamMessages';
import TextInput from '../../UI/Form/components/TextInput/TextInput';
import * as ToastModule from '../../../modules/Toast';


describe('<CreateStreamMessage />', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = Sinon.createSandbox();
  let toastSpy = sandbox.spy(ToastModule, 'pushToast');

  afterEach(() => {
    sandbox.restore();

    toastSpy = sandbox.spy(ToastModule, 'pushToast');
  });


  test('should succeed', async () => {
    const client = mockClient();

    const variables = {
      id: 'test',
      first: 5,
      after: null,
    };

    /**
     * Execute getStreamMessages query to set in cache
     */
    const resBefore = await client.query<getStreamMessages, getStreamMessagesVariables>({
      query: GET_STREAM_MESSAGES_QUERY,
      variables,
    });
    expect(resBefore.data.getStreamMessages.messages.length).to.equal(5);
    expect(resBefore.data.getStreamMessages.count).to.equal(50);

    /**
     * Mount
     */
    const wrapper = mount(
      <ApolloProvider client={client}>
        <CreateStreamMessage
          variables={variables}
        />
      </ApolloProvider>,
    );

    // TextInput initial value should be empty
    expect(wrapper.find(TextInput).first().props().value).to.equal('');

    // TouchableOpacity should be disabled
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().disabled).to.be.true;

    // Update value
    wrapper.find(TextInput).first().props().onChangeText('message');
    wrapper.update();

    // TouchableOpacity should now not be disabled
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().disabled).to.be.false;

    // Press button
    wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({} as any);
    await wait(0);
    wrapper.update();

    // TouchableOpacity should now not be disabled as request is loading
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().disabled).to.be.true;

    // Wait for request
    await wait(0);
    wrapper.update();

    // Textinput value should have been reset and button should still be disabled
    expect(wrapper.find(TextInput).first().props().value).to.equal('');
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().disabled).to.be.true;

    /**
     * Test cach has been updated with new node
     */
    const resAfter = await client.readQuery<getStreamMessages, getStreamMessagesVariables>({
      query: GET_STREAM_MESSAGES_QUERY,
      variables,
    });
    expect(resAfter.getStreamMessages.messages.length).to.equal(6);
    expect(resAfter.getStreamMessages.count).to.equal(51);

    // Node should have been inserted at the begining
    expect(resAfter.getStreamMessages.messages[0].message).to.equal('message');
  });

  test('should fail', async () => {
    /**
     * Create mock client and force putStreamMessage to error
     */
    const client = mockClient({
      Mutation: () => ({
        putStreamMessage: () => {
          throw new Error();
        },
      }),
    });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <CreateStreamMessage
          variables={{
            id: 'test',
            first: 5,
            after: null,
          }}
        />
      </ApolloProvider>,
    );

    // Update value and submit
    wrapper.find(TextInput).first().props().onChangeText('message');
    wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({} as any);

    // Wait for request and update
    await wait(0);
    wrapper.update();

    // Toast should have been executed
    expect(toastSpy.callCount).to.equal(1);
  });
});
