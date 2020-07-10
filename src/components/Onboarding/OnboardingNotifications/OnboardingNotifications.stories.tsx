/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import OnboardingNotifications from './OnboardingNotifications';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import DarkModeDecorator from '../../../../storybook/Decorators/DarkModeDecorator/DarkModeDecorator';

storiesOf('Onboarding/OnboardingNotifications', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <DarkModeDecorator switchPosition="topRight">{getStory()}</DarkModeDecorator>)
  .add('OnboardingNotifications', () => (
    <OnboardingNotifications />
  ));