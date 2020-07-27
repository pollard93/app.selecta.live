/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import Button from './Button';
import { ICON } from '../Icon/Icon';

storiesOf('UI/Button', module)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{getStory()}</CenterView>)
  .add('Button - primary', () => (
    <Button
      title="Primary"
      onPress={console.log}
    />
  ))
  .add('Button - primary - small', () => (
    <Button
      title="Primary"
      onPress={console.log}
      size="small"
    />
  ))
  .add('Button - primary - loading', () => (
    <Button
      title="Primary"
      onPress={console.log}
      icon={ICON.SEARCH}
      loading
    />
  ))
  .add('Button - primary - disabled', () => (
    <Button
      title="Primary"
      onPress={console.log}
      disabled
    />
  ))
  .add('Button - secondary', () => (
    <Button
      title="Secondary"
      type="SECONDARY"
      onPress={console.log}
    />
  ))
  .add('Button - secondary - loading', () => (
    <Button
      title="Secondary"
      type="SECONDARY"
      onPress={console.log}
      loading
    />
  ))
  .add('Button - secondary - disabled', () => (
    <Button
      title="Secondary"
      type="SECONDARY"
      onPress={console.log}
      disabled
    />
  ))
  .add('Button - light', () => (
    <Button
      title="Light"
      type="LIGHT"
      onPress={console.log}
    />
  ))
  .add('Button - light - loading', () => (
    <Button
      title="Light"
      type="LIGHT"
      onPress={console.log}
      loading
    />
  ))
  .add('Button - light - disabled', () => (
    <Button
      title="Light"
      type="LIGHT"
      onPress={console.log}
      disabled
    />
  ))
  .add('Button - icon', () => (
    <Button
      title="Icon"
      onPress={console.log}
      icon={ICON.SEARCH}
    />
  ))
  .add('Button - icon - disabled', () => (
    <Button
      title="Icon"
      onPress={console.log}
      icon={ICON.SEARCH}
      disabled
    />
  ))
  .add('Button - ful width', () => (
    <View style={{ width: '100%' }}>
      <Button
        title="Primary"
        onPress={console.log}
      />
    </View>
  ));
