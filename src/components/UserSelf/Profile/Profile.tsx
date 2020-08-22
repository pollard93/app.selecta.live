import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useGetSelf } from '../../../API/query/getSelf/getSelf';
import H2 from '../../UI/Typography/components/H2';
import ChannelSelfs from '../../Channel/ChannelSelfs/ChannelSelfs';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { goToLogin } from '../../../screens/utils';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';

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
