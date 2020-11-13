import React, { FC } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import ChannelSelfHeader from '../../UI/Headers/ChannelSelfHeader/ChannelSelfHeader';
import GoLiveIntroView from './GoLiveIntroView';

export interface GoLiveIntroProps {
  id: string;
}


const GoLiveIntro: FC<GoLiveIntroProps> = (props) => {
  const screenProps = useScreenProps();

  return (
    <View style={GlobalStyles.PageFill}>
      <ChannelSelfHeader onPop={() => Navigation.pop(screenProps.componentId)} />
      <GoLiveIntroView {...props} />
    </View>
  );
};

export default GoLiveIntro;
