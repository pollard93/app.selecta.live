import React, { useEffect, FC } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import OnboardingPageWrap from '../../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import Styles from './OnboardingWelcome.style';
import UsernameInput from '../../UI/Form/components/UsernameInput/UsernameInput';
import H1 from '../../UI/Typography/components/H1';
import { goHome } from '../../../screens/utils';
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon';
import Icon, { ICON } from '../../UI/Icon/Icon';

export interface OnboardingWelcomeProps {}

const OnboardingWelcome: FC<OnboardingWelcomeProps> = () => {
  /**
   * Remove splash
   */
  useEffect(() => {
    SplashScreen.hide();
  }, []);


  const onCompleted = () => {
    goHome();
  };


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
                <H1>Claim your name</H1>
              </View>

              <View>
                <UsernameInput
                  onCompleted={onCompleted}
                  useTextInput
                >
                  {(args) => (
                    <TouchableOpacity
                      style={Styles.arrow}
                      onPress={args.onSubmit}
                    >
                      {
                        args.mutationLoading || args.queryLoading
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
                  )}
                </UsernameInput>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </OnboardingPageWrap>
  );
};

export default OnboardingWelcome;
