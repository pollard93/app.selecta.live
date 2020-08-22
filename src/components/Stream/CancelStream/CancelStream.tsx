import React, { FC } from 'react';
import { Alert } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import { useCancelStreamMutation } from '../../../API/mutation/cancelStream/cancelStream';
import { getGQLErrorMessage } from '../../../utils/functions';
import Toast from '../../UI/Toast/Toast';
import Button from '../../UI/Button/Button';

interface CancelStreamProps {
  data: STREAM_SELF_FRAGMENT;
}

const CancelStream: FC<CancelStreamProps> = (props) => {
  const toast = useToast();


  /**
   * Cancel stream mutation
   */
  const [mutation, { loading }] = useCancelStreamMutation({
    variables: {
      id: props.data.id,
    },
    onCompleted: () => {
      toast.push({
        duration: 1000,
        component: (
          <Toast content="Stream cancelled" />
        ),
        dismissible: false,
      });
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
      type="SECONDARY"
      onPress={onCancel}
      disabled={loading}
    />
  );
};

export default CancelStream;
