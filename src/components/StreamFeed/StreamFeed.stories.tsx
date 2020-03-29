import React from 'react';
import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
import StreamFeed from './StreamFeed';
// import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
// import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
// import AssetPickerDecorator from '../../../../storybook/Decorators/AssetPickerDecorator/AssetPickerDecorator';
// import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';

storiesOf('StreamFeed', module)
  // .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  // .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  // .addDecorator((getStory) => <AssetPickerDecorator>{getStory()}</AssetPickerDecorator>)
  // .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
  .add('StreamFeed', () => (
    <StreamFeed />
  ));
