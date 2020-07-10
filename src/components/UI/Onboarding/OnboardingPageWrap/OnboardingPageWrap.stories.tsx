/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import OnboardingPageWrap from './OnboardingPageWrap';
import { Text } from 'react-native';
import SafeAreaViewDecorator from '../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import DarkModeDecorator from '../../../../../storybook/Decorators/DarkModeDecorator/DarkModeDecorator';

storiesOf('Onboarding/OnboardingPageWrap', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <DarkModeDecorator switchPosition="bottomRight">{getStory()}</DarkModeDecorator>)
  .add('OnboardingPageWrap', () => (
    <OnboardingPageWrap
      heading="HEADING"
    >
      <Text>Content</Text>
    </OnboardingPageWrap>
  ));