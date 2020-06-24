import React from 'react';
import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
import ProfileUpdate from './ProfileUpdate';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';

storiesOf('ProfileUpdate', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
  .add('ProfileUpdate', () => (
    <ProfileUpdate />
  ));
