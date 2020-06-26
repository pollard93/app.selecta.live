/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import OnboardingGetStarted from './OnboardingGetStarted';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('Onboarding/OnboardingGetStarted', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('OnboardingGetStarted', () => (
    <OnboardingGetStarted />
  ));