import { ScrollView, KeyboardAvoidingView, Platform, View, Image, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { validate as validateEmail } from 'email-validator';
import { useForm } from 'react-hook-form';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import Styles from './Register.style';
import TextInput from '../UI/Form/components/TextInput';
import Button from '../UI/Button/Button';
import Separator from '../UI/Separator/Separator';
import LoginWithFacebook from '../Login/components/LoginWithFacebook/LoginWithFacebook';
import LoginWithGoogle from '../Login/components/LoginWithGoogle/LoginWithGoogle';
import H4 from '../UI/Typography/components/H4';

export interface RegisterViewProps {
  loading: boolean,
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
          title={props.loading ? 'Signing up' : 'Next'}
          onPress={handleSubmit(props.onSubmit)}
          disabled={!isValid || !dirty}
          loading={props.loading}
        />

        <Separator margin="xlarge" />

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

        <Separator margin="xlarge" />

        <TouchableOpacity
          style={Styles.register}
          onPress={props.onLogin}
          disabled={props.loading}
        >
          <H4 light>Already have an account?</H4>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  // return (
  //   <ScrollView style={GlobalStyles.PageFill}>
  //     <TextInput
  //       ref={() => {
  //         register({ name: 'email' }, { required: true, validate: validateEmail });
  //       }}
  //       onChangeText={(text) => setValue('email', text, true)}
  //       placeholder="Email"
  //       autoCompleteType="email"
  //       keyboardType="email-address"
  //       returnKeyType="next"
  //       onSubmitEditing={() => {
  //         // eslint-disable-next-line no-unused-expressions
  //         passwordRef.current?.focus();
  //       }}
  //     />
  //     {errors.email && <Text>This is required.</Text>}

  //     <TextInput
  //       ref={(e) => {
  //         register({ name: 'password' }, { required: true, pattern: /^.{6,}$/ });
  //         passwordRef.current = e;
  //       }}
  //       onChangeText={(text) => setValue('password', text, true)}
  //       placeholder="Password"
  //       secureTextEntry
  //       autoCompleteType="email"
  //       keyboardType="email-address"
  //       returnKeyType="done"
  //       onSubmitEditing={handleSubmit(props.onSubmit)}
  //     />
  //     {errors.password && <Text>This is required.</Text>}

  //     <Button
  //       title="Submit"
  //       onPress={handleSubmit(props.onSubmit)}
  //       disabled={props.loading || !isValid || !dirty}
  //     />
  //   </ScrollView>
  // );
};

export default RegisterView;
