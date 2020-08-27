import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { NOTIFICATION_FRAGMENT } from '../../../API/fragments/__generated__/NOTIFICATION_FRAGMENT';
import { useLoginChannelWithTokenMutation } from '../../../API/mutation/loginChannelWithToken/loginChannelWithToken';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import { pushScreen } from '../../../screens/utils';
import ChannelSelfScreen from '../../../screens/ChannelSelfScreen/ChannelSelfScreen';
import { NOTIFICATION_TYPE } from '../../../../__generated__/globalTypes';
import StreamProfileScreen from '../../../screens/StreamProfileScreen/StreamProfileScreen';
import { getGQLErrorMessage } from '../../../utils/functions';
import Toast from '../../UI/Toast/Toast';
import { useReadNotificationMutation } from '../../../API/mutation/readNotification/readNotification';
import { getSelf } from '../../../API/query/getSelf/__generated__/getSelf';
import { GET_SELF_QUERY } from '../../../API/query/getSelf/getSelf';

interface NotificationListItemProps {
  data: NOTIFICATION_FRAGMENT;
}

const NotificationListItem: FC<NotificationListItemProps> = (props) => {
  const screenProps = useScreenProps();
  const toast = useToast();


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
      toast.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorMessage(e)} />
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
    },
  });


  /**
   * Handle touch
   */
  const onPressNotification = () => {
    if (loading) return;

    switch (props.data.type) {
      case NOTIFICATION_TYPE.STREAM_CANCELLED:
      case NOTIFICATION_TYPE.NEW_STREAM_FROM_FOLLOWING:
        /**
         * Push StreamProfile Screen
         */
        pushScreen(screenProps.componentId, StreamProfileScreen, { id: props.data.stream.id });
        break;

      case NOTIFICATION_TYPE.REQUESTED_CHANNEL_APPROVED:
        loginChannelMutation({
          variables: {
            id: props.data.channel.id,
          },
        });
        break;

      default:
        break;
    }


    /**
     * Set notification to read
     */
    if (props.data.readDate === null) {
      readNotificationMutation();
    }
  };


  return (
    <TouchableOpacity onPress={onPressNotification}>
      <Text>{props.data.type}</Text>
      <Text>{props.data.readDate ? 'read' : 'unread'}</Text>
      <Text>{loading ? 'loading' : ''}</Text>
    </TouchableOpacity>
  );
};

export default NotificationListItem;
