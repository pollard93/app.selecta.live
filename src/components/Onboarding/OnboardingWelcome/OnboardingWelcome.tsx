import React, { useEffect, FC } from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Navigation } from 'react-native-navigation';
import OnboardingPageWrap from '../../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import Button from '../../UI/Button/Button';
import Styles from './OnboardingWelcome.style';
import H4 from '../../UI/Typography/components/H4';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import UsernameInput from '../../UI/Form/components/UsernameInput/UsernameInput';
import { goHome } from '../../../screens/utils';

export interface OnboardingWelcomeProps {}

const OnboardingWelcome: FC<OnboardingWelcomeProps> = () => {
  const screenProps = useScreenProps();


  /**
   * Remove splash
   */
  useEffect(() => {
    SplashScreen.hide();
  }, []);


  const onCompleted = () => {
    goHome();
  };


  const onPop = () => {
    Navigation.pop(screenProps.componentId);
  };


  return (
    <OnboardingPageWrap
      heading="Welcome"
      onPop={onPop}
    >
      <View style={Styles.input}>
        <H4 style={Styles.content}>Let’s get started by finding your unique name in the app.</H4>

        <UsernameInput
          onCompleted={onCompleted}
        >
          {(args) => (
            <View style={Styles.button}>
              <Button
                title="Next"
                onPress={args.onSubmit}
                disabled={args.disabled}
                loading={args.queryLoading || args.queryLoading}
              />
            </View>
          )}
        </UsernameInput>
      </View>
    </OnboardingPageWrap>
  );
};

export default OnboardingWelcome;
