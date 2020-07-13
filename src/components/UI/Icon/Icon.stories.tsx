/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, ScrollView } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import Icon, { ICON } from './Icon';
import H4 from '../Typography/components/H4';
import color from '../../../styles/definitions/color';

storiesOf('UI/Icon', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <ScrollView>{getStory()}</ScrollView>)
  .add('Icon', () => {
    const TestComponent = () => {
      const isDarkMode = useDarkMode();

      return (
        <View style={{ flexWrap: 'wrap', backgroundColor: isDarkMode ? color.mono.dark : color.mono.light }}>
          {Object.keys(ICON).map((i) => (
            <View style={{ padding: 10 }}>
              <H4>{i}:</H4>
              <Icon
                name={ICON[i]}
                size="regular"
              />
            </View>
          ))}
        </View>
      );
    };

    return <TestComponent />;
  });
