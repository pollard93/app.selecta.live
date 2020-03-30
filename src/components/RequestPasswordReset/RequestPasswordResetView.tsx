import React, { useState } from 'react';
import { Button, Text } from 'react-native';
import { requestPasswordResetVariables } from '../../API/mutation/requestPasswordReset/__generated__/requestPasswordReset';
import { InitialConfig } from '../hoc/Form/FormInterfaces';
import Form from '../hoc/Form/Form';

export interface RequestPasswordResetViewProps {
  complete: boolean;
  loading: boolean;
  onSubmit: (variables: requestPasswordResetVariables) => void;
}

class RequestPasswordResetViewForm extends Form<requestPasswordResetVariables> {}

const RequestPasswordResetView = (props: RequestPasswordResetViewProps) => {
  const [config] = useState<InitialConfig>({
    Email: {
      type: 'email',
      name: 'email',
      value: '',
      required: true,
      textInputProps: {
        placeholder: 'Email',
        keyboardType: 'email-address',
        autoCapitalize: 'none',
      },
    },
  });


  if (props.complete) {
    return <Text>Please check your email</Text>;
  }


  return (
    <RequestPasswordResetViewForm
      config={config}
      onSubmit={props.onSubmit}
    >
      {({ fields: { Email }, valid, triggerSubmit }) => (
        <>
          {Email}
          <Button
            disabled={!valid || props.loading}
            title="Reset Password"
            onPress={triggerSubmit}
          />
        </>
      )}
    </RequestPasswordResetViewForm>
  );
};

export default RequestPasswordResetView;
