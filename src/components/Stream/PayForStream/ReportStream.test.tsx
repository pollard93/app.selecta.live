import React from 'react';
import { mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider, wait } from '@apollo/react-testing';
import { expect } from 'chai';
import { TextInput, Button } from 'react-native';
import Sinon from 'sinon';
import { useToast } from 'mbp-components-rn-toast';
import mockClient from '../../../API/utils/mockClient';
import ReportStream from './ReportStream';
import { REPORT_STREAM_MUTATION } from '../../../API/mutation/reportStream/reportStream';

const client = mockClient();

describe('<ReportStream />', () => {
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
     * Mount
     */
    const wrapper = mount(
      <ApolloProvider client={client}>
        <ReportStream
          id="test"
        />
      </ApolloProvider>,
    );

    // TextInput initial value should be empty
    expect(wrapper.find(TextInput).first().props().value).to.equal('');

    // Button should be disabled
    expect(wrapper.find(Button).first().props().disabled).to.be.true;

    // Update value
    wrapper.find(TextInput).first().props().onChangeText('message');
    wrapper.update();

    // Button should now not be disabled
    expect(wrapper.find(Button).first().props().disabled).to.be.false;

    // Press button
    wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

    // Button should now not be disabled as request is loading
    expect(wrapper.find(Button).first().props().disabled).to.be.true;

    // Wait for request
    await wait(0);
    wrapper.update();

    // Textinput value should have been reset and button should still be disabled
    expect(wrapper.find(TextInput).first().props().value).to.equal('');
    expect(wrapper.find(Button).first().props().disabled).to.be.true;

    // Toast should have been executed
    expect(toastSpy.callCount).to.equal(1);
  });

  test('should fail', async () => {
    const mocks = [{
      request: {
        query: REPORT_STREAM_MUTATION,
      },
      error: new Error(),
    }];

    const wrapper = mount(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <ReportStream
          id="test"
        />
      </MockedProvider>,
    );

    // Update value and submit
    wrapper.find(TextInput).first().props().onChangeText('message');
    wrapper.find(Button).first().props().onPress({} as any);

    // Wait for request and update
    await wait(0);
    wrapper.update();

    // Toast should have been executed
    expect(toastSpy.callCount).to.equal(1);
  });
});
