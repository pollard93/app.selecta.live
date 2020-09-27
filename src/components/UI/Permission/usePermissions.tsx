import { useEffect, useState } from 'react';
import { RESULTS, check, request, PermissionStatus, Permission } from 'react-native-permissions';
import { Platform, AppState } from 'react-native';

interface usePermissionsProps {
  iosPermission: Permission;
  androidPermission: Permission;
}

interface usePermissionsRes {
  permissionStatus: PermissionStatus;
}

/**
 * Utility to request and get state of permissions and return status
 */
const usePermissions = (props: usePermissionsProps): usePermissionsRes => {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(null);


  /**
   * Check and request permissions if possible
   */
  const checkPermissions = async () => {
    /**
     * Only check when active
     */
    if (AppState.currentState !== 'active') return;


    /**
     * Check permissions
     */
    let res = await check(
      Platform.OS === 'ios'
        ? props.iosPermission
        : props.androidPermission,
    );


    /**
     * Request permission if possible
     */
    if (res === RESULTS.DENIED) {
      res = await request(
        Platform.OS === 'ios'
          ? props.iosPermission
          : props.androidPermission,
      );
    }

    setPermissionStatus(res);
  };


  /**
   * On mount get permissiom status
   * Bind app state listener
   */
  useEffect(() => {
    checkPermissions();
    AppState.addEventListener('change', checkPermissions);
    return () => {
      AppState.removeEventListener('change', checkPermissions);
    };
  }, []);


  /**
   * If granted return status and nothing to render
   */
  return {
    permissionStatus,
  };
};

export default usePermissions;
