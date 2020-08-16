import React, { FC } from 'react';
import { View, TextInput } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Clipboard from '@react-native-community/clipboard';
import { useToast } from 'mbp-components-rn-toast';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import Styles from './StreamSelfListItem.style';
import Body from '../../UI/Typography/components/Body';
import Button from '../../UI/Button/Button';
import H3 from '../../UI/Typography/components/H3';
import { formatForTimezone } from '../../../utils/functions';
import Icon, { ICON } from '../../UI/Icon/Icon';
import { pushScreen } from '../../../screens/utils';
import { STACK } from '../../../screens/utils/interfaces';
import StreamProfileScreen from '../../../screens/StreamProfileScreen/StreamProfileScreen';
import Toast from '../../UI/Toast/Toast';
import CreateUpdateStreamScreen from '../../../screens/CreateUpdateStreamScreen/CreateUpdateStreamScreen';

interface StreamListItemProps {
  data: STREAM_SELF_FRAGMENT;
}

const StreamListItem: FC<StreamListItemProps> = ({ data }) => {
  const toast = useToast();


  /**
   * Set text in clipboard and toast success
   */
  const onCopy = (text: string) => {
    Clipboard.setString(text);

    toast.push({
      duration: 1000,
      component: (
        <Toast content='Copied!' />
      ),
      dismissible: false,
    });
  };


  /**
   * Push CreateUpdateStreamScreen
   */
  const onEdit = () => {
    pushScreen(STACK.TAB_PRODUCER, CreateUpdateStreamScreen, {
      id: data.id,
    });
  };


  return (
    <View style={Styles.wrap}>
      <View style={Styles.banner}>
        <Body bold style={Styles.bannerHeader}>
          Live On: {formatForTimezone(data.timeFrom, 'DD/MM/Y HH:mm z')}
          {new Date(data.timeFrom) > new Date() && ' (Upcoming)'}
        </Body>

        {new Date(data.timeFrom) >= new Date() && (
          <Button
            title="Edit"
            type="LIGHT"
            onPress={onEdit}
            size="small"
          />
        )}
      </View>

      <View style={Styles.body}>
        <View style={Styles.header}>
          <H3
            numberOfLines={3}
            ellipsizeMode="tail"
            style={Styles.title}
          >
            {data.name}
          </H3>
          <AsyncImage
            containerProps={{
              style: Styles.image,
            }}
            fullUrl={data.image.url.full}
            splashUrl={data.image.url.splash}
          />
        </View>

        <View style={Styles.details}>
          <View style={Styles.detail}>
            <Body>{data.tags.map(({ title }) => `#${title} `)}</Body>
            <Body>Ticket Price: &copy;{data.cost}</Body>
            <Body>Stream Duration: {(new Date(data.timeTo).getTime() - new Date(data.timeFrom).getTime()) / 3.6e+6} Hours</Body>
          </View>
          <View style={Styles.meta}>
            <Body>Streams: {data.viewCount}</Body>
            <Body>Purchases: {data.consumersEdge}</Body>
          </View>
        </View>

        <Body bold>{data.info}</Body>

        {new Date(data.timeFrom) >= new Date() ? (
          <>
            <Button
              type="PRIMARY"
              title="View Stream"
              onPress={() => pushScreen(STACK.HOME, StreamProfileScreen, { id: data.id })}
              style={Styles.streamButton}
            />

            <View style={Styles.authKeys}>
              <View style={Styles.authKey}>
                <Body bold>Stream Url: </Body>
                <Body
                  style={Styles.authKeyBody}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {data.streamUrl}{data.streamUrl}
                </Body>

                <TouchableOpacity onPress={() => onCopy(data.streamUrl)}>
                  <Icon name={ICON.COPY} size="small" />
                </TouchableOpacity>
              </View>

              <View style={Styles.authKey}>
                <Body bold>Stream Key: </Body>
                <TextInput
                  editable={false}
                  secureTextEntry={true}
                  value={data.streamKey}
                  style={Styles.authKeyBody}
                />

                <TouchableOpacity onPress={() => onCopy(data.streamKey)}>
                  <Icon name={ICON.COPY} size="small" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <View style={Styles.metrics}>
            <TouchableOpacity onPress={() => pushScreen(STACK.HOME, StreamProfileScreen, { id: data.id })}>
              <View style={Styles.metric}>
                <Icon name={ICON.CHAT} size="small" />
                <Body style={Styles.metricBody}>7231 Comments</Body>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => pushScreen(STACK.HOME, StreamProfileScreen, { id: data.id })}>
              <View style={Styles.metric}>
                <Icon name={ICON.PLAY} size="small" />
                <Body style={Styles.metricBody}>View Stream</Body>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default StreamListItem;
