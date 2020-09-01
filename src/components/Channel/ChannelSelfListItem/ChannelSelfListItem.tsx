import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useDynamicValue } from 'react-native-dynamic';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CHANNEL_SELF_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_SELF_FRAGMENT';
import Styles from './ChannelSelfListItem.style';
import GlobalStyles, { GlobalDynamicStyles } from '../../../styles/stylesheets/GlobalStyles';
import H2 from '../../UI/Typography/components/H2';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import { useLoginChannelWithTokenMutation } from '../../../API/mutation/loginChannelWithToken/loginChannelWithToken';
import { pushScreen } from '../../../screens/utils';
import ChannelSelfScreen from '../../../screens/ChannelSelfScreen/ChannelSelfScreen';
import { pushToast } from '../../../modules/Toast';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon';

interface ChannelSelfListItemProps {
  data: CHANNEL_SELF_FRAGMENT;
}

const ChannelSelfListItem = (props: ChannelSelfListItemProps) => {
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);
  const screenProps = useScreenProps();


  /**
   * Login channel mutation
   * Gets channel tokens
   */
  const [loginChannelMutation, { loading }] = useLoginChannelWithTokenMutation({
    variables: {
      id: props.data.id,
    },
    onCompleted: () => {
      /**
       * Push ChannelSelfScreen
       */
      pushScreen(screenProps.componentId, ChannelSelfScreen, {});
    },
    onError: (e) => {
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
        ),
        dismissible: false,
      });
    },
  });


  return (
    <TouchableOpacity
      disabled={loading}
      onPress={() => {
        loginChannelMutation();
      }}
    >
      <View style={Styles.wrap}>
        <AsyncImage
          splashUrl={props.data?.coverImage?.url?.splash}
          fullUrl={props.data?.coverImage?.url?.full}
          containerProps={{
            style: StyleSheet.absoluteFill,
          }}
        />

        <View style={Styles.cover} />

        <View style={Styles.image}>
          <AsyncImage
            splashUrl={props.data?.profileImage?.url?.splash}
            fullUrl={props.data?.profileImage?.url?.full}
            containerProps={{
              style: [GlobalStyles.ImageCircleBorderInner, globalDynamicStyles.ImageCircleBorderInner],
            }}
          />
        </View>

        <H2
          forceLight
          style={Styles.name}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {props.data.name}
        </H2>

        {loading && (
          <View style={Styles.loading}>
            <LoadingIcon size="small" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChannelSelfListItem;
