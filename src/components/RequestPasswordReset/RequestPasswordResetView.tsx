import React, { useEffect } from 'react';
import { View } from 'react-native';
import { validate as validateEmail } from 'email-validator';
import { useForm } from 'react-hook-form';
import Styles from './RequestPasswordReset.style';
import H4 from '../UI/Typography/components/H4';
import TextInput from '../UI/Form/components/TextInput/TextInput';
import Button from '../UI/Button/Button';
import OnboardingPageWrap from '../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';

export interface RequestPasswordResetViewProps {
  defaultEmailValue: string;
  loading: boolean;
  onSubmit: (variables: FormData) => void;
  onPop: () => void;
}

export type FormData = {
  email: string;
};

const RequestPasswordResetView = (props: RequestPasswordResetViewProps) => {
  const { register, setValue, handleSubmit, errors, triggerValidation } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      email: props.defaultEmailValue,
    },
  });


  /**
   * Register form
   */
  useEffect(() => {
    register(
      { name: 'email' },
      { required: true, validate: validateEmail },
    );
  }, [register]);


  return (
    <OnboardingPageWrap
      heading="Reset Password"
      onPop={props.onPop}
    >
      <View style={Styles.input}>
        <H4 style={Styles.content}>Enter your email and we'll send you a magic link to reset your password.</H4>

        <TextInput
          name="email"
          onChangeText={(text) => {
            // Validate on change if there's an error, otherwise validate onBlur
            setValue('email', text, !!errors.email);
          }}
          placeholder="Enter your email"
          autoCompleteType="email"
          keyboardType="email-address"
          returnKeyType="done"
          autoCapitalize="none"
          errors={errors}
          onBlur={() => triggerValidation('email')}
          onSubmitEditing={handleSubmit(props.onSubmit)}
          defaultValue={props.defaultEmailValue}
          testID="email"
        />
      </View>

      <Button
        title={props.loading ? 'Requesting reset' : 'Request password reset'}
        onPress={handleSubmit(props.onSubmit)}
        loading={props.loading}
        testID="submit"
      />
    </OnboardingPageWrap>
  );
};

export default RequestPasswordResetView;
