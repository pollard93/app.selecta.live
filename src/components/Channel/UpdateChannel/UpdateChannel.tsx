import React, { FC, useRef } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import UpdateChannelView from './UpdateChannelView';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import ChannelSelfHeader from '../../UI/Headers/ChannelSelfHeader/ChannelSelfHeader';

interface UpdateChannelProps {}

const UpdateChannel: FC<UpdateChannelProps> = () => {
  const { data: { getChannelSelf } } = useGetChannelSelfQuery();
  const canPopRef = useRef();
  const screenProps = useScreenProps();
  const ref = useRef<ScrollView>();


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


  /**
   * Scroll to top of flatlist
   */
  const onPressLogo = () => {
    // eslint-disable-next-line no-unused-expressions
    ref.current?.scrollTo(0);
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <ChannelSelfHeader
        onPop={onPop}
        onPressLogo={onPressLogo}
      />
      <UpdateChannelView
        data={getChannelSelf}
        canPopRef={canPopRef}
        innerRef={ref}
      />
    </View>
  );
};

export default UpdateChannel;
