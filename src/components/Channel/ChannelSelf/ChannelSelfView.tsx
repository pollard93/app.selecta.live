import React, { FC } from 'react';
import { QueryResult } from 'react-apollo';
import { useDarkMode } from 'react-native-dynamic';
import { Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Body from '../../UI/Typography/components/Body';
import { ScreenProps } from '../../../screens/utils/interfaces';
import { getChannelSelf } from '../../../API/query/getChannelSelf/__generated__/getChannelSelf';
import ChannelHeader from '../ChannelHeader/ChannelHeader';
import color from '../../../styles/definitions/color';
import Icon, { ICON } from '../../UI/Icon/Icon';
import Styles from './ChannelSelf.style';

export interface ChannelSelfViewProps extends ScreenProps {
  queryResult: QueryResult<getChannelSelf>;
}

const ChannelSelfView: FC<ChannelSelfViewProps> = (props) => {
  const darkMode = useDarkMode();

  return (
    <ChannelHeader
      {...props}
      data={props.queryResult.data?.getChannelSelf}
      topContent={({ titleColor, followChannelColor }) => (
        <>
          <TouchableOpacity
            onPress={() => {
              /**
               * TODO - Push ManageStreamsScreen
               */
            }}
          >
            <Animated.View
              style={[
                Styles.manageButton,
                { backgroundColor: darkMode ? color.mono.light : titleColor },
              ]}
            >
              <Animated.Text style={{ color: darkMode ? color.mono.dark : followChannelColor }}>
                <Body bold disableBaseColor>Manage Streams</Body>
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              /**
               * TODO - Push EditChannelScreen
               */
            }}
            style={Styles.editButton}
          >
            <Icon
              name={ICON.COG}
              size="small"
              animated
            />
          </TouchableOpacity>
        </>
      )}
    >
      {() => (
        <Body>Channel Self</Body>
      )}
    </ChannelHeader>
  );
};

export default ChannelSelfView;
