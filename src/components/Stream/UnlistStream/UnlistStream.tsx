import React, { FC } from 'react';
import { Alert } from 'react-native';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import { useUnlistStreamMutation } from '../../../API/mutation/unlistStream/unlistStream';
import { getGQLErrorMessage } from '../../../utils/functions';
import Toast from '../../UI/Toast/Toast';
import Button from '../../UI/Button/Button';
import { pushToast } from '../../../modules/Toast';

interface UnlistStreamProps {
  data: STREAM_SELF_FRAGMENT;
}

const UnlistStream: FC<UnlistStreamProps> = (props) => {
  /**
   * Publish stream mutation
   */
  const [mutation, { loading }] = useUnlistStreamMutation({
    variables: {
      id: props.data.id,
      list: props.data.unlisted !== null,
    },
    onCompleted: ({ unlistStream }) => {
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="SUCCESS"
            content={unlistStream.unlisted ? 'Stream unlisted' : 'Stream listed'}
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
   * On publish show alert to confirm action
   */
  const onSubmit = () => {
    Alert.alert(
      `Are you sure you want to ${props.data.unlisted ? 'list' : 'unlist'} this stream?`,
      props.data.unlisted ? 'Users will be able to access this stream.' : 'Users will not be able to access this stream.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => mutation() },
      ],
    );
  };


  return (
    <Button
      title={props.data.unlisted ? 'List' : 'Unlist'}
      onPress={onSubmit}
      disabled={loading}
      type="SECONDARY"
    />
  );
};

export default UnlistStream;
