import React from 'react';
import { mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { wait } from '@apollo/react-testing';
import { expect } from 'chai';
import Sinon from 'sinon';
import { useToast } from 'mbp-components-rn-toast';
import mockClient from '../../../API/utils/mockClient';
import CreateStreamComment from './CreateStreamComment';
import { GET_STREAM_COMMENTS_QUERY } from '../../../API/query/getStreamComments/getStreamComments';
import { getStreamComments, getStreamCommentsVariables } from '../../../API/query/getStreamComments/__generated__/getStreamComments';
import * as AClientModule from '../../../ApolloClient';
import TextInput from '../../UI/Form/components/TextInput';


describe('<CreateStreamComment />', () => {
  /**
   * Define sandbox and spies
   */
  const sandbox = Sinon.createSandbox();
  let toastSpy = sandbox.spy(useToast(), 'push');
  let getChannelTokenSpy = sandbox.spy(AClientModule, 'getChannelToken');

  afterEach(() => {
    sandbox.restore();

    toastSpy = sandbox.spy(useToast(), 'push');
    getChannelTokenSpy = sandbox.spy(AClientModule, 'getChannelToken');
  });


  test('should succeed', async () => {
    const client = mockClient();

    const variables = {
      id: 'test',
      first: 5,
      after: null,
    };

    /**
     * Execute getStreamComments query to set in cache
     */
    const resBefore = await client.query<getStreamComments, getStreamCommentsVariables>({
      query: GET_STREAM_COMMENTS_QUERY,
      variables,
    });
    expect(resBefore.data.getStreamComments.comments.length).to.equal(5);
    expect(resBefore.data.getStreamComments.count).to.equal(50);

    /**
     * Mount
     */
    const wrapper = mount(
      <ApolloProvider client={client}>
        <CreateStreamComment
          variables={variables}
        />
      </ApolloProvider>,
    );

    // TextInput initial value should be empty
    expect(wrapper.find(TextInput).first().props().value).to.equal('');

    // TouchableOpacity should be disabled
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().disabled).to.be.true;

    // Update value
    wrapper.find(TextInput).first().props().onChangeText('comment');
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

    // Test getChannelToken was called
    expect(getChannelTokenSpy.callCount).to.equal(1);

    // Textinput value should have been reset and button should still be disabled
    expect(wrapper.find(TextInput).first().props().value).to.equal('');
    expect(wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().disabled).to.be.true;

    /**
     * Test cach has been updated with new node
     */
    const resAfter = await client.readQuery<getStreamComments, getStreamCommentsVariables>({
      query: GET_STREAM_COMMENTS_QUERY,
      variables,
    });
    expect(resAfter.getStreamComments.comments.length).to.equal(6);
    expect(resAfter.getStreamComments.count).to.equal(51);

    // Node should have been inserted at the begining
    expect(resAfter.getStreamComments.comments[0].comment).to.equal('comment');
  });

  test('should fail', async () => {
    /**
     * Create mock client and force putStreamComment to error
     */
    const client = mockClient({
      Mutation: () => ({
        putStreamComment: () => {
          throw new Error();
        },
      }),
    });

    const wrapper = mount(
      <ApolloProvider client={client}>
        <CreateStreamComment
          variables={{
            id: 'test',
            first: 5,
            after: null,
          }}
        />
      </ApolloProvider>,
    );

    // Update value and submit
    wrapper.find(TextInput).first().props().onChangeText('comment');
    wrapper.findWhere((n) => n.prop('testID') === 'submit').first().props().onPress({} as any);

    // Wait for request and update
    await wait(0);
    wrapper.update();

    // Toast should have been executed
    expect(toastSpy.callCount).to.equal(1);
  });
});
