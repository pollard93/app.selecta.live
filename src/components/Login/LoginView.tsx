import React, { useRef, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View, Image, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { validate as validateEmail } from 'email-validator';
import { loginVariables } from '../../API/mutation/login/__generated__/login';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import LoginWithFacebook from './components/LoginWithFacebook/LoginWithFacebook';
import LoginWithGoogle from './components/LoginWithGoogle/LoginWithGoogle';
import Styles from './Login.style';
import TextInput from '../UI/Form/components/TextInput';
import Button from '../UI/Button/Button';
import Separator from '../UI/Separator/Separator';
import Body from '../UI/Typography/components/Body';
import H4 from '../UI/Typography/components/H4';

export interface LoginViewProps {
  loading: boolean;
  onSubmit: (variables: loginVariables) => void;
  onReset: () => void;
  onRegister: () => void;
}

type FormData = {
  email: string;
  password: string;
};

const LoginView = (props: LoginViewProps) => {
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty }, triggerValidation } = useForm<FormData>({ mode: 'onChange' });
  const passwordRef = useRef(null);


  /**
   * Register form
   */
  useEffect(() => {
    register({ name: 'email' }, { required: true, validate: validateEmail });
    register({ name: 'password' }, { required: true, pattern: /^.{6,}$/ });
  }, []);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[GlobalStyles.PageFill, GlobalStyles.MaxWidth]}
    >
      <ScrollView
        contentContainerStyle={Styles.scrollView}
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
            placeholder="Email"
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
          title={props.loading ? 'Logging in' : 'Login'}
          onPress={handleSubmit(props.onSubmit)}
          disabled={!isValid || !dirty}
          loading={props.loading}
        />

        <TouchableOpacity
          style={Styles.forgot}
          onPress={props.onReset}
          disabled={props.loading}
        >
          <Body light>Forgotten Password?</Body>
        </TouchableOpacity>

        <Separator margin="xlarge" />

        <View style={Styles.input}>
          <LoginWithFacebook disabled={props.loading} />
        </View>

        <LoginWithGoogle disabled={props.loading} />

        <Separator margin="xlarge" />

        <TouchableOpacity
          style={Styles.register}
          onPress={props.onRegister}
          disabled={props.loading}
        >
          <H4 light>Already have an account?</H4>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginView;
