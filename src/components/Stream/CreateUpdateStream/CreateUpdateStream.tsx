import React, { FC, MutableRefObject, useRef, useState } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import CreateUpdateStreamView from './CreateUpdateStreamView';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import ChannelSelfHeader from '../../UI/Headers/ChannelSelfHeader/ChannelSelfHeader';

export interface CreateUpdateStreamProps {
  id?: string;
}

export interface CreateUpdateStreamInnerProps extends CreateUpdateStreamProps {
  canPopRef: React.MutableRefObject<boolean>;
  innerRef?: MutableRefObject<ScrollView>;
}

const CreateUpdateStreamInner: FC<CreateUpdateStreamInnerProps> = (props) => {
  const screenProps = useScreenProps();
  const { data: { getChannelSelf } } = useGetChannelSelfQuery();
  const [id, setId] = useState(props.id);


  /**
   * Get stream with id
   */
  const queryResult = useGetStreamSelfQuery({
    variables: {
      id,
    },
  });


  /**
   * If id doesn't exist allow the query to fail
   * This allows the component to switch from create to update
   */
  if (props.id && (queryResult.loading || queryResult.error)) {
    return <LoadRetry {...queryResult} />;
  }


  return (
    <CreateUpdateStreamView
      channelData={getChannelSelf}
      data={queryResult?.data?.getStreamSelf}
      onCreated={setId}
      canPopRef={props.canPopRef}
      onPop={() => Navigation.pop(screenProps.componentId)}
      innerRef={props.innerRef}
    />
  );
};

const CreateUpdateStream: FC<CreateUpdateStreamProps> = (props) => {
  const canPopRef = useRef();
  const screenProps = useScreenProps();
  const ref = useRef<ScrollView>();


  /**
   * Handle on pop with alert for changes
   */
  const onPop = () => {
    // If ref is false, show alert before popping
    if (canPopRef.current === false) {
      Alert.alert(
        'Are you sure?',
        'You have unsaved changes.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => Navigation.pop(screenProps.componentId) },
        ],
      );
      return;
    }

    // Otherwise pop
    Navigation.pop(screenProps.componentId);
  };


  /**
   * Scroll to top of flatlist
   */
  const onPressLogo = () => {
    // eslint-disable-next-line no-unused-expressions
    ref.current?.scrollTo(0);
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <ChannelSelfHeader
        onPop={onPop}
        onPressLogo={onPressLogo}
      />
      <CreateUpdateStreamInner
        {...props}
        canPopRef={canPopRef}
        innerRef={ref}
      />
    </View>
  );
};

export default CreateUpdateStream;
