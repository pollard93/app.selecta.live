/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Text, View, ScrollView } from 'react-native';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import Icon, { ICON } from './Icon';

storiesOf('UI/Icon', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <ScrollView>{getStory()}</ScrollView>)
  .add('Icon', () => (
    <View style={{ flexWrap: 'wrap' }}>
      {Object.keys(ICON).map((i) => (
        <View style={{ padding: 10 }}>
          <Text>{i}:</Text>
          <Icon
            name={ICON[i]}
            size="regular"
          />
        </View>
      ))}
    </View>
  ));
