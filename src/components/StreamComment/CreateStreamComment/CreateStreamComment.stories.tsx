import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CreateStreamComment from './CreateStreamComment';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('Stream/StreamComments/CreateStreamComment', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('CreateStreamComment', () => (
    <CreateStreamComment variables={{ id: 'test' } as any} />
  ));
