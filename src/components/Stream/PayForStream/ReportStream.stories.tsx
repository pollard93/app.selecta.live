import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ReportStream from './ReportStream';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';

storiesOf('ReportStream', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('ReportStream', () => (
    <ReportStream id="test" />
  ));
