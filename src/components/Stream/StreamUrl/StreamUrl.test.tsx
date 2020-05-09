import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Button, TextInput } from 'react-native';
import mockClient from '../../../API/utils/mockClient';
import { GET_STREAM_SELF_QUERY } from '../../../API/query/getStreamSelf/getStreamSelf';
import StreamUrl from './StreamUrl';
import { getStreamSelf, getStreamSelfVariables } from '../../../API/query/getStreamSelf/__generated__/getStreamSelf';

const client = mockClient();

describe('<StreamUrl />', () => {
  test('should show and hide key', async () => {
    const { data } = await client.query<getStreamSelf, getStreamSelfVariables>({
      query: GET_STREAM_SELF_QUERY,
      variables: {
        id: 'test',
      },
    });

    /**
     * Mount
     */
    const wrapper = shallow(
      <StreamUrl data={data.getStreamSelf} />,
    );

    // Contains url
    expect(wrapper.contains(data.getStreamSelf.streamUrl));

    // TextInput should be secure as default, and value should be key
    expect(wrapper.find(TextInput).first().props().value).to.equal(data.getStreamSelf.streamKey);
    expect(wrapper.find(TextInput).first().props().secureTextEntry).to.be.true;

    // Click reveal button
    wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

    // Key should now be shown
    expect(wrapper.find(TextInput).first().props().secureTextEntry).to.be.false;

    // Click hide button
    wrapper.find(Button).first().props().onPress({} as any);
    wrapper.update();

    // Key should now be hidden
    expect(wrapper.find(TextInput).first().props().secureTextEntry).to.be.true;
  });
});
