import { Button } from 'react-native';
import React, { useState } from 'react';
import Form from '../hoc/Form/Form';
import { InitialConfig } from '../hoc/Form/FormInterfaces';
import { loginVariables } from '../../API/mutation/login/__generated__/login';
import LoginWithFacebook from './components/LoginWithFacebook/LoginWithFacebook';
import LoginWithGoogle from './components/LoginWithGoogle/LoginWithGoogle';

export interface LoginViewProps {
  loading: boolean;
  onSubmit: (variables: loginVariables) => void;
  onReset: () => void;
  onRegister: () => void;
}

class LoginForm extends Form<loginVariables> {}

const LoginView = (props: LoginViewProps) => {
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
    <LoginForm
      config={config}
      onSubmit={props.onSubmit}
    >
      {({ fields: { Email, Password }, valid, triggerSubmit }) => (
        <>
          {Email}
          {Password}

          <Button
            disabled={!valid || props.loading}
            title={props.loading ? 'Logging in' : 'Login'}
            onPress={triggerSubmit}
          />

          <Button
            title='Forgotten Password?'
            onPress={props.onReset}
            disabled={props.loading}
          />

          <Button
            title='Register'
            onPress={props.onRegister}
            disabled={props.loading}
          />

          <LoginWithFacebook />
          <LoginWithGoogle />
        </>
      )}
    </LoginForm>
  );
};

export default LoginView;
