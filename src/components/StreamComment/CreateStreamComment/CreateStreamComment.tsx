import React, { useState, memo, FC } from 'react';
import { View } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { usePutStreamCommentMutation } from '../../../API/mutation/putStreamComment/putStreamComment';
import { getStreamCommentsVariables, getStreamComments } from '../../../API/query/getStreamComments/__generated__/getStreamComments';
import { GET_STREAM_COMMENTS_QUERY } from '../../../API/query/getStreamComments/getStreamComments';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorComment } from '../../../utils/functions';
import { getChannelToken } from '../../../ApolloClient';
import Styles from './CreateStreamComment.styles';
import color from '../../../styles/definitions/color';
import Icon, { ICON } from '../../UI/Icon/Icon';
import TextInput from '../../UI/Form/components/TextInput';

interface CreateStreamCommentProps {
  variables: getStreamCommentsVariables; // Variables for query to append to cache
}

const CreateStreamComment: FC<CreateStreamCommentProps> = (props) => {
  const toast = useToast();
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
      toast.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorComment(e)} />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * Handle submission
   * Tries to getChannelToken from local state
   * If no token exists null will be returned and ApolloClient will replace with a general token
   */
  const onSubmit = async () => {
    mutation({
      context: {
        headers: {
          authorization: await getChannelToken(client),
        },
      },
    });
  };


  const disabled = loading || comment.length === 0;


  return (
    <View style={Styles.wrap}>
      <TextInput
        name="comment"
        light
        value={comment}
        onChangeText={setComment}
        placeholder='Type your comment here...'
        placeholderTextColor={color.accent.primary}
        returnKeyType="send"
        blurOnSubmit
        onSubmitEditing={() => mutation()}
        editable={!loading}
        wrapStyle={Styles.input}
      />

      <TouchableOpacity
        onPress={() => onSubmit()}
        disabled={disabled}
      >
        <Icon
          name={ICON.PLAY}
          size="small"
          style={[Styles.send, disabled && Styles.sendDisabled]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(CreateStreamComment);
