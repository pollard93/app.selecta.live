import React, { useRef } from 'react';
import { TextInput, Button, Text, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { validate as validateEmail } from 'email-validator';
import { loginVariables } from '../../API/mutation/login/__generated__/login';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import LoginWithFacebook from './components/LoginWithFacebook/LoginWithFacebook';
import LoginWithGoogle from './components/LoginWithGoogle/LoginWithGoogle';

export interface LoginViewProps {
  loading: boolean;
  onSubmit: (variables: loginVariables) => void;
  onReset: () => void;
  onRegister: () => void;
}

type FormData = {
  email: string;
  password: string;
};

const LoginView = (props: LoginViewProps) => {
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty } } = useForm<FormData>({ mode: 'onChange' });
  const passwordRef = useRef(null);

  return (
    <ScrollView style={GlobalStyles.PageFill}>
      <TextInput
        ref={() => {
          register({ name: 'email' }, { required: true, validate: validateEmail });
        }}
        onChangeText={(text) => setValue('email', text, true)}
        placeholder="Email"
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => {
          if (passwordRef.current) {
            passwordRef.current.focus();
          }
        }}
      />
      {errors.email && <Text>This is required.</Text>}

      <TextInput
        ref={(e) => {
          register({ name: 'password' }, { required: true, pattern: /^.{6,}$/ });
          passwordRef.current = e;
        }}
        onChangeText={(text) => setValue('password', text, true)}
        placeholder="Password"
        secureTextEntry
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="done"
        onSubmitEditing={handleSubmit(props.onSubmit)}
      />
      {errors.password && <Text>This is required.</Text>}

      <Button
        title="Submit"
        onPress={handleSubmit(props.onSubmit)}
        disabled={props.loading || !isValid || !dirty}
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
    </ScrollView>
  );
};

export default LoginView;
