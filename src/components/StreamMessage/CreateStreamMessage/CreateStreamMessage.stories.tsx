import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CreateStreamMessage from './CreateStreamMessage';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';

storiesOf('Stream/StreamMessages/CreateStreamMessage', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
  .add('CreateStreamMessage', () => (
    <CreateStreamMessage variables={{ id: 'test' } as any} />
  ));
