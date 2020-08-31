import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CreateStreamMessage from './CreateStreamMessage';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('Stream/StreamMessages/CreateStreamMessage', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('CreateStreamMessage', () => (
    <CreateStreamMessage variables={{ id: 'test' } as any} />
  ));
