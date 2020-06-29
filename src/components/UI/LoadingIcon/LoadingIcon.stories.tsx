/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import LoadingIcon from './LoadingIcon';

storiesOf('UI/LoadingIcon', module)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: 'black' }}>{getStory()}</CenterView>)
  .add('LoadingIcon - default', () => (
    <LoadingIcon />
  ))
  .add('LoadingIcon - light', () => (
    <LoadingIcon type="LIGHT" />
  ))
  .add('LoadingIcon - small', () => (
    <LoadingIcon size="small" />
  ));
