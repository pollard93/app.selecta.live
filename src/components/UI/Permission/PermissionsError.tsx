import React, { FC } from 'react';
import { RESULTS, PermissionStatus } from 'react-native-permissions';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import H1 from '../Typography/components/H1';
import H4 from '../Typography/components/H4';
import Styles from './PermissionsError.style';
import { openSettings } from '../../../utils/functions';
import Button from '../Button/Button';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Body from '../Typography/components/Body';
// import Icon, { ICON } from '../Icon/Icon';

interface PermissionsErrorProps {
  state: PermissionStatus;
  errorMessage: string;
  onDismiss?: () => void; // Pass if dismissable
}

const PermissionsError: FC<PermissionsErrorProps> = (props) => {
  const Inner = () => {
    /**
     * Validate the permission is set before proceeding
     */
    switch (props.state) {
      case RESULTS.UNAVAILABLE:
      case RESULTS.DENIED:
      case RESULTS.BLOCKED:
        return (
          <View>
            <H1 style={Styles.text}>☹️</H1>
            <H4 style={Styles.text}>{props.errorMessage}</H4>
          </View>
        );

      default:
        return null;
    }
  };

  if (props.state === null) return null;

  return (
    <SafeAreaView style={Styles.wrap}>
      <View style={GlobalStyles.PageFill}>
        <View style={Styles.inner}>
          <Inner />
          <Button
            style={Styles.button}
            title="Open Settings"
            onPress={openSettings}
          />
        </View>

        {props.onDismiss && (
          <TouchableOpacity
            style={Styles.dismiss}
            onPress={() => props.onDismiss()}
          >
            {/* <Icon name={ICON.CROSS} size="small" style={Styles.dismissIcon} /> */}
            <Body>Back</Body>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PermissionsError;
