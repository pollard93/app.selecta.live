import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { CHANNEL_SELF_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_SELF_FRAGMENT';
import { useWithdrawFundsMutation } from '../../../API/mutation/withdrawFunds/withdrawFunds';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { pushToast } from '../../../modules/Toast';

interface ChannelFundsProps {
  data: CHANNEL_SELF_FRAGMENT;
}

const ChannelFunds = (props: ChannelFundsProps) => {
  /**
   * Withdraw funds mutation
   */
  const [mutation, { loading }] = useWithdrawFundsMutation({
    onCompleted: () => {
      /**
       * Success toast
       */
      pushToast({
        duration: 1000,
        component: (
          <Toast content='Updated channel' />
        ),
        dismissible: false,
      });
    },
    onError: (e) => {
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * On withdraw show alert to confirm action
   */
  const onWithdraw = () => {
    Alert.alert(
      'Are you sure you want to withdraw all of your funds?',
      '',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => mutation() },
      ],
    );
  };


  return (
    <View>
      <Text>Pending Credit: {props.data.pendingCredit}</Text>
      <Text>Credit: {props.data.credit}</Text>
      <Text>Value of credit: £{(props.data.credit * props.data.creditWithdrawalValue) / 100}</Text>

      <Button
        title="Withdraw Funds"
        onPress={onWithdraw}
        disabled={loading || props.data.credit < props.data.creditWithdrawalMinimum}
      />
    </View>
  );
};

export default ChannelFunds;
