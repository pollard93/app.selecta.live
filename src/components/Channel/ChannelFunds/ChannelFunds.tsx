import React, { useMemo } from 'react';
import { View, Alert } from 'react-native';
import { CHANNEL_SELF_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_SELF_FRAGMENT';
import { useWithdrawFundsMutation } from '../../../API/mutation/withdrawFunds/withdrawFunds';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage, parseCurrency } from '../../../utils/functions';
import { pushToast } from '../../../modules/Toast';
import Body from '../../UI/Typography/components/Body';
import Button from '../../UI/Button/Button';
import Styles from './ChannelFunds.style';

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
          <Toast
            type="SUCCESS"
            content='Thanks, we are processing your request and will be in touch soon!'
          />
        ),
        dismissible: true,
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
        dismissible: true,
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


  /**
   * Get credit values
   */
  const creditValue = useMemo(() => props.data.credit * props.data.creditWithdrawalValue, [props.data.credit, props.data.creditWithdrawalValue]);
  const pendingCreditValue = useMemo(() => props.data.pendingCredit * props.data.creditWithdrawalValue, [props.data.pendingCredit, props.data.creditWithdrawalValue]);


  return (
    <>
      <Body>Credit Value: <Body bold>{parseCurrency(creditValue)}</Body></Body>
      <Body>Pending Credit Value: <Body bold>{parseCurrency(pendingCreditValue)}</Body></Body>
      <Body>Minimum Withdrawal: <Body bold>{parseCurrency(props.data.creditWithdrawalMinimum, 0)}</Body></Body>

      <View style={Styles.buttonWrap}>
        <Button
          title="Withdraw Funds"
          onPress={onWithdraw}
          disabled={creditValue < props.data.creditWithdrawalMinimum}
          loading={loading}
          size="small"
        />
      </View>
    </>
  );
};

export default ChannelFunds;
