import { Button, ScrollView, TextInput, Text } from 'react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { resetPasswordVariables } from '../../API/mutation/resetPassword/__generated__/resetPassword';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';

export interface ResetPasswordViewProps {
  loading: boolean;
  onSubmit: (variables: resetPasswordVariables) => void;
}

type FormData = {
  password: string;
};

const ResetPasswordView = (props: ResetPasswordViewProps) => {
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty } } = useForm<FormData>({ mode: 'onChange' });


  return (
    <ScrollView style={GlobalStyles.PageFill}>
      <TextInput
        ref={() => {
          register({ name: 'password' }, { required: true, pattern: /^.{6,}$/ });
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

export default ResetPasswordView;
