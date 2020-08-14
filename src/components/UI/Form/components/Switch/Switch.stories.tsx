/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import SafeAreaViewDecorator from '../../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';
import Switch from './Switch';

storiesOf('UI/Form/Switch', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{getStory()}</CenterView>)
  .add('Switch', () => {
    const TestComponent = () => {
      const [value, setValue] = useState(false);

      return (
        <Switch
          value={value}
          onValueChange={setValue}
        />
      );
    };

    return <TestComponent />;
  });
