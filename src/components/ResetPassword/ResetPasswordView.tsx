import { Button } from 'react-native';
import React, { useState } from 'react';
import Form from '../hoc/Form/Form';
import { InitialConfig } from '../hoc/Form/FormInterfaces';
import { resetPasswordVariables } from '../../API/mutation/resetPassword/__generated__/resetPassword';

export interface ResetPasswordViewProps {
  loading: boolean;
  onSubmit: (variables: resetPasswordVariables) => void;
}

class ResetPasswordForm extends Form<resetPasswordVariables> {}

const ResetPasswordView = (props: ResetPasswordViewProps) => {
  const [config] = useState<InitialConfig>({
    Password: {
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      value: '',
      required: true,
      textInputProps: {
        style: {
          borderColor: 'black',
          borderWidth: 1,
        },
      },
    },
  });

  return (
    <ResetPasswordForm
      config={config}
      onSubmit={props.onSubmit}
    >
      {({ fields: { Password }, valid, triggerSubmit }) => (
        <>
          {Password}

          <Button
            title='Reset password?'
            onPress={triggerSubmit}
            disabled={!valid || props.loading}
          />
        </>
      )}
    </ResetPasswordForm>
  );
};

export default ResetPasswordView;
