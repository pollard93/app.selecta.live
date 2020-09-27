import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDynamicValue } from 'react-native-dynamic';
import { STREAM_PROFILE_FRAGMENT } from '../../../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT';
import H4 from '../../../../UI/Typography/components/H4';
import Body from '../../../../UI/Typography/components/Body';
import { formatForTimezone, getGQLErrorMessage } from '../../../../../utils/functions';
import Button from '../../../../UI/Button/Button';
import { useGetSelf, GET_SELF_QUERY } from '../../../../../API/query/getSelf/getSelf';
import { openTopUpModal } from '../../../../../screens/utils';
import { usePurchaseStreamMutation } from '../../../../../API/mutation/purchaseStream/purchaseStream';
import Toast from '../../../../UI/Toast/Toast';
import Styles, { DynamicStyles } from './StreamPurchase.styles';
import H1 from '../../../../UI/Typography/components/H1';
import { getSelf } from '../../../../../API/query/getSelf/__generated__/getSelf';
import { GlobalDynamicStyles } from '../../../../../styles/stylesheets/GlobalStyles';
import { pushToast } from '../../../../../modules/Toast';
import { getStreamDuration } from '../../../../../utils/streamFunctions';

interface StreamPurchaseProps {
  data: STREAM_PROFILE_FRAGMENT;
}

const StreamPurchase: FC<StreamPurchaseProps> = (props) => {
  const self = useGetSelf();
  const [confirming, setConfirming] = useState(false);
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);
  const dynamicStyles = useDynamicValue(DynamicStyles);


  /**
   * Pay for stream mutation
   */
  const [mutation, { loading, client }] = usePurchaseStreamMutation({
    variables: {
      id: props.data.id,
    },
    onCompleted: () => {
      /**
       * On completion remove the cost of the stream from the users credit in cache
       */
      try {
        client.writeQuery<getSelf>({
          query: GET_SELF_QUERY,
          data: {
            getSelf: {
              ...self,
              credit: self.credit - props.data.cost,
            },
          },
        });
      // eslint-disable-next-line no-empty
      } catch {}

      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="SUCCESS"
            content="Purchase successful, enjoy!"
          />
        ),
        dismissible: false,
      });
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
   * On Purchase
   * If stream is free, then execute mutation
   * If user does not have enough credit, open top up modal
   * Otherwise, set state to confirming
   * If already confirming, then execute mutation
   */
  const onPurchase = () => {
    if (props.data.cost === 0) {
      /**
       * PURCHASE STREAM
       */
      mutation();
      return;
    }

    if (self.credit < props.data.cost) {
      openTopUpModal();
      return;
    }

    if (!confirming) {
      setConfirming(true);
      return;
    }

    /**
     * PURCHASE STREAM
     */
    mutation();
  };


  /**
   * Duration
   */
  const duration = getStreamDuration(props.data);


  return (
    <ScrollView
      style={Styles.wrap}
      bounces={false}
    >
      <View style={[Styles.info, dynamicStyles.info]}>
        <Body>{props.data.info}</Body>
      </View>

      <View style={Styles.buy}>
        <H4>Buy this stream</H4>
        <View style={Styles.ticket}>
          <View style={[Styles.ticketInfo, dynamicStyles.ticket]}>
            <View style={[globalDynamicStyles.background, Styles.notch, Styles.notchRight]} />
            <View style={[globalDynamicStyles.background, Styles.notch, Styles.notchRight, Styles.notchBottom]} />

            <Body bold>Admission #1</Body>
            <Body bold>{formatForTimezone(props.data.timeFromLive || props.data.timeFrom, 'calendar')}</Body>
            <Body bold>Entry from {formatForTimezone(props.data.timeFromLive || props.data.timeFrom, 'HH:mm')} {formatForTimezone(props.data.timeFromLive || props.data.timeFrom, 'z')}</Body>
            <Body bold>{`${duration.hours} Hours ${duration.minutes ? `${duration.minutes} Minutes` : ''}`}</Body>
          </View>

          <View style={[Styles.cost, dynamicStyles.ticket]}>
            <View style={Styles.separator} />
            <View style={[globalDynamicStyles.background, Styles.notch]} />
            <View style={[globalDynamicStyles.background, Styles.notch, Styles.notchBottom]} />

            <H1>© {props.data.cost}</H1>
          </View>
        </View>
      </View>

      <View style={Styles.lower}>
        <Button
          title={(() => {
            if (loading) return 'Purchasing Stream';

            if (props.data.cost === 0) {
              return 'Watch this stream for free!';
            }

            return confirming ? 'Press to confirm your purchase!' : `Buy this stream for © ${props.data.cost}`;
          })()}
          onPress={onPurchase}
          loading={loading}
          testID="submit"
        />
      </View>
    </ScrollView>
  );
};

export default StreamPurchase;
