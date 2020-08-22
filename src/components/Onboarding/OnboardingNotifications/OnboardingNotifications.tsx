import React, { useState, useEffect, FC } from 'react';
import { requestNotifications, PermissionStatus, RESULTS, checkNotifications } from 'react-native-permissions';
import { View, AppState } from 'react-native';
import { Navigation } from 'react-native-navigation';
import OnboardingPageWrap from '../../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import Button from '../../UI/Button/Button';
import FadeInView from '../../UI/FadeInView/FadeInView';
import H4 from '../../UI/Typography/components/H4';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Styles from './OnboardingNotifications.style';
import { pushScreen } from '../../../screens/utils';
import OnboardingGetStartedScreen from '../../../screens/OnboardingScreens/OnboardingGetStartedScreen/OnboardingGetStartedScreen';
import { openSettings } from '../../../utils/functions';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import Icon, { ICON } from '../../UI/Icon/Icon';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';

export interface OnboardingNotificationsProps {}

const OnboardingNotifications: FC<OnboardingNotificationsProps> = () => {
  const screenProps = useScreenProps();
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | 'unknown'>(null);


  /**
   * On next screen
   */
  const onNext = () => {
    pushScreen(screenProps.componentId, OnboardingGetStartedScreen, {});
  };


  /**
   * Check status of notification permission
   * If granted `onNext`
   * If failed set in state
   */
  const checkPermissions = async () => {
    /**
     * Only check when active
     */
    if (AppState.currentState !== 'active') return;


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
  };


  /**
   * On mount get permissiom status
   * Bind app state listener
   */
  useEffect(() => {
    checkPermissions();
    AppState.addEventListener('change', checkPermissions);
    return () => {
      AppState.removeEventListener('change', checkPermissions);
    };
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


  /**
   * Permission is requestable
   */
  const canRequest = [RESULTS.DENIED, 'unknown'].includes(permissionStatus);


  const onPop = () => {
    Navigation.pop(screenProps.componentId);
  };


  return (
    <OnboardingPageWrap
      heading="Notifications"
      onPop={onPop}
    >
      {
        permissionStatus === null
          ? <LoadRetry loading />
          : (
            <FadeInView style={GlobalStyles.PageFill}>
              <View style={Styles.content}>
                <H4>We’d like to keep you updated about the latest streams from your favourite artists and when new and upcoming events are announced.</H4>

                <View style={Styles.enable}>
                  <Icon name={ICON.NOTIFICATION} size="small" />
                  <H4 style={Styles.enableText}>Please enable notifications.</H4>
                </View>
              </View>

              <Button
                title='Enable Notifications'
                onPress={canRequest ? requestPermission : openSettings}
              />
              <Button
                type="SECONDARY"
                title="No thanks"
                onPress={onNext}
                style={Styles.bottomButton}
              />
            </FadeInView>
          )
      }
    </OnboardingPageWrap>
  );
};

export default OnboardingNotifications;
