/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button, View } from 'react-native';
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
  ))
  .add('LoadingIcon - static', () => {
    const TestComponent = () => {
      const [animating, setAnimating] = useState(false);
      return (
        <View>
          <LoadingIcon animating={animating} />
          <Button
            title={animating ? 'stop animating' : 'start animating'}
            onPress={() => setAnimating(!animating)}
          />
        </View>
      );
    };

    return <TestComponent />;
  });
