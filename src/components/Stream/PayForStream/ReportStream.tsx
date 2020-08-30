import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { useReportStreamMutation } from '../../../API/mutation/reportStream/reportStream';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';

interface ReportStreamProps {
  id: string;
}

const ReportStream = (props: ReportStreamProps) => {
  const toast = useToast();
  const [content, setContent] = useState('');


  /**
   * Report stream mutation
   */
  const [mutation, { loading }] = useReportStreamMutation({
    variables: {
      id: props.id,
      content,
    },
    onCompleted: () => {
      // Reset content state
      setContent('');

      toast.push({
        duration: 1000,
        component: (
          <Toast content="Thank you" />
        ),
        dismissible: false,
      });
    },
    onError: (e) => {
      toast.push({
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
   * Render button to pay for stream
   */
  return (
    <View>
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder='Enter message'
        blurOnSubmit={true}
        onSubmitEditing={() => mutation()}
        returnKeyType="send"
        editable={!loading}
      />

      <Button
        title="Submit"
        onPress={() => mutation()}
        disabled={loading || content.length === 0}
      />
    </View>
  );
};

export default ReportStream;
