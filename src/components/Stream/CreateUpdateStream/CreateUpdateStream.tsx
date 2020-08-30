import React, { FC, useRef, useState } from 'react';
import { View, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Header from '../../UI/Headers/Header/Header';
import CreateUpdateStreamView from './CreateUpdateStreamView';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { getStreamSelfsVariables } from '../../../API/query/getStreamSelfs/__generated__/getStreamSelfs';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';

export interface CreateUpdateStreamProps {
  id?: string;
  getStreamSelfsVariables?: getStreamSelfsVariables;
}

export interface CreateUpdateStreamInnerProps extends CreateUpdateStreamProps {
  canPopRef: React.MutableRefObject<boolean>;
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
      getStreamSelfsVariables={props.getStreamSelfsVariables}
      canPopRef={props.canPopRef}
      onPop={() => Navigation.pop(screenProps.componentId)}
    />
  );
};

const CreateUpdateStream: FC<CreateUpdateStreamProps> = (props) => {
  const canPopRef = useRef();
  const screenProps = useScreenProps();


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


  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={onPop} />
      <CreateUpdateStreamInner {...props} canPopRef={canPopRef} />
    </View>
  );
};

export default CreateUpdateStream;
