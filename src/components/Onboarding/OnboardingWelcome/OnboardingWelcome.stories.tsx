/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import OnboardingWelcome from './OnboardingWelcome';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('Onboarding/OnboardingWelcome', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('OnboardingWelcome', () => (
    <OnboardingWelcome />
  ));