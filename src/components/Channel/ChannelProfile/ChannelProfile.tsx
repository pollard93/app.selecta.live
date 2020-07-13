import React, { FC } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { useGetChannelProfileQuery } from '../../../API/query/getChannelProfile/getChannelProfile';
import Header, { useHeaderStyles } from '../../UI/Headers/Header/Header';
import { ScreenProps } from '../../../screens/utils/interfaces';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import ChannelProfileView from './ChannelProfileView';

export interface ChannelProfileProps extends ScreenProps {
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

  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={() => Navigation.pop(props.componentId)} />
      <View style={[GlobalStyles.PageFill, { paddingTop: safeAreaInsets.top + headerHeight / 2 }]}>
        <ChannelProfileView
          id={props.id}
          queryResult={queryResult}
        />
      </View>
    </View>
  );
};

export default ChannelProfile;
