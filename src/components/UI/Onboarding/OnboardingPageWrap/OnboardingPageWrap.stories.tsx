/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import OnboardingPageWrap from './OnboardingPageWrap';
import { Text } from 'react-native';
import SafeAreaViewDecorator from '../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('Onboarding/OnboardingPageWrap', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('OnboardingPageWrap', () => (
    <OnboardingPageWrap
      heading="HEADING"
    >
      <Text>Content</Text>
    </OnboardingPageWrap>
  ))
  .add('OnboardingPageWrap - onPop', () => (
    <OnboardingPageWrap
      heading="HEADING"
      onPop={console.log}
    >
      <Text>Content</Text>
    </OnboardingPageWrap>
  ));