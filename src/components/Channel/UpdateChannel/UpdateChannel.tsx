import React, { FC, useRef } from 'react';
import { View, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import Header from '../../UI/Headers/Header/Header';
import UpdateChannelView from './UpdateChannelView';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';

interface UpdateChannelProps {}

const UpdateChannel: FC<UpdateChannelProps> = () => {
  const { data: { getChannelSelf } } = useGetChannelSelfQuery();
  const canPopRef = useRef();
  const screenProps = useScreenProps();


  /**
   * Handle on pop
   */
  const onPop = () => {
    // If ref is false, show alert before popping
    if (canPopRef.current === false) {
      Alert.alert(
        'Are you sure?',
        'You have unsaved changes.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => Navigation.pop(screenProps.componentId) },
        ],
      );
      return;
    }

    // Otherwise pop
    Navigation.pop(screenProps.componentId);
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={onPop} />
      <UpdateChannelView data={getChannelSelf} canPopRef={canPopRef} />
    </View>
  );
};

export default UpdateChannel;
