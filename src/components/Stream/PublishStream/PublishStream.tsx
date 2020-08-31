import React from 'react';
import { Alert } from 'react-native';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import { usePublishStreamMutation } from '../../../API/mutation/publishStream/publishStream';
import { getGQLErrorMessage } from '../../../utils/functions';
import Toast from '../../UI/Toast/Toast';
import Button from '../../UI/Button/Button';
import { pushToast } from '../../../modules/Toast';

interface PublishStreamProps {
  data: STREAM_SELF_FRAGMENT;
}

const PublishStream = (props: PublishStreamProps) => {
  /**
   * Publish stream mutation
   */
  const [mutation, { loading }] = usePublishStreamMutation({
    variables: {
      id: props.data.id,
    },
    onCompleted: () => {
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="SUCCESS"
            content="Stream published"
          />
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
   * On publish show alert to confirm action
   */
  const onPublish = () => {
    Alert.alert(
      'Are you sure you want to publish this stream?',
      'This action is irreversible.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => mutation() },
      ],
    );
  };


  return (
    <Button
      title="Publish"
      onPress={onPublish}
      disabled={loading}
    />
  );
};

export default PublishStream;
