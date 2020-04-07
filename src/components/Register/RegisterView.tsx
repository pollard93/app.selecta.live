import { Button, ScrollView, TextInput, Text } from 'react-native';
import React, { useRef } from 'react';
import { validate as validateEmail } from 'email-validator';
import { useForm } from 'react-hook-form';
import { registerVariables } from '../../API/mutation/register/__generated__/register';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';

export interface RegisterViewProps {
  loading: boolean,
  onSubmit: (variables: registerVariables) => void;
}

type FormData = {
  email: string;
  password: string;
};

const RegisterView = (props: RegisterViewProps) => {
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
    </ScrollView>
  );
};

export default RegisterView;
