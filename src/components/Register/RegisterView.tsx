import { ScrollView, KeyboardAvoidingView, Platform, View, Image, TouchableOpacity, SafeAreaView, Animated, Dimensions } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { validate as validateEmail } from 'email-validator';
import { useForm } from 'react-hook-form';
import { DynamicValue, useDynamicValue } from 'react-native-dynamic';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import Styles from './Register.style';
import TextInput from '../UI/Form/components/TextInput/TextInput';
import Button from '../UI/Button/Button';
import Separator from '../UI/Separator/Separator';
import LoginWithFacebook from '../Login/components/LoginWithFacebook/LoginWithFacebook';
import LoginWithGoogle from '../Login/components/LoginWithGoogle/LoginWithGoogle';
import Body from '../UI/Typography/components/Body';
import H1 from '../UI/Typography/components/H1';
import spacing from '../../styles/definitions/spacing';
import FadeInView from '../UI/FadeInView/FadeInView';
import Gradient from '../UI/Gradient/Gradient';
import Icon, { ICON } from '../UI/Icon/Icon';
import LoadingIcon from '../UI/LoadingIcon/LoadingIcon';
import OnboardingPageWrap from '../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';

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
  /**
   * Scroll view
   */
  const scrollViewItemWidth = useRef((Dimensions.get('screen').width - spacing.large)).current;
  const scrollViewWidth = useRef(scrollViewItemWidth * 2).current;
  const scrollViewRef = useRef<ScrollView>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollToIndex = (index: number) => {
    scrollViewRef.current.scrollTo({ y: 0, x: scrollViewItemWidth * index });
  };


  /**
   * Item 1 opacity
   */
  const item1Opacity = useRef(scrollX.interpolate({
    inputRange: [0, scrollViewWidth / 2],
    outputRange: [1, 0],
  })).current;


  /**
   * Item 2 opacity
   */
  const item2Opacity = useRef(scrollX.interpolate({
    inputRange: [0, scrollViewWidth / 2],
    outputRange: [0, 1],
  })).current;


  /**
   * Register form
   */
  const { register, setValue, handleSubmit, errors, triggerValidation } = useForm<FormData>({ mode: 'onChange' });
  const passwordRef = useRef(null);
  useEffect(() => {
    register({ name: 'email' }, { required: true, validate: validateEmail });
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
            <ScrollView
              scrollEventThrottle={16}
              ref={scrollViewRef}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              )}
              horizontal
              scrollEnabled={false}
              style={Styles.scrollViewInner}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}
            >
              <Animated.View
                style={[
                  Styles.input,
                  { width: scrollViewItemWidth },
                  { opacity: item1Opacity },
                ]}
              >
                <View style={Styles.headingWrap}>
                  <H1>Let's get started</H1>
                </View>

                <View>
                  <TextInput
                    style={{ paddingRight: spacing.xlarge }}
                    name="email"
                    onChangeText={(text) => {
                      // Validate on change if there's an error, otherwise validate onBlur
                      setValue('email', text, !!errors.email);
                    }}
                    placeholder="Enter your email"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    errors={errors}
                    onBlur={() => triggerValidation('email')}
                    onSubmitEditing={() => {
                      scrollToIndex(1);
                      // eslint-disable-next-line no-unused-expressions
                      passwordRef.current?.focus();
                    }}
                    testID="email"
                  />

                  <TouchableOpacity
                    style={Styles.arrow}
                    onPress={() => {
                      scrollToIndex(1);
                    }}
                  >
                    <Icon
                      name={ICON.ARROW_FORWARD}
                      size="small"
                    />
                  </TouchableOpacity>
                </View>
              </Animated.View>

              <Animated.View
                style={[
                  Styles.input,
                  { width: scrollViewItemWidth },
                  { opacity: item2Opacity },
                ]}
              >
                <View style={Styles.headingWrap}>
                  <FadeInView>
                    <TouchableOpacity
                      style={Styles.arrowBack}
                      onPress={() => {
                        scrollToIndex(0);
                      }}
                    >
                      <Icon
                        name={ICON.ARROW_BACKWARD}
                        size="small"
                      />
                    </TouchableOpacity>
                  </FadeInView>

                  <H1>Secure your account</H1>
                </View>

                <View>
                  <TextInput
                    style={{ paddingRight: spacing.xlarge }}
                    name="password"
                    setRef={passwordRef}
                    onChangeText={(text) => {
                      // Validate on change if there's an error, otherwise validate onBlur
                      setValue('password', text, !!errors.password);
                    }}
                    placeholder="Enter your password"
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
              </Animated.View>
            </ScrollView>

            <View style={Styles.social}>
              <LoginWithFacebook
                {...props}
                disabled={props.loading}
                buttonText="Login with Facebook"
              />

              <View style={Styles.google}>
                <LoginWithGoogle
                  {...props}
                  disabled={props.loading}
                  buttonText="Login with Google"
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <Separator margin="base" />

        <TouchableOpacity
          style={Styles.register}
          onPress={props.onLogin}
          disabled={props.loading}
        >
          <Body bold>Login</Body>
        </TouchableOpacity>
      </SafeAreaView>
    </OnboardingPageWrap>
  );


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
              placeholder="Enter your email"
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
              setRef={passwordRef}
              onChangeText={(text) => {
                // Validate on change if there's an error, otherwise validate onBlur
                setValue('password', text, !!errors.password);
              }}
              placeholder="Enter a password"
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
            loading={props.loading}
            testID="submit"
          />

          <Separator margin="large" />

          <View style={Styles.input}>
            <LoginWithFacebook
              {...props}
              disabled={props.loading}
              buttonText="Sign up with Facebook"
            />
          </View>

          <LoginWithGoogle
            {...props}
            disabled={props.loading}
            buttonText="Sign up with Google"
          />

          <Separator margin="large" />

          <TouchableOpacity
            style={Styles.register}
            onPress={props.onLogin}
            disabled={props.loading}
          >
            <Body bold forceLight>Already have an account?</Body>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterView;
