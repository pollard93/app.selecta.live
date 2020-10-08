import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Styles from './ChannelSelfHeader.style';
import Icon, { ICON } from '../../Icon/Icon';
import useSafeArea from '../../../../modules/SafeAreaInsets/SafeAreaInsets';
import { useScreenProps } from '../../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import { useGetChannelSelfQuery } from '../../../../API/query/getChannelSelf/getChannelSelf';
import { useHeaderStyles } from '../Header/Header';
import H3 from '../../Typography/components/H3';

interface ChannelSelfHeaderProps {
  onPop?: () => void;
  onPressLogo?: () => void;
}


const ChannelSelfHeader: FC<ChannelSelfHeaderProps> = (props) => {
  const { data: { getChannelSelf } } = useGetChannelSelfQuery();
  const screenProps = useScreenProps();
  const safeAreaInsets = useSafeArea();
  const { headerHeight, headerZindex } = useHeaderStyles();


  /**
   * Pop to root
   */
  const onPopToRoot = () => {
    Navigation.popToRoot(screenProps.componentId);
  };


  return (
    <View
      style={[
        Styles.wrap,
        {
          paddingTop: safeAreaInsets.top,
          zIndex: headerZindex,
        },
      ]}
    >
      <View
        style={[
          Styles.inner,
          safeAreaInsets.top === 0 && Styles.noSafeArea,
          { height: headerHeight },
        ]}
      >
        {props.onPop && (
          <TouchableOpacity
            onPress={props.onPop}
            style={Styles.back}
          >
            <Icon
              name={ICON.ARROW_BACKWARD}
              size="xsmall"
              forceLight
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={props.onPressLogo || onPopToRoot}
          style={Styles.headingWrap}
          disabled={!props.onPop && !props.onPressLogo}
        >
          <H3
            numberOfLines={2}
            ellipsizeMode="tail"
            forceLight
          >
            {getChannelSelf.name}
          </H3>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChannelSelfHeader;
