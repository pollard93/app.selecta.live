import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View, Image, TouchableOpacity, SafeAreaView, Animated, Dimensions } from 'react-native';
import { useForm } from 'react-hook-form';
import { validate as validateEmail } from 'email-validator';
import { DynamicValue, useDynamicValue } from 'react-native-dynamic';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import LoginWithFacebook from './components/LoginWithFacebook/LoginWithFacebook';
import LoginWithGoogle from './components/LoginWithGoogle/LoginWithGoogle';
import Styles from './Login.style';
import TextInput from '../UI/Form/components/TextInput/TextInput';
import Separator from '../UI/Separator/Separator';
import Body from '../UI/Typography/components/Body';
import spacing from '../../styles/definitions/spacing';
import Gradient from '../UI/Gradient/Gradient';
import Icon, { ICON } from '../UI/Icon/Icon';
import LoadingIcon from '../UI/LoadingIcon/LoadingIcon';
import FadeInView from '../UI/FadeInView/FadeInView';

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
  const lightLogo = require('../../assets/images/logo-dark.png');
  const darkLogo = require('../../assets/images/logo-light.png');
  const logoUri = new DynamicValue(lightLogo, darkLogo);


  /**
   * Scroll view
   */
  const scrollViewItemWidth = useRef((Dimensions.get('screen').width - spacing.large)).current;
  const scrollViewWidth = useRef(scrollViewItemWidth * 2).current;
  const scrollViewRef = useRef<ScrollView>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [step, setStep] = useState<number>(0);
  const scrollToIndex = (index: number) => {
    setStep(index);
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
  const { register, setValue, handleSubmit, errors, watch, triggerValidation } = useForm<FormData>({ mode: 'onChange' });
  const passwordRef = useRef(null);
  useEffect(() => {
    register({ name: 'email' }, { required: true, validate: validateEmail });
    register({ name: 'password' }, { required: true });
  }, [register]);


  return (
    <View style={[GlobalStyles.PageFill, Styles.wrap]}>
      <Gradient style={Styles.gradient} />

      <SafeAreaView style={Styles.flex}>
        <ScrollView
          contentContainerStyle={Styles.scrollViewWrap}
          bounces={false}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={Styles.logoWrap}>
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
                  Styles.input,
                  { width: scrollViewItemWidth },
                  { opacity: item1Opacity },
                ]}
              >
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

            <View style={Styles.lower}>
              {step > 0 ? (
                <FadeInView>
                  <TouchableOpacity
                    style={Styles.forgot}
                    onPress={() => scrollToIndex(0)}
                    disabled={step === 0}
                  >
                    <Body>back</Body>
                  </TouchableOpacity>
                </FadeInView>
              ) : <View />}

              <TouchableOpacity
                style={Styles.forgot}
                onPress={() => props.onReset(watch('email'))}
                disabled={props.loading}
                testID="reset"
              >
                <Body>Forgotten Password?</Body>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

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

        <Separator margin="base" />

        <TouchableOpacity
          style={Styles.register}
          onPress={props.onRegister}
          disabled={props.loading}
          testID="register"
        >
          <Body bold>Sign up</Body>
        </TouchableOpacity>
      </SafeAreaView>

      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={GlobalStyles.PageFill}
      >
        <SafeAreaView style={GlobalStyles.PageFill}>
          <ScrollView
            contentContainerStyle={[Styles.scrollView, GlobalStyles.MaxWidth]}
            bounces={false}
          >
            <View style={Styles.logoWrap}>
              <Image
                source={useDynamicValue(logoUri)}
                resizeMode="contain"
                style={Styles.logo}
              />
            </View>


            {/* <View style={Styles.input}>
              <TextInput
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
            </View> */}

            {/* <Button
              title={props.loading ? 'Logging in' : 'Login'}
              onPress={handleSubmit(props.onSubmit)}
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
                {...props}
                disabled={props.loading}
                buttonText="Login with Facebook"
              />
            </View>

            <LoginWithGoogle
              {...props}
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
      </KeyboardAvoidingView> */}
    </View>
  );
};

export default LoginView;
