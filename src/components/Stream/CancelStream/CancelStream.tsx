import React from 'react';
import { Text, Button, Alert } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import { useCancelStreamMutation } from '../../../API/mutation/cancelStream/cancelStream';
import { getGQLErrorMessage } from '../../../utils/functions';
import Toast from '../../UI/Toast/Toast';

interface CancelStreamProps {
  data: STREAM_SELF_FRAGMENT;
}

const CancelStream = (props: CancelStreamProps) => {
  const toast = useToast();


  /**
   * Cancel stream mutation
   */
  const [mutation, { loading }] = useCancelStreamMutation({
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
   * If cancelled render here
   */
  if (props.data.cancelled) {
    return (
      <Text testID="Cancelled">Stream cancelled on {props.data.cancelled}</Text>
    );
  }


  /**
   * On cancel show alert to confirm action
   */
  const onCancel = () => {
    Alert.alert(
      'Are you sure you want to cancel stream?',
      'This action is irreversible.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => mutation() },
      ],
    );
  };


  return (
    <Button
      title="Cancel stream"
      onPress={onCancel}
      disabled={loading}
    />
  );
};

export default CancelStream;
