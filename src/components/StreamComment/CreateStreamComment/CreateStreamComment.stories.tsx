import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CreateStreamComment from './CreateStreamComment';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';

storiesOf('Stream/StreamComments/CreateStreamComment', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
  .add('CreateStreamComment', () => (
    <CreateStreamComment variables={{ id: 'test' } as any} />
  ));
