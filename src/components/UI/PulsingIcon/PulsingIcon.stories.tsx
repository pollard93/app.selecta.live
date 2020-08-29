/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import PulsingIcon from './PulsingIcon';

storiesOf('UI/PulsingIcon', module)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: 'black', alignItems: 'center' }}>{getStory()}</CenterView>)
  .add('PulsingIcon', () => (
    <PulsingIcon />
  ));
