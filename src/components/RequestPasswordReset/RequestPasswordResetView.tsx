import React from 'react';
import { Button, Text, ScrollView, TextInput } from 'react-native';
import { validate as validateEmail } from 'email-validator';
import { useForm } from 'react-hook-form';
import { requestPasswordResetVariables } from '../../API/mutation/requestPasswordReset/__generated__/requestPasswordReset';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';

export interface RequestPasswordResetViewProps {
  complete: boolean;
  loading: boolean;
  onSubmit: (variables: requestPasswordResetVariables) => void;
}

type FormData = {
  email: string;
};

const RequestPasswordResetView = (props: RequestPasswordResetViewProps) => {
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty } } = useForm<FormData>({ mode: 'onChange' });


  if (props.complete) {
    return <Text>Please check your email</Text>;
  }


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
        onSubmitEditing={handleSubmit(props.onSubmit)}
      />
      {errors.email && <Text>This is required.</Text>}

      <Button
        title="Submit"
        onPress={handleSubmit(props.onSubmit)}
        disabled={props.loading || !isValid || !dirty}
      />
    </ScrollView>
  );
};

export default RequestPasswordResetView;
