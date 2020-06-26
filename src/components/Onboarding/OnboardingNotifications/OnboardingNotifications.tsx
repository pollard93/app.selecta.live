import React, { useState, useEffect, FC } from 'react';
import { requestNotifications, PermissionStatus, RESULTS, checkNotifications } from 'react-native-permissions';
import { View } from 'react-native';
import OnboardingPageWrap from '../../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import Button from '../../UI/Button/Button';
import FadeInView from '../../UI/FadeInView/FadeInView';
import H4 from '../../UI/Typography/components/H4';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Styles from './OnboardingNotifications.style';
import { ScreenProps, STACK } from '../../../screens/utils/interfaces';
import { pushScreenV2 } from '../../../screens/utils';
import OnboardingGetStartedScreen from '../../../screens/OnboardingScreens/OnboardingGetStartedScreen/OnboardingGetStartedScreen';

export interface OnboardingNotificationsProps extends ScreenProps {}

const OnboardingNotifications: FC<OnboardingNotificationsProps> = () => {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | 'unknown'>(null);


  /**
   * On next screen
   */
  const onNext = () => {
    pushScreenV2(STACK.ONBOARDING, OnboardingGetStartedScreen, {});
  };


  /**
   * On mount check notification permissions
   * Set state
   * If error set to unknown to show ui regardless
   */
  useEffect(() => {
    (async () => {
      try {
        const { status } = await checkNotifications();
        if (status === RESULTS.GRANTED) {
          onNext();
        } else {
          setPermissionStatus(status);
        }
      } catch {
        setPermissionStatus('unknown');
      }
    })();
  }, []);


  /**
   * Request notification permissions
   */
  const requestPermission = async () => {
    try {
      const { status } = await requestNotifications(['alert', 'sound']);
      if (status === RESULTS.GRANTED) {
        onNext();
      } else {
        setPermissionStatus(status);
      }
    // eslint-disable-next-line no-empty
    } catch {}
  };


  const canGoNext = [RESULTS.GRANTED, 'unknown'].includes(permissionStatus);


  return (
    <OnboardingPageWrap heading="Notifications">
      {permissionStatus !== null && (
        <FadeInView style={GlobalStyles.PageFill}>
          <View style={Styles.content}>
            <H4>We’d like to keep you updated about the latest streams from your favourite artists and when new and upcoming events are announced.</H4>
            <H4>Please enable notifications.</H4>
          </View>

          <Button
            title={!canGoNext ? 'Enable Notifications' : 'Next'}
            onPress={!canGoNext ? requestPermission : onNext}
          />
          {!canGoNext && (
            <Button
              type="SECONDARY"
              title="No thanks"
              onPress={onNext}
            />
          )}
        </FadeInView>
      )}
    </OnboardingPageWrap>
  );
};

export default OnboardingNotifications;
