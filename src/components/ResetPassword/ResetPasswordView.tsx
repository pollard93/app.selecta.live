import { View } from 'react-native';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../UI/Button/Button';
import TextInput from '../UI/Form/components/TextInput/TextInput';
import Styles from './ResetPassword.style';
import OnboardingPageWrap from '../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import H4 from '../UI/Typography/components/H4';

export interface ResetPasswordViewProps {
  loading: boolean;
  onSubmit: (variables: FormData) => void;
  onPop: () => void;
}

export type FormData = {
  password: string;
};

const ResetPasswordView = (props: ResetPasswordViewProps) => {
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty }, triggerValidation } = useForm<FormData>({
    mode: 'onChange',
  });


  /**
   * Register form
   */
  useEffect(() => {
    register({ name: 'password' }, { required: true, pattern: /^.{6,}$/ });
  }, [register]);


  return (
    <OnboardingPageWrap heading="Reset Password">
      <View style={Styles.input}>
        <H4 style={Styles.content}>Enter your new password</H4>

        <TextInput
          name="password"
          onChangeText={(text) => {
            // Validate on change if there's an error, otherwise validate onBlur
            setValue('password', text, !!errors.password);
          }}
          placeholder="Enter new password"
          secureTextEntry
          autoCompleteType="password"
          autoCapitalize="none"
          returnKeyType="done"
          errors={errors}
          onBlur={() => triggerValidation('password')}
          onSubmitEditing={handleSubmit(props.onSubmit)}
          testID="password"
          light
        />
      </View>

      <Button
        title={props.loading ? 'Resetting password' : 'Reset password'}
        onPress={handleSubmit(props.onSubmit)}
        disabled={!isValid || !dirty}
        loading={props.loading}
        testID="submit"
      />
    </OnboardingPageWrap>
  );
};

export default ResetPasswordView;
