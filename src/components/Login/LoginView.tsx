import { Button } from 'react-native';
import React, { useState } from 'react';
import Form from '../hoc/Form/Form';
import { InitialConfig } from '../hoc/Form/FormInterfaces';
import { loginVariables } from '../../API/mutation/login/__generated__/login';

export interface LoginViewProps {
  loading: boolean;
  reset: boolean;
  onSubmit: (variables: loginVariables) => void;
  onReset: () => void;
  onRegister: () => void;
}

type LoginForm = new () => Form<loginVariables>;
const LoginForm = Form as LoginForm;

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
      required: !props.reset,
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
      {({ fields: { Email, Password }, valid, triggerSubmit }) => {
        let buttonTitle = props.loading ? 'Logging in' : 'Login';

        if (props.reset) {
          buttonTitle = props.loading ? 'Requesting Reset' : 'Request Reset';
        }

        return (
          <>
            {Email}
            {!props.reset && Password}
            <Button
              disabled={!valid}
              title={buttonTitle}
              onPress={triggerSubmit}
            />
            {!props.reset && (
              <Button
                title='Forgotten Password?'
                onPress={props.onReset}
                disabled={props.loading}
              />
            )}
            <Button
              title='Register'
              onPress={props.onRegister}
              disabled={props.loading}
            />
          </>
        );
      }}
    </LoginForm>
  );
};

export default LoginView;
