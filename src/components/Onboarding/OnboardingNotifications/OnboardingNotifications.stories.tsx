/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import OnboardingNotifications from './OnboardingNotifications';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('Onboarding/OnboardingNotifications', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('OnboardingNotifications', () => (
    <OnboardingNotifications />
  ));