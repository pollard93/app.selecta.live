import React from 'react';
import { View, Text, Button } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { usePayForStreamMutation } from '../../../API/mutation/payForStream/payForStream';
import { STREAM_PROFILE_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';

interface PayForStreamProps {
  data: STREAM_PROFILE_FRAGMENT;
}

const PayForStream = (props: PayForStreamProps) => {
  const toast = useToast();


  /**
   * Pay for stream mutation
   */
  const [mutation, { loading }] = usePayForStreamMutation({
    variables: {
      id: props.data.id,
    },
    onError: (e) => {
      toast.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * If paid for render here
   */
  if (props.data.isConsumer) {
    return (
      <Text>You have paid for this stream</Text>
    );
  }


  /**
   * Render button to pay for stream
   */
  return (
    <View>
      <Button
        title="Pay for stream"
        onPress={() => mutation()}
        disabled={loading}
      />
    </View>
  );
};

export default PayForStream;
