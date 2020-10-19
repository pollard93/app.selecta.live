/* eslint-disable no-console */
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
      /**
       * Check permissions and wait until granted
       */
      const { permissionStatus } = usePermissions({
        iosPermission: PERMISSIONS.IOS.PHOTO_LIBRARY,
        androidPermission: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      });

      /**
       * Permission error
       */
      if (permissionStatus && permissionStatus !== RESULTS.GRANTED) {
        return (
          <PermissionsError
            state={permissionStatus}
            errorMessage="We require permission to access your camera roll."
            onDismiss={console.log}
          />
        );
      }

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
