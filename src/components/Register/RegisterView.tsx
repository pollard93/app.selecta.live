import { ScrollView, KeyboardAvoidingView, Platform, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { validate as validateEmail } from 'email-validator';
import { useForm } from 'react-hook-form';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import Styles from './Register.style';
import TextInput from '../UI/Form/components/TextInput/TextInput';
import Button from '../UI/Button/Button';
import Separator from '../UI/Separator/Separator';
import LoginWithFacebook from '../Login/components/LoginWithFacebook/LoginWithFacebook';
import LoginWithGoogle from '../Login/components/LoginWithGoogle/LoginWithGoogle';
import Body from '../UI/Typography/components/Body';

export interface RegisterViewProps {
  loading: boolean,
  onLogin: () => void;
  onSubmit: (variables: FormData) => void;
}

export type FormData = {
  email: string;
  password: string;
};

const RegisterView = (props: RegisterViewProps) => {
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty }, triggerValidation } = useForm<FormData>({ mode: 'onChange' });
  const passwordRef = useRef(null);


  useEffect(() => {
    register({ name: 'email' }, { required: true, validate: validateEmail });
    register({ name: 'password' }, { required: true, pattern: /^.{6,}$/ });
  }, [register]);


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
              placeholder="Sign up with your email"
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
              placeholder="Password"
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
            title={props.loading ? 'Signing up' : 'Sign up'}
            onPress={handleSubmit(props.onSubmit)}
            disabled={!isValid || !dirty}
            loading={props.loading}
            testID="submit"
          />

          <Separator margin="large" />

          <View style={Styles.input}>
            <LoginWithFacebook
              disabled={props.loading}
              buttonText="Sign up with Facebook"
            />
          </View>

          <LoginWithGoogle
            disabled={props.loading}
            buttonText="Sign up with Google"
          />

          <Separator margin="large" />

          <TouchableOpacity
            style={Styles.register}
            onPress={props.onLogin}
            disabled={props.loading}
          >
            <Body bold light>Already have an account?</Body>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterView;
