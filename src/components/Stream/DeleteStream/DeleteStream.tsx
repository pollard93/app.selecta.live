import React from 'react';
import { Alert } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import { useDeleteStreamMutation } from '../../../API/mutation/deleteStream/deleteStream';
import { getGQLErrorMessage } from '../../../utils/functions';
import Toast from '../../UI/Toast/Toast';
import Button from '../../UI/Button/Button';

interface DeleteStreamProps {
  data: STREAM_SELF_FRAGMENT;
}

const DeleteStream = (props: DeleteStreamProps) => {
  const toast = useToast();


  /**
   * Delete stream mutation
   */
  const [mutation, { loading }] = useDeleteStreamMutation({
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
   * On delete show alert to confirm action
   */
  const onDelete = () => {
    Alert.alert(
      'Are you sure you want to delete this stream?',
      'This action is irreversible.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => mutation() },
      ],
    );
  };


  return (
    <Button
      title="Delete"
      type="SECONDARY"
      onPress={onDelete}
      disabled={loading}
    />
  );
};

export default DeleteStream;
