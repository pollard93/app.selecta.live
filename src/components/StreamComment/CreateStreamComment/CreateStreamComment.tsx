import React, { useState, memo, FC } from 'react';
import { View } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDynamicValue } from 'react-native-dynamic';
import { usePutStreamCommentMutation } from '../../../API/mutation/putStreamComment/putStreamComment';
import { getStreamCommentsVariables, getStreamComments } from '../../../API/query/getStreamComments/__generated__/getStreamComments';
import { GET_STREAM_COMMENTS_QUERY } from '../../../API/query/getStreamComments/getStreamComments';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { getChannelToken } from '../../../ApolloClient';
import Styles, { DynamicStyles } from './CreateStreamComment.styles';
import color from '../../../styles/definitions/color';
import Icon, { ICON } from '../../UI/Icon/Icon';
import TextInput from '../../UI/Form/components/TextInput/TextInput';

interface CreateStreamCommentProps {
  variables: getStreamCommentsVariables; // Variables for query to append to cache
}

const CreateStreamComment: FC<CreateStreamCommentProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);
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
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * Handle submission
   */
  const onSubmit = async () => {
    mutation();
  };


  const disabled = loading || comment.length === 0;


  return (
    <View style={[Styles.wrap, dynamicStyles.wrap]}>
      <TextInput
        name="comment"
        value={comment}
        onChangeText={setComment}
        placeholder='Type your comment here...'
        placeholderTextColor={color.accent.primary}
        returnKeyType="send"
        blurOnSubmit
        onSubmitEditing={() => mutation()}
        editable={!loading}
        wrapStyle={Styles.inputWrap}
        style={dynamicStyles.input}
        maxLength={280}
      />

      <TouchableOpacity
        onPress={() => onSubmit()}
        disabled={disabled}
        testID="submit"
      >
        <Icon
          name={ICON.SEND}
          size="small"
          style={[Styles.send, disabled && Styles.sendDisabled]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(CreateStreamComment);
