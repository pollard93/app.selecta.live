import React, { FC } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { useGetChannelProfileQuery } from '../../../API/query/getChannelProfile/getChannelProfile';
import Header, { useHeaderStyles } from '../../UI/Headers/Header/Header';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import ChannelProfileView from './ChannelProfileView';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';

export interface ChannelProfileProps {
  id: string;
}

const ChannelProfile: FC<ChannelProfileProps> = (props) => {
  /**
   * Get channel profile query
   */
  const queryResult = useGetChannelProfileQuery({
    variables: {
      id: props.id,
    },
  });

  const { headerHeight } = useHeaderStyles();
  const safeAreaInsets = useSafeArea();
  const screenProps = useScreenProps();

  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={() => Navigation.pop(screenProps.componentId)} />
      <View style={[GlobalStyles.PageFill, { paddingTop: safeAreaInsets.top + headerHeight / 2 }]}>
        <ChannelProfileView
          {...props}
          queryResult={queryResult}
        />
      </View>
    </View>
  );
};

export default ChannelProfile;
