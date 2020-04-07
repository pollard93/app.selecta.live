import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { useReportStreamMutation } from '../../../API/mutation/reportStream/reportStream';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import Input from '../../UI/Input/Input';

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
          <Toast content={getGQLErrorMessage(e)} />
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
      <Input
        type="text"
        name="search"
        required={false}
        value={content}
        onChange={setContent}
        textInputProps={{
          placeholder: 'Enter message',
          blurOnSubmit: true,
          onSubmitEditing: () => mutation(),
          returnKeyType: 'send',
          editable: !loading,
        }}
        originalValue={null}
        originalValid={null}
        touched={null}
        changed={null}
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
