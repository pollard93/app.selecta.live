import React, { useRef } from 'react';
import { ScrollView, TextInput, Text, Button } from 'react-native';
import { useForm } from 'react-hook-form';
import { useRegisterChannelMutation } from '../../../API/mutation/registerChannel/registerChannel';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { registerChannelVariables } from '../../../API/mutation/registerChannel/__generated__/registerChannel';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { pushToast } from '../../../modules/Toast';

type FormData = {
  name: string;
  description: string;
};

const RegisterChannel = () => {
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty } } = useForm<FormData>({ mode: 'onChange' });
  const descriptionRef = useRef(null);


  /**
   * Register channel mutation
   */
  const [mutation, { loading }] = useRegisterChannelMutation({
    onError: (e) => {
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * On submit
   */
  const onSubmit = (variables: registerChannelVariables) => {
    mutation({
      variables,
    });
  };


  return (
    <ScrollView style={GlobalStyles.PageFill}>
      <TextInput
        ref={() => {
          register({ name: 'name' }, { required: true, validate: (v) => v && v.length });
        }}
        onChangeText={(text) => setValue('name', text, true)}
        placeholder="Name"
        returnKeyType="next"
        onSubmitEditing={() => {
          // eslint-disable-next-line no-unused-expressions
          descriptionRef.current?.focus();
        }}
      />
      {errors.name && <Text>This is required.</Text>}

      <TextInput
        ref={(e) => {
          register({ name: 'description' }, { required: true, validate: (v) => v && v.length });
          descriptionRef.current = e;
        }}
        onChangeText={(text) => setValue('description', text, true)}
        placeholder="Description"
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onSubmit)}
      />
      {errors.description && <Text>This is required.</Text>}

      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        disabled={loading || !isValid || !dirty}
      />
    </ScrollView>
  );
};

export default RegisterChannel;
