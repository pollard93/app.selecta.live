/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import ShareButton from './ShareButton';

storiesOf('UI/ShareButton', module)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'stretch' }}>{getStory()}</CenterView>)
  .add('ShareButton - default', () => (
    <ShareButton
      title="Share Button"
      url="https://google.com"
    />
  ))
  .add('ShareButton - custom dialog props', () => (
    <ShareButton
      title="Share Button"
      url="https://google.com"
      dialogProps={{
        dialogTitle: 'This is a custom title', // Android only
        subject: 'This is a subject', // Subject if shared via email
      }}
    />
  ))
  .add('ShareButton - custom icon props', () => (
    <ShareButton
      title="Share Button"
      url="https://google.com"
      iconProps={{
        size: 'xlarge',
      }}
    />
  ));
