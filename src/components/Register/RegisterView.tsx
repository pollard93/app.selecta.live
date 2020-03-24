import { Button } from 'react-native';
import React from 'react';
import Form from '../hoc/Form/Form';
import { registerVariables } from '../../API/mutation/register/__generated__/register';

export interface RegisterViewProps {
  loading: boolean,
  onSubmit: (variables: registerVariables) => void;
}

type RegisterForm = new () => Form<registerVariables>;
const RegisterForm = Form as RegisterForm;

const RegisterView = (props: RegisterViewProps) => (
  <Form
    config={{
      Email: {
        type: 'email',
        name: 'email',
        value: '',
        required: true,
        textInputProps: {
          style: {
            borderColor: 'black',
            borderWidth: 1,
          },
        },
      },
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
    }}
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
  </Form>
);

export default RegisterView;
