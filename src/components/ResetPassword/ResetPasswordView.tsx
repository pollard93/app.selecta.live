import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../UI/Button/Button';
import TextInput from '../UI/Form/components/TextInput/TextInput';
import Styles from './ResetPassword.style';
import OnboardingPageWrap from '../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import H4 from '../UI/Typography/components/H4';
import Icon, { ICON } from '../UI/Icon/Icon';
import LoadingIcon from '../UI/LoadingIcon/LoadingIcon';
import H1 from '../UI/Typography/components/H1';

export interface ResetPasswordViewProps {
  loading: boolean;
  onSubmit: (variables: FormData) => void;
  onPop: () => void;
}

export type FormData = {
  password: string;
};

const ResetPasswordView = (props: ResetPasswordViewProps) => {
  const { register, setValue, handleSubmit, errors, triggerValidation } = useForm<FormData>({
    mode: 'onChange',
  });


  /**
   * Register form
   */
  useEffect(() => {
    register({ name: 'password' }, { required: true, pattern: /^.{6,}$/ });
  }, [register]);


  return (
    <OnboardingPageWrap>
      <SafeAreaView style={Styles.flex}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={Styles.flex}
        >
          <ScrollView
            contentContainerStyle={Styles.scrollViewWrap}
            bounces={false}
          >
            <View
              style={Styles.input}
            >
              <View style={Styles.headingWrap}>
                <TouchableOpacity
                  style={Styles.arrowBack}
                  onPress={props.onPop}
                >
                  <Icon
                    name={ICON.ARROW_BACKWARD}
                    size="small"
                  />
                </TouchableOpacity>

                <H1>Reset your password</H1>
              </View>

              <View>
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
                />

                <TouchableOpacity
                  style={Styles.arrow}
                  onPress={handleSubmit(props.onSubmit)}
                >
                  {
                    props.loading
                      ? (
                        <LoadingIcon size="small" />
                      )
                      : (
                        <Icon
                          name={ICON.ARROW_FORWARD}
                          size="small"
                        />
                      )
                  }
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </OnboardingPageWrap>
  );


  return (
    <OnboardingPageWrap
      heading="Reset Password"
      onPop={props.onPop}
    >
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
        />
      </View>

      <Button
        title={props.loading ? 'Resetting password' : 'Reset password'}
        onPress={handleSubmit(props.onSubmit)}
        loading={props.loading}
        testID="submit"
      />
    </OnboardingPageWrap>
  );
};

export default ResetPasswordView;
