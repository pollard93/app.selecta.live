import React, { useState, memo, FC } from 'react';
import { usePutStreamCommentMutation } from '../../../API/mutation/putStreamComment/putStreamComment';
import { getStreamCommentsVariables, getStreamComments } from '../../../API/query/getStreamComments/__generated__/getStreamComments';
import { GET_STREAM_COMMENTS_QUERY } from '../../../API/query/getStreamComments/getStreamComments';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import MessageInput from '../../UI/Form/components/MessageInput/MessageInput';
import { pushToast } from '../../../modules/Toast';

interface CreateStreamCommentProps {
  variables: getStreamCommentsVariables; // Variables for query to append to cache
}

const CreateStreamComment: FC<CreateStreamCommentProps> = (props) => {
  const [comment, setComment] = useState('');


  /**
   * Put stream comment mutation
   * Appends new comment to cache on completion
   */
  const [mutation, { loading, client }] = usePutStreamCommentMutation({
    variables: {
      id: props.variables.id,
      comment,
    },
    onCompleted: ({ putStreamComment }) => {
      // Reset comment state
      setComment('');

      // Prepend comment to cache
      try {
        const data = client.readQuery<getStreamComments, getStreamCommentsVariables>({
          query: GET_STREAM_COMMENTS_QUERY,
          variables: props.variables,
        });

        /**
         * If id already exists in cache then return
         * Subscription may have got there first
         */
        if (data.getStreamComments.comments.find((m) => m.id === putStreamComment.id)) return;

        client.writeQuery({
          query: GET_STREAM_COMMENTS_QUERY,
          variables: props.variables,
          data: {
            ...data,
            getStreamComments: {
              ...data.getStreamComments,
              comments: [putStreamComment, ...data.getStreamComments.comments],
              count: data.getStreamComments.count + 1,
            },
          },
        });
      // eslint-disable-next-line no-empty
      } catch (e) {}
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
   * Handle submission
   */
  const onSubmit = async () => {
    mutation();
  };


  return (
    <MessageInput
      message={comment}
      setMessage={setComment}
      placeholder="Type your comment here..."
      onSubmit={onSubmit}
      editable={!loading}
      disabled={loading || comment.length === 0}
    />
  );
};

export default memo(CreateStreamComment);
