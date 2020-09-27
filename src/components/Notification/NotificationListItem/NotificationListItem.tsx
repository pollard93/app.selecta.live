import React, { FC, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useDynamicValue } from 'react-native-dynamic';
import { NOTIFICATION_FRAGMENT } from '../../../API/fragments/__generated__/NOTIFICATION_FRAGMENT';
import { useLoginChannelWithTokenMutation } from '../../../API/mutation/loginChannelWithToken/loginChannelWithToken';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import { pushScreen } from '../../../screens/utils';
import ChannelSelfScreen from '../../../screens/ChannelSelfScreen/ChannelSelfScreen';
import { NOTIFICATION_ON_OPEN_TYPE } from '../../../../__generated__/globalTypes';
import StreamProfileScreen from '../../../screens/StreamProfileScreen/StreamProfileScreen';
import { getGQLErrorMessage } from '../../../utils/functions';
import Toast from '../../UI/Toast/Toast';
import { useReadNotificationMutation } from '../../../API/mutation/readNotification/readNotification';
import { getSelf } from '../../../API/query/getSelf/__generated__/getSelf';
import { GET_SELF_QUERY } from '../../../API/query/getSelf/getSelf';
import { pushToast } from '../../../modules/Toast';
import { updateStoredGetSelf } from '../../../utils/userFunctions';
import Markdown from '../../UI/Markdown/Markdown';
import PulsingIcon from '../../UI/PulsingIcon/PulsingIcon';
import Styles from './NotificationListItem.styles';
import ChannelProfileScreen from '../../../screens/ChannelProfileScreen/ChannelProfileScreen';
import GlobalStyles, { GlobalDynamicStyles } from '../../../styles/stylesheets/GlobalStyles';

interface NotificationListItemProps {
  data: NOTIFICATION_FRAGMENT;
}

const NotificationListItem: FC<NotificationListItemProps> = (props) => {
  const screenProps = useScreenProps();
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);


  /**
   *
   */
  const [loginChannelMutation, { loading }] = useLoginChannelWithTokenMutation({
    onCompleted: () => {
      /**
       * Psuh ChannelSelfScreen
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


  /**
   * Read notification mutation
   */
  const [readNotificationMutation, { client }] = useReadNotificationMutation({
    variables: {
      id: props.data.id,
    },
    onCompleted: () => {
      /**
       * On Completed decrement the unreadNotificationCount
       */
      try {
        const data = client.readQuery<getSelf>({
          query: GET_SELF_QUERY,
        });

        client.writeQuery<getSelf>({
          query: GET_SELF_QUERY,
          data: {
            ...data,
            getSelf: {
              ...data.getSelf,
              unreadNotificationCount: Math.max(0, data.getSelf.unreadNotificationCount - 1),
            },
          },
        });
      // eslint-disable-next-line no-empty
      } catch {}

      /**
       * Update store
       */
      updateStoredGetSelf();
    },
  });


  /**
   * Handle touch
   */
  const onPressNotification = () => {
    if (loading) return;


    /**
     * Set notification to read
     */
    if (props.data.readDate === null) {
      readNotificationMutation();
    }


    /**
     * Try and handle some effect on opening
     */
    try {
      switch (props.data.onOpenType) {
        case NOTIFICATION_ON_OPEN_TYPE.STREAM:
          pushScreen(screenProps.componentId, StreamProfileScreen, { id: props.data.stream.id });
          break;

        case NOTIFICATION_ON_OPEN_TYPE.CHANNEL:
          pushScreen(screenProps.componentId, ChannelProfileScreen, { id: props.data.stream.id });
          break;

        case NOTIFICATION_ON_OPEN_TYPE.CHANNEL_LOGIN:
          loginChannelMutation({
            variables: {
              id: props.data.channel.id,
            },
          });
          break;

        default:
          break;
      }
    // eslint-disable-next-line no-empty
    } catch {}
  };


  /**
   * Get image for notification
   */
  const imageUrl = useMemo(() => {
    try {
      switch (props.data.onOpenType) {
        case NOTIFICATION_ON_OPEN_TYPE.STREAM:
          return props.data.stream.image.url;

        case NOTIFICATION_ON_OPEN_TYPE.CHANNEL:
        case NOTIFICATION_ON_OPEN_TYPE.CHANNEL_LOGIN:
          return props.data.channel.profileImage.url;

        default:
          return null;
      }
    } catch {
      return null;
    }
  }, []);


  return (
    <TouchableOpacity onPress={onPressNotification}>
      <View style={[Styles.wrap, props.data.readDate && Styles.read]}>
        {imageUrl && (
          <View style={Styles.image}>
            <AsyncImage
              splashUrl={imageUrl.splash}
              fullUrl={imageUrl.full}
              containerProps={{
                style: [GlobalStyles.ImageCircleBorderInner, globalDynamicStyles.ImageCircleBorderInner],
              }}
            />
          </View>
        )}

        <View style={Styles.content}>
          <Markdown>{props.data.message}</Markdown>
        </View>

        {!props.data.readDate && (
          <View style={Styles.pulse}>
            <PulsingIcon
              animating={new Date(props.data.createdAt).getTime() - new Date().getTime() < 3.6e+6}
              duration={1000}
              delay={5000}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NotificationListItem;
