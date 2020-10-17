import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import { validate as validateEmail } from 'email-validator';
import { useForm } from 'react-hook-form';
import Styles from './RequestPasswordReset.style';
import H1 from '../UI/Typography/components/H1';
import TextInput from '../UI/Form/components/TextInput/TextInput';
import OnboardingPageWrap from '../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import Icon, { ICON } from '../UI/Icon/Icon';
import LoadingIcon from '../UI/LoadingIcon/LoadingIcon';

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
              style={Styles.section}
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

                <H1>Request a new password</H1>
              </View>

              <View>
                <TextInput
                  style={Styles.input}
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
                  onboarding
                  testID="email"
                />

                <TouchableOpacity
                  style={Styles.arrow}
                  onPress={handleSubmit(props.onSubmit)}
                  disabled={props.loading}
                  testID="submit"
                >
                  {
                    props.loading
                      ? (
                        <LoadingIcon testID="submitLoading" size="small" />
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
};

export default RequestPasswordResetView;
