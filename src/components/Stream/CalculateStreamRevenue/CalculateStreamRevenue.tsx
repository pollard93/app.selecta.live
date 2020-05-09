import React, { useState } from 'react';
import Slider from '@react-native-community/slider';
import { View, Text } from 'react-native';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';

const CalculateStreamRevenue = () => {
  const { data: { getChannelSelf } } = useGetChannelSelfQuery();
  const [cost, setCost] = useState(0);
  const [consumers, setConsumers] = useState(0);

  return (
    <View>
      <Text>Cost: {cost}</Text>
      <Slider
        testID="CostSlider"
        style={{ width: 200, height: 40 }}
        step={1}
        value={getChannelSelf.creditMinimumStreamCost}
        minimumValue={getChannelSelf.creditMinimumStreamCost}
        maximumValue={100}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={setCost}
      />

      <Text>Estimated consumers {consumers}</Text>
      <Slider
        testID="ConsumerSlider"
        style={{ width: 200, height: 40 }}
        step={1}
        value={1}
        minimumValue={1}
        maximumValue={10000}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={setConsumers}
      />

      <Text>Estimated Revenue: £{(cost * consumers * getChannelSelf.creditWithdrawalValue) / 100}</Text>
    </View>
  );
};

export default CalculateStreamRevenue;
