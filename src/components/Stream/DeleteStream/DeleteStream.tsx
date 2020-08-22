import React, { FC } from 'react';
import { Alert } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { useApolloClient } from 'react-apollo';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import { useDeleteStreamMutation } from '../../../API/mutation/deleteStream/deleteStream';
import { getGQLErrorMessage } from '../../../utils/functions';
import Toast from '../../UI/Toast/Toast';
import Button from '../../UI/Button/Button';
import { getStreamSelfs, getStreamSelfsVariables } from '../../../API/query/getStreamSelfs/__generated__/getStreamSelfs';
import { GET_STREAM_SELFS_QUERY } from '../../../API/query/getStreamSelfs/getStreamSelfs';

interface DeleteStreamProps {
  data: STREAM_SELF_FRAGMENT;
  getStreamSelfsVariables: getStreamSelfsVariables;
  onPop?: () => void;
}

const DeleteStream: FC<DeleteStreamProps> = (props) => {
  const toast = useToast();
  const client = useApolloClient();


  /**
   * Delete stream mutation
   */
  const [mutation, { loading }] = useDeleteStreamMutation({
    variables: {
      id: props.data.id,
    },
    onCompleted: () => {
      /**
       * Remove stream from GET_STREAM_SELFS_QUERY
       */
      try {
        const queryData = client.readQuery<getStreamSelfs, getStreamSelfsVariables>({
          query: GET_STREAM_SELFS_QUERY,
          variables: props.getStreamSelfsVariables,
        });

        client.writeQuery<getStreamSelfs, getStreamSelfsVariables>({
          query: GET_STREAM_SELFS_QUERY,
          variables: props.getStreamSelfsVariables,
          data: {
            ...queryData,
            getStreamSelfs: {
              ...queryData.getStreamSelfs,
              streams: queryData.getStreamSelfs.streams.filter((s) => s.id !== props.data.id),
              count: queryData.getStreamSelfs.count - 1,
            },
          },
        });
      // eslint-disable-next-line no-empty
      } catch {}

      /**
       * Pop if given
       */
      // eslint-disable-next-line no-unused-expressions
      props.onPop?.();
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
