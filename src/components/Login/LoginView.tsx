import React, { useRef, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';
import { validate as validateEmail } from 'email-validator';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import LoginWithFacebook from './components/LoginWithFacebook/LoginWithFacebook';
import LoginWithGoogle from './components/LoginWithGoogle/LoginWithGoogle';
import Styles from './Login.style';
import TextInput from '../UI/Form/components/TextInput/TextInput';
import Button from '../UI/Button/Button';
import Separator from '../UI/Separator/Separator';
import Body from '../UI/Typography/components/Body';

export interface LoginViewProps {
  loading: boolean;
  onSubmit: (variables: FormData) => void;
  onReset: (defaultEmailValue: string) => void;
  onRegister: () => void;
}

export type FormData = {
  email: string;
  password: string;
};

const LoginView = (props: LoginViewProps) => {
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty }, watch, triggerValidation } = useForm<FormData>({ mode: 'onChange' });
  const passwordRef = useRef(null);


  /**
   * Register form
   */
  useEffect(() => {
    register({ name: 'email' }, { required: true, validate: validateEmail });
    register({ name: 'password' }, { required: true });
  }, []);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={GlobalStyles.PageFill}
    >
      <Image
        source={require('../../assets/images/auth-background.jpeg')}
        style={Styles.background}
        resizeMode="contain"
      />

      <SafeAreaView style={GlobalStyles.PageFill}>
        <ScrollView
          contentContainerStyle={[Styles.scrollView, GlobalStyles.MaxWidth]}
          bounces={false}
        >
          <View style={Styles.logoWrap}>
            <Image
              source={require('../../assets/images/logo-with-strap-light.png')}
              style={Styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={Styles.input}>
            <TextInput
              name="email"
              onChangeText={(text) => {
                // Validate on change if there's an error, otherwise validate onBlur
                setValue('email', text, !!errors.email);
              }}
              placeholder="Login with email"
              autoCompleteType="email"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              errors={errors}
              onBlur={() => triggerValidation('email')}
              onSubmitEditing={() => {
                // eslint-disable-next-line no-unused-expressions
                passwordRef.current?.focus();
              }}
              testID="email"
            />
          </View>

          <View style={Styles.input}>
            <TextInput
              name="password"
              setRef={(e) => {
                passwordRef.current = e;
              }}
              onChangeText={(text) => {
                // Validate on change if there's an error, otherwise validate onBlur
                setValue('password', text, !!errors.password);
              }}
              placeholder="Login with password"
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
            title={props.loading ? 'Logging in' : 'Login'}
            onPress={handleSubmit(props.onSubmit)}
            disabled={!isValid || !dirty}
            loading={props.loading}
            testID="submit"
          />

          <TouchableOpacity
            style={Styles.forgot}
            onPress={() => props.onReset(watch('email'))}
            disabled={props.loading}
            testID="reset"
          >
            <Body forceLight>Forgotten Password?</Body>
          </TouchableOpacity>

          <Separator margin="large" />

          <View style={Styles.input}>
            <LoginWithFacebook
              disabled={props.loading}
              buttonText="Login with Facebook"
            />
          </View>

          <LoginWithGoogle
            disabled={props.loading}
            buttonText="Login with Google"
          />

          <Separator margin="large" />

          <TouchableOpacity
            style={Styles.register}
            onPress={props.onRegister}
            disabled={props.loading}
            testID="register"
          >
            <Body bold forceLight>Don't have an account?</Body>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginView;
