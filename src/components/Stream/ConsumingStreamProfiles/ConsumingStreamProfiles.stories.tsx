import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ConsumingStreamProfiles from './ConsumingStreamProfiles';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('ConsumingStreamProfiles', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('ConsumingStreamProfiles', () => (
    <ConsumingStreamProfiles />
  ));
