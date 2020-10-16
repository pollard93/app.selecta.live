import React, { useEffect, FC } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, View, ScrollView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import OnboardingPageWrap from '../../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import Button from '../../UI/Button/Button';
import Styles from './OnboardingUsername.style';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import UsernameInput from '../../UI/Form/components/UsernameInput/UsernameInput';
import H1 from '../../UI/Typography/components/H1';

export interface OnboardingUsernameProps {}

const OnboardingUsername: FC<OnboardingUsernameProps> = () => {
  const screenProps = useScreenProps();


  /**
   * Remove splash
   */
  useEffect(() => {
    SplashScreen.hide();
  }, []);


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
                <UsernameInput onCompleted={console.log}>
                  {(args) => (
                    <View style={Styles.button}>
                      <Button
                        title="Continue"
                        onPress={args.onSubmit}
                        disabled={args.queryLoading || args.disabled}
                        type="SECONDARY"
                        loading={args.mutationLoading}
                      />
                    </View>
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

export default OnboardingUsername;
