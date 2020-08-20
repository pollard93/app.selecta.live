import React, { FC, useRef } from 'react';
import { View, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { ScreenProps } from '../../../screens/utils/interfaces';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import Header, { useHeaderStyles } from '../../UI/Headers/Header/Header';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import UpdateChannelView from './UpdateChannelView';

interface UpdateChannelProps extends ScreenProps {}

const UpdateChannel: FC<UpdateChannelProps> = (props) => {
  const { data: { getChannelSelf } } = useGetChannelSelfQuery();
  const { headerHeight } = useHeaderStyles();
  const safeAreaInsets = useSafeArea();
  const canPopRef = useRef();


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
          { text: 'Yes', onPress: () => Navigation.pop(props.componentId) },
        ],
      );
      return;
    }

    // Otherwise pop
    Navigation.pop(props.componentId);
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={onPop} />
      <View style={[GlobalStyles.PageFill, { paddingTop: safeAreaInsets.top + headerHeight / 2 }]}>
        <UpdateChannelView data={getChannelSelf} canPopRef={canPopRef} />
      </View>
    </View>
  );
};

export default UpdateChannel;
