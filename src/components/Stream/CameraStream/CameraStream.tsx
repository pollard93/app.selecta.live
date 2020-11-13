import React, { FC } from 'react';
import { PERMISSIONS, RESULTS } from 'react-native-permissions';
import { closeCameraOverlay } from '../../../screens/utils';
import usePermissions from '../../UI/Permission/usePermissions';
import PermissionsError from '../../UI/Permission/PermissionsError';
import CameraStreamInner from './CameraStreamInner';

export interface CameraStreamProps {
  id: string;
  onComplete: () => void; // Called when stream is complete
}

const CameraStream: FC<CameraStreamProps> = (props) => {
  /**
   * Check permissions and wait until granted
   */
  const camera = usePermissions({
    iosPermission: PERMISSIONS.IOS.CAMERA,
    androidPermission: PERMISSIONS.ANDROID.CAMERA,
  });
  const microphone = usePermissions({
    iosPermission: PERMISSIONS.IOS.MICROPHONE,
    androidPermission: PERMISSIONS.ANDROID.RECORD_AUDIO,
  });


  /**
   * Camera permission error
   */
  if (camera.permissionStatus == null) return null;
  if (camera.permissionStatus !== RESULTS.GRANTED) {
    return (
      <PermissionsError
        state={camera.permissionStatus}
        errorMessage="Please allow permission to access your camera."
        onDismiss={closeCameraOverlay}
      />
    );
  }


  /**
   * Microphone permission error
   */
  if (microphone.permissionStatus == null) return null;
  if (microphone.permissionStatus !== RESULTS.GRANTED) {
    return (
      <PermissionsError
        state={microphone.permissionStatus}
        errorMessage="Please allow permission to access your microphone."
        onDismiss={closeCameraOverlay}
      />
    );
  }


  return (
    <CameraStreamInner {...props} />
  );
};

export default CameraStream;
