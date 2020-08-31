import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Navigation, OptionsModalTransitionStyle } from 'react-native-navigation';
import { useGetSelf } from '../../../API/query/getSelf/getSelf';
import H2 from '../../UI/Typography/components/H2';
import ChannelSelfs from '../../Channel/ChannelSelfs/ChannelSelfs';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { goToLogin, openModalScreen } from '../../../screens/utils';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import UpdatePassword from '../UpdatePassword/UpdatePassword';
import UpdateEmail from '../UpdateEmail/UpdateEmail';
import { ToastOverlayProps } from '../../../screens/ToastOverlay/ToastOverlay';
import { pushToast } from '../../../modules/Toast';

export interface ProfileProps {}

const Profile: FC<ProfileProps> = (props) => {
  const self = useGetSelf();
  const screenProps = useScreenProps();

  const onDismiss = () => {
    Navigation.dismissModal(screenProps.componentId);
  };

  const onLogout = () => {
    goToLogin();
  };

  return (
    <View style={GlobalStyles.PageFill}>
      <Text>{self.username}</Text>
      <Text>{self.email}</Text>

      <TouchableOpacity onPress={onDismiss}>
        <Text>Close Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        openModalScreen({
          component: (
            <UpdatePassword
              onClosed={(toastProps?: ToastOverlayProps) => {
                Navigation.dismissModal('UPDATE_PASSWORD');

                if (toastProps) {
                  pushToast(toastProps);
                }
              }}
            />
          ),
        }, 'UPDATE_PASSWORD', OptionsModalTransitionStyle.crossDissolve);
      }}>
        <Text>Edit password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        openModalScreen({
          component: (
            <UpdateEmail
              onClosed={(toastProps?: ToastProps) => {
                Navigation.dismissModal('UPDATE_EMAIL');

                if (toastProps) {
                  pushToast(toastProps);
                }
              }}
            />
          ),
        }, 'UPDATE_EMAIL', OptionsModalTransitionStyle.crossDissolve);
      }}>
        <Text>Edit email</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>

      {self.isProducer && (
        <View style={GlobalStyles.PageFill}>
          <H2>Channels</H2>
          <ChannelSelfs {...props} />
        </View>
      )}
    </View>
  );
};

export default Profile;
