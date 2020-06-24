import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { RESULTS, openSettings, PERMISSIONS } from 'react-native-permissions';
import { Text, Button } from 'react-native';
import PermissionsError from './PermissionsError';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import usePermissions from './usePermissions';

storiesOf('UI/PermissionsError', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('PermissionsError - NULL', () => (
    <PermissionsError state={null} errorMessage="Permission error message" />
  ))
  .add('PermissionsError - RESULTS.UNAVAILABLE', () => (
    <PermissionsError state={RESULTS.UNAVAILABLE} errorMessage="Permission error message" />
  ))
  .add('PermissionsError - RESULTS.DENIED', () => (
    <PermissionsError state={RESULTS.DENIED} errorMessage="Permission error message" />
  ))
  .add('PermissionsError - RESULTS.BLOCKED', () => (
    <PermissionsError state={RESULTS.BLOCKED} errorMessage="Permission error message" />
  ))
  .add('usePermissions', () => {
    const TestComponent = () => {
      const { permissionStatus } = usePermissions({
        iosPermission: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        androidPermission: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        errorMessage: 'Permission error message',
      });
      // eslint-disable-next-line no-console
      if (permissionStatus !== RESULTS.GRANTED) return null;

      return (
        <CenterView>
          <Text>Permissions are OKAY</Text>
          <Button
            title="Open settings to change permissions"
            onPress={openSettings}
          />
        </CenterView>
      );
    };

    return <TestComponent />;
  })
  .add('usePermissions - dismissable', () => {
    const TestComponent = () => {
      const { permissionStatus } = usePermissions({
        iosPermission: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        androidPermission: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        errorMessage: 'Permission error message',
      });
      // eslint-disable-next-line no-console
      if (permissionStatus !== RESULTS.GRANTED) return null;

      return (
        <CenterView>
          <Text>Permissions are OKAY</Text>
          <Button
            title="Open settings to change permissions"
            onPress={openSettings}
          />
        </CenterView>
      );
    };

    return <TestComponent />;
  });
