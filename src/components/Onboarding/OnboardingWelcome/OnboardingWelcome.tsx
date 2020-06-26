import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import OnboardingPageWrap from '../../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import TextInput from '../../UI/Form/components/TextInput';
import { useUpdateSelfMutation } from '../../../API/mutation/updateSelf/updateSelf';
import Button from '../../UI/Button/Button';
import Styles from './OnboardingWelcome.style';
import H4 from '../../UI/Typography/components/H4';

export type FormData = {
  name: string;
};

const OnboardingWelcome = () => {
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty }, triggerValidation } = useForm<FormData>({ mode: 'onChange' });


  /**
   * Register form
   */
  useEffect(() => {
    register({ name: 'name' }, { required: true, pattern: /^.{3,}$/ });
  }, []);


  /**
   * Update self mutation
   */
  const [mutation, { loading }] = useUpdateSelfMutation();


  /**
   * Submit
   */
  const onSubmit = (variables: FormData) => {
    mutation({
      variables,
    });
  };


  return (
    <OnboardingPageWrap heading="Welcome">
      <View style={Styles.input}>
        <H4 style={Styles.content}>Let’s get started by finding your unique name in the app.</H4>

        <TextInput
          name="name"
          light
          onChangeText={(text) => {
            // Validate on change if there's an error, otherwise validate onBlur
            setValue('name', text, !!errors.name);
          }}
          placeholder="Enter name"
          autoCompleteType="name"
          autoCapitalize="none"
          returnKeyType="done"
          errors={errors}
          onBlur={() => triggerValidation('password')}
          onSubmitEditing={handleSubmit(onSubmit)}
          testID="password"
        />
      </View>

      <Button
        title="Next"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || !dirty}
        loading={loading}
      />
    </OnboardingPageWrap>
  );
};

export default OnboardingWelcome;
