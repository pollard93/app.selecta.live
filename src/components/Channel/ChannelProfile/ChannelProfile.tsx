import React, { FC } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { useGetChannelProfileQuery } from '../../../API/query/getChannelProfile/getChannelProfile';
import Header from '../../UI/Headers/Header/Header';
import ChannelProfileView from './ChannelProfileView';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';

export interface ChannelProfileProps {
  id: string;
}

const ChannelProfile: FC<ChannelProfileProps> = (props) => {
  const screenProps = useScreenProps();


  /**
   * Get channel profile query
   */
  const queryResult = useGetChannelProfileQuery({
    variables: {
      id: props.id,
    },
  });


  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={() => Navigation.pop(screenProps.componentId)} />
      <ChannelProfileView
        {...props}
        queryResult={queryResult}
      />
    </View>
  );
};

export default ChannelProfile;
