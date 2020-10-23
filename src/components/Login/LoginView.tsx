import React, { useRef, useEffect, useState, FC } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View, Image, TouchableOpacity, SafeAreaView, Animated, Dimensions } from 'react-native';
import { useForm } from 'react-hook-form';
import { validate as validateEmail } from 'email-validator';
import { DynamicValue, useDynamicValue } from 'react-native-dynamic';
import LoginWithFacebook from './components/LoginWithFacebook/LoginWithFacebook';
import LoginWithGoogle from './components/LoginWithGoogle/LoginWithGoogle';
import Styles from './Login.style';
import TextInput from '../UI/Form/components/TextInput/TextInput';
import Separator from '../UI/Separator/Separator';
import Body from '../UI/Typography/components/Body';
import spacing from '../../styles/definitions/spacing';
import LoadingIcon from '../UI/LoadingIcon/LoadingIcon';
import FadeInView from '../UI/FadeInView/FadeInView';
import OnboardingPageWrap from '../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import Icon, { ICON } from '../UI/Icon/Icon';

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

const LoginView: FC<LoginViewProps> = (props) => {
  const lightLogo = require('../../assets/images/logo-dark.png');
  const darkLogo = require('../../assets/images/logo-light.png');
  const logoUri = new DynamicValue(lightLogo, darkLogo);


  /**
   * Scroll view
   */
  const scrollViewItemWidth = useRef((Dimensions.get('screen').width - spacing.large)).current;
  const scrollViewRef = useRef<ScrollView>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [step, setStep] = useState<number>(0);
  const scrollToIndex = (index: number) => {
    setStep(index);
    scrollViewRef.current.scrollTo({ y: 0, x: scrollViewItemWidth * index });
  };


  /**
   * ScrollView item opacities
   */
  const item0Opacity = useRef(scrollX.interpolate({
    inputRange: [0, scrollViewItemWidth],
    outputRange: [1, 0],
  })).current;
  const item1Opacity = useRef(scrollX.interpolate({
    inputRange: [0, scrollViewItemWidth],
    outputRange: [0, 1],
  })).current;


  /**
   * Register form
   */
  const { register, setValue, handleSubmit, errors, watch, triggerValidation } = useForm<FormData>({ mode: 'onChange' });
  useEffect(() => {
    register({ name: 'email' }, { required: true, validate: validateEmail });
    register({ name: 'password' }, { required: true });
  }, [register]);


  /**
   * Refs
   */
  const emailRef = useRef(null);
  const passwordRef = useRef(null);


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
            keyboardShouldPersistTaps={'handled'}
          >
            <View style={Styles.logoWrap}>
              {step === 1 && (
                <FadeInView>
                  <TouchableOpacity
                    style={Styles.arrowBack}
                    onPress={() => {
                      scrollToIndex(0);
                      // eslint-disable-next-line no-unused-expressions
                      emailRef.current?.focus();
                    }}
                  >
                    <Icon
                      name={ICON.ARROW_BACKWARD}
                      size="small"
                    />
                  </TouchableOpacity>
                </FadeInView>
              )}

              <Image
                source={useDynamicValue(logoUri)}
                resizeMode="contain"
                style={Styles.logo}
              />
            </View>

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
                  Styles.section,
                  { width: scrollViewItemWidth },
                  { opacity: item0Opacity },
                ]}
              >
                <View>
                  <TextInput
                    setRef={emailRef}
                    style={Styles.input}
                    name="email"
                    onChangeText={(text) => {
                      // Validate on change if there's an error, otherwise validate onBlur
                      setValue('email', text, !!errors.email);
                    }}
                    placeholder="Enter your email"
                    textContentType="emailAddress"
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
                    onboarding
                    testID="email"
                  />

                  <TouchableOpacity
                    style={Styles.arrow}
                    onPress={() => {
                      scrollToIndex(1);
                      // eslint-disable-next-line no-unused-expressions
                      passwordRef.current?.focus();
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
                  Styles.section,
                  { width: scrollViewItemWidth },
                  { opacity: item1Opacity },
                ]}
              >
                <View>
                  <TextInput
                    style={Styles.input}
                    name="password"
                    setRef={passwordRef}
                    onChangeText={(text) => {
                      // Validate on change if there's an error, otherwise validate onBlur
                      setValue('password', text, !!errors.password);
                    }}
                    textContentType="password"
                    placeholder="Enter your password"
                    secureTextEntry
                    autoCompleteType="password"
                    autoCapitalize="none"
                    returnKeyType="done"
                    errors={errors}
                    onBlur={() => triggerValidation('password')}
                    onSubmitEditing={handleSubmit(props.onSubmit)}
                    onboarding
                    testID="password"
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
              </Animated.View>
            </ScrollView>

            <View style={Styles.social}>
              <LoginWithFacebook
                {...props}
                disabled={props.loading}
                buttonText="Continue with Facebook"
              />

              <View style={Styles.google}>
                <LoginWithGoogle
                  {...props}
                  disabled={props.loading}
                  buttonText="Continue with Google"
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <Separator margin="base" />

        <View style={Styles.lower}>
          <TouchableOpacity
            style={Styles.register}
            onPress={props.onRegister}
            disabled={props.loading}
            testID="register"
          >
            <Body bold>Sign up</Body>
          </TouchableOpacity>

          <TouchableOpacity
            style={Styles.forgot}
            onPress={() => props.onReset(watch('email'))}
            disabled={props.loading}
            testID="reset"
          >
            <Body>Forgot Password?</Body>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </OnboardingPageWrap>
  );
};

export default LoginView;
