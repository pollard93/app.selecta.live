import React, { FC } from 'react';
import { RESULTS, PermissionStatus, openSettings } from 'react-native-permissions';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import H4 from '../Typography/components/H4';
import Styles from './PermissionsError.style';
import Button from '../Button/Button';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Icon, { ICON } from '../Icon/Icon';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import spacing from '../../../styles/definitions/spacing';

interface PermissionsErrorProps {
  state: PermissionStatus;
  errorMessage: string;
  onDismiss?: () => void; // Pass if dismissable
}

const PermissionsError: FC<PermissionsErrorProps> = (props) => {
  const safeAreaInsets = useSafeArea();

  const Inner = () => {
    /**
     * Validate the permission is set before proceeding
     */
    switch (props.state) {
      case RESULTS.UNAVAILABLE:
      case RESULTS.DENIED:
      case RESULTS.BLOCKED:
        return (
          <>
            <Icon forceLight name={ICON.ERROR} size="large" />
            <H4 style={Styles.text}>{props.errorMessage}</H4>
          </>
        );

      default:
        return null;
    }
  };

  if (props.state === null) return null;

  return (
    <SafeAreaView style={Styles.wrap}>
      <View style={[GlobalStyles.PageFill, Styles.container]}>
        <View style={Styles.inner}>
          <Inner />
          <Button
            style={Styles.button}
            title="Open Settings"
            onPress={openSettings}
          />
        </View>
      </View>

      {props.onDismiss && (
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
            marginTop: safeAreaInsets.top + spacing.base,
            marginLeft: spacing.large,
          }}
          onPress={() => props.onDismiss()}
        >
          <Icon forceLight name={ICON.CROSS} size="small" style={Styles.dismissIcon} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default PermissionsError;
