import React, { FC, useRef } from 'react';
import { FlatList, View } from 'react-native';
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
  const ref = useRef<FlatList>();


  /**
   * Get channel profile query
   */
  const queryResult = useGetChannelProfileQuery({
    variables: {
      id: props.id,
    },
  });


  /**
   * On Pop
   */
  const onPop = () => {
    Navigation.pop(screenProps.componentId);
  };


  /**
   * Scroll to top of flatlist
   */
  const onPressLogo = () => {
    // eslint-disable-next-line no-unused-expressions
    ref.current?.scrollToOffset({ animated: true, offset: 0 });
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <Header
        onPop={onPop}
        onPressLogo={onPressLogo}
      />
      <ChannelProfileView
        {...props}
        queryResult={queryResult}
        innerRef={ref}
      />
    </View>
  );
};

export default ChannelProfile;
