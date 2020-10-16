/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import OnboardingPageWrap from './OnboardingPageWrap';
import { Text } from 'react-native';

storiesOf('Onboarding/OnboardingPageWrap', module)
  .add('OnboardingPageWrap', () => (
    <OnboardingPageWrap>
      <Text>Content</Text>
    </OnboardingPageWrap>
  ))