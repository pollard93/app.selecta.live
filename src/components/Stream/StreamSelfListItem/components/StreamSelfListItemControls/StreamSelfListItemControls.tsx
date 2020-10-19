import React, { FC, useState } from 'react';
import { View } from 'react-native';
import moment from 'moment-timezone';
import Styles from './StreamSelfListControls.style';
import Body from '../../../../UI/Typography/components/Body';
import Button from '../../../../UI/Button/Button';
import { pushScreen } from '../../../../../screens/utils';
import StreamSelfScreen from '../../../../../screens/StreamSelfScreen/StreamSelfScreen';
import { StreamSelfListItemProps } from '../../StreamSelfListItem';
import { useScreenProps } from '../../../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import GoLiveScreen from '../../../../../screens/GoLiveScreen/GoLiveScreen';
import { useStreamStart, canGoLive } from '../../../../../utils/streamFunctions';
import CreateUpdateStreamScreen from '../../../../../screens/CreateUpdateStreamScreen/CreateUpdateStreamScreen';
import spacing from '../../../../../styles/definitions/spacing';
import Chip from '../../../../UI/Chip/Chip';

const StreamSelfListItemControls: FC<StreamSelfListItemProps> = (props) => {
  const screenProps = useScreenProps();


  /**
   * When the stream is available to go live, force update to make the go live button available
   */
  const [, setState] = useState({});
  useStreamStart(new Date(new Date(props.data.timeFrom).getTime() - 1.8e+6).toISOString(), () => setState({}));


  /**
   * Push CreateUpdateStreamScreen
   */
  const onEdit = () => {
    pushScreen(screenProps.componentId, CreateUpdateStreamScreen, { id: props.data.id });
  };


  /**
   * Push StreamSelfScreen
   */
  const onView = () => {
    pushScreen(screenProps.componentId, StreamSelfScreen, { id: props.data.id });
  };


  /**
   * Push GoLiveScreen
   */
  const onGoLive = () => {
    pushScreen(screenProps.componentId, GoLiveScreen, { id: props.data.id });
  };


  /**
   * If cancelled
   * return view button
   */
  if (props.data.cancelled !== null) {
    return (
      <View style={Styles.spaceBetween}>
        <View style={Styles.row}>
          <Button
            title="Edit"
            size="small"
            type="LIGHT"
            onPress={onEdit}
          />
          <Button
            title="View"
            size="small"
            onPress={onView}
            style={{ marginLeft: spacing.small }}
          />
        </View>

        <Chip bold type="SECONDARY">Cancelled</Chip>
      </View>
    );
  }


  /**
   * If not published
   * or finished
   * return edit button
   */
  if (props.data.published === null) {
    return (
      <View style={Styles.topRight}>
        <Button
          title="Edit"
          size="small"
          onPress={onEdit}
        />
      </View>
    );
  }


  /**
   * If finished
   * return edit and view button
   */
  if (props.data.timeToLive !== null) {
    return (
      <View style={Styles.spaceBetween}>
        <View style={Styles.row}>
          <Button
            title="Edit"
            size="small"
            type="LIGHT"
            onPress={onEdit}
          />
          <Button
            title="View"
            size="small"
            onPress={onView}
            style={{ marginLeft: spacing.small }}
          />
        </View>

        <Chip bold type="SECONDARY">{props.data.unlisted ? 'Unlisted' : 'Listed'}</Chip>
      </View>
    );
  }


  /**
   * If stream is live
   * Return button to end live if stream is live
   */
  if (props.data.timeFromLive) {
    return (
      <View style={Styles.spaceBetween}>
        <View style={Styles.row}>
          <Button
            title="Edit"
            size="small"
            type="LIGHT"
            onPress={onEdit}
          />
          <Button
            title="View"
            size="small"
            onPress={onView}
            style={{ marginLeft: spacing.small }}
          />
        </View>

        <Button
          type="PRIMARY"
          title="END LIVE"
          onPress={onGoLive}
        />
      </View>
    );
  }


  /**
   * If within half an hour of timeFrom then show go live button
   */
  if (canGoLive(props.data)) {
    return (
      <View style={Styles.spaceBetween}>
        <View style={Styles.row}>
          <Button
            title="Edit"
            size="small"
            type="LIGHT"
            onPress={onEdit}
          />
          <Button
            title="View"
            size="small"
            onPress={onView}
            style={{ marginLeft: spacing.small }}
          />
        </View>

        <Button
          type="PRIMARY"
          title="GO LIVE"
          onPress={onGoLive}
        />
      </View>
    );
  }


  /**
   * Otherwise show a disabled button saying they can go live half an hour before
   */
  return (
    <View style={Styles.spaceBetween}>
      <View style={Styles.row}>
        <Button
          title="Edit"
          size="small"
          type="LIGHT"
          onPress={onEdit}
        />
        <Button
          title="View"
          size="small"
          onPress={onView}
          style={{ marginLeft: spacing.small }}
        />
      </View>

      <Chip type="PRIMARY">
        <Body bold forceLight>{`Go live ${moment(new Date(new Date(props.data.timeFrom).getTime() - 1.8e+6)).fromNow()}`}</Body>
      </Chip>
    </View>
  );
};

export default StreamSelfListItemControls;
