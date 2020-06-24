import React, { useEffect, useState } from 'react';
import { RESULTS, check, request, PermissionStatus, Permission } from 'react-native-permissions';
import { Platform, AppState } from 'react-native';
import { Navigation } from 'react-native-navigation';
import PermissionsError from './PermissionsError';
import { openModalScreen } from '../../../screens/utils';

interface usePermissionsProps {
  iosPermission: Permission;
  androidPermission: Permission;
  errorMessage: string;
  onDismiss?: () => void; // Pass if dismissable
}

/**
 * Utility to request and get state of location permissions
 * If permission are not granted the user will be presented with a modal and a button to open settings
 */
const usePermissions = (props: usePermissionsProps): {permissionStatus: PermissionStatus} => {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(null);
  const [showingModal, setShowingModal] = useState(false);


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


  useEffect(() => {
    /**
     * Wait until we have a status
     */
    if (!permissionStatus) return;


    /**
     * If not showing modal, and status is not granted, show modal with status
     */
    if (!showingModal && permissionStatus !== RESULTS.GRANTED) {
      setShowingModal(true);
      setTimeout(() => {
        openModalScreen({
          component: (
            <PermissionsError
              state={permissionStatus}
              errorMessage={props.errorMessage}
              onDismiss={props.onDismiss && (() => {
                Navigation.dismissModal('PERMISSIONS_MODAL');
                props.onDismiss();
              })}
            />
          ),
        }, 'PERMISSIONS_MODAL');
      }, 0);
    }


    /**
     * If showing modal, and status is granted, hide
     */
    if (showingModal && permissionStatus === RESULTS.GRANTED) {
      setShowingModal(false);
      setTimeout(() => {
        Navigation.dismissModal('PERMISSIONS_MODAL');
      }, 0);
    }
  }, [permissionStatus, showingModal]);


  /**
   * If granted return status and nothing to render
   */
  return {
    permissionStatus,
  };
};

export default usePermissions;
