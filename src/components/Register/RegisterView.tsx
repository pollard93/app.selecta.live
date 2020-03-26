import { Button } from 'react-native';
import React, { useState } from 'react';
import Form from '../hoc/Form/Form';
import { registerVariables } from '../../API/mutation/register/__generated__/register';
import { InitialConfig } from '../hoc/Form/FormInterfaces';

export interface RegisterViewProps {
  loading: boolean,
  onSubmit: (variables: registerVariables) => void;
}

class RegisterForm extends Form<registerVariables> {}

const RegisterView = (props: RegisterViewProps) => {
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
    Password: {
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      value: '',
      required: true,
      textInputProps: {
        placeholder: 'Password',
      },
    },
  });

  return (
    <RegisterForm
      config={config}
      onSubmit={props.onSubmit}
    >
      {({ fields: { Email, Password }, valid, triggerSubmit }) => (
        <>
          {Email}
          {Password}
          <Button
            disabled={!valid || props.loading}
            title={props.loading ? 'Loading' : 'Register'}
            onPress={triggerSubmit}
          />
        </>
      )}
    </RegisterForm>
  );
};

export default RegisterView;
