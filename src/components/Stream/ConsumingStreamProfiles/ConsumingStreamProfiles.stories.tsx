import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ConsumingStreamProfiles from './ConsumingStreamProfiles';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Stream/ConsumingStreamProfiles', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('ConsumingStreamProfiles', () => (
    <ConsumingStreamProfiles />
  ));
