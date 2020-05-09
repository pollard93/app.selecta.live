import React from 'react';
import { mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { expect } from 'chai';
import mockClient from '../../../API/utils/mockClient';
import CalculateStreamRevenue from './CalculateStreamRevenue';
import { getChannelSelf } from '../../../API/query/getChannelSelf/__generated__/getChannelSelf';
import { GET_CHANNEL_SELF_QUERY } from '../../../API/query/getChannelSelf/getChannelSelf';

const client = mockClient();

describe('<CalculateStreamRevenue />', () => {
  test('should succeed', async () => {
    /**
     * Execute getChannelSelf query to set in cache
     */
    const { data } = await client.query<getChannelSelf>({
      query: GET_CHANNEL_SELF_QUERY,
    });


    /**
     * Mount
     */
    const wrapper = mount(
      <ApolloProvider client={client}>
        <CalculateStreamRevenue />
      </ApolloProvider>,
    );

    // Test cost slider props
    expect(wrapper.findWhere((n) => n.props().testID === 'CostSlider').first().props().value).to.equal(data.getChannelSelf.creditMinimumStreamCost);
    expect(wrapper.findWhere((n) => n.props().testID === 'CostSlider').first().props().minimumValue).to.equal(data.getChannelSelf.creditMinimumStreamCost);

    // Test consumers slider props
    expect(wrapper.findWhere((n) => n.props().testID === 'ConsumerSlider').first().props().value).to.equal(1);

    // Test initial calculation
    const cost = wrapper.findWhere((n) => n.props().testID === 'CostSlider').first().props().value;
    const consumers = wrapper.findWhere((n) => n.props().testID === 'ConsumerSlider').first().props().value;
    expect(wrapper.contains(`Estimated Revenue: £${(cost * consumers * data.getChannelSelf.creditWithdrawalValue) / 100}`));

    // Update sliders and test again
    wrapper.findWhere((n) => n.props().testID === 'CostSlider').first().props().onValueChange(100);
    wrapper.findWhere((n) => n.props().testID === 'ConsumerSlider').first().props().onValueChange(100);
    wrapper.update();

    // Test updated calculation
    const cost1 = wrapper.findWhere((n) => n.props().testID === 'CostSlider').first().props().value;
    const consumers1 = wrapper.findWhere((n) => n.props().testID === 'ConsumerSlider').first().props().value;
    expect(wrapper.contains(`Estimated Revenue: £${(cost1 * consumers1 * data.getChannelSelf.creditWithdrawalValue) / 100}`));
  });
});
