import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Navigation, OptionsModalTransitionStyle } from 'react-native-navigation';
import { TextInput } from 'react-native-gesture-handler';
import { useDynamicValue } from 'react-native-dynamic';
import { useGetSelf } from '../../../API/query/getSelf/getSelf';
import ChannelSelfs from '../../Channel/ChannelSelfs/ChannelSelfs';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { goToLogin, openModalScreen } from '../../../screens/utils';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import UpdatePassword from '../UpdatePassword/UpdatePassword';
import UpdateEmail from '../UpdateEmail/UpdateEmail';
import UpdateUsername from '../UpdateUsername/UpdateUsername';
import UpdateProfilePicture from '../UpdateProfilePicture/UpdateProfilePicture';
import H4 from '../../UI/Typography/components/H4';
import Icon, { ICON } from '../../UI/Icon/Icon';
import Styles, { DynamicStyles } from './Profile.style';
import { formatForTimezone } from '../../../utils/functions';
import Body from '../../UI/Typography/components/Body';
import Header from '../../UI/Headers/Header/Header';
import Button from '../../UI/Button/Button';

export interface ProfileProps {}

const Profile: FC<ProfileProps> = (props) => {
  const self = useGetSelf();
  const screenProps = useScreenProps();
  const dynamicStyles = useDynamicValue(DynamicStyles);


  /**
   * On Logout
   */
  const onLogout = () => {
    goToLogin();
  };


  /**
   * On edit username
   */
  const onEditUsername = () => {
    openModalScreen({
      component: (
        <UpdateUsername
          onClosed={() => {
            Navigation.dismissModal('UPDATE_USERNAME');
          }}
        />
      ),
    }, 'UPDATE_USERNAME', OptionsModalTransitionStyle.crossDissolve);
  };


  /**
   * On edit email
   */
  const onEditEmail = () => {
    openModalScreen({
      component: (
        <UpdateEmail
          onClosed={() => {
            Navigation.dismissModal('UPDATE_EMAIL');
          }}
        />
      ),
    }, 'UPDATE_EMAIL', OptionsModalTransitionStyle.crossDissolve);
  };


  /**
   * On edit password
   */
  const onEditPassword = () => {
    openModalScreen({
      component: (
        <UpdatePassword
          onClosed={() => {
            Navigation.dismissModal('UPDATE_PASSWORD');
          }}
        />
      ),
    }, 'UPDATE_PASSWORD', OptionsModalTransitionStyle.crossDissolve);
  };


  /**
   * On pop
   */
  const onPop = () => {
    Navigation.pop(screenProps.componentId);
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={onPop} />

      <View style={[Styles.wrap, GlobalStyles.PageFill]}>
        <View style={[Styles.heading, Styles.item]}>
          <UpdateProfilePicture />

          <View style={Styles.headingRight}>
            <View style={Styles.editable}>
              <H4
                style={Styles.username}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {self.username}
              </H4>

              <TouchableOpacity onPress={onEditUsername}>
                <Icon
                  name={ICON.CREATE}
                  size="small"
                  style={Styles.icon}
                />
              </TouchableOpacity>
            </View>

            <Body>Joined {formatForTimezone(self.createdAt, 'calendar')}</Body>

            <Button
              title="Logout"
              onPress={onLogout}
              size="small"
              style={Styles.logout}
              type="SECONDARY"
            />
          </View>
        </View>

        <View style={Styles.item}>
          <View style={Styles.editable}>
            <View style={Styles.textItem}>
              <Body>Your email:</Body>
              <H4
                style={Styles.textItemInner}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {self.email}
              </H4>
            </View>

            <TouchableOpacity onPress={onEditEmail}>
              <Icon
                name={ICON.CREATE}
                size="small"
                style={Styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={[Styles.editable, Styles.password]}>
            <View style={Styles.textItem}>
              <Body>Your password:</Body>
              <TextInput
                editable={false}
                secureTextEntry={true}
                value="password"
                style={[Styles.textItemInner, dynamicStyles.password]}
              />
            </View>

            <TouchableOpacity onPress={onEditPassword}>
              <Icon
                name={ICON.CREATE}
                size="small"
                style={Styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {self.isProducer && (
          <View style={[GlobalStyles.PageFill, Styles.item]}>
            <H4>Your Channels</H4>

            <View style={[GlobalStyles.PageFill, Styles.item]}>
              <ChannelSelfs {...props} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Profile;
