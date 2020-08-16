import React, { FC, useRef } from 'react';
import { View, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { ScreenProps } from '../../../screens/utils/interfaces';
import Header, { useHeaderStyles } from '../../UI/Headers/Header/Header';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import CreateUpdateStreamView from './CreateUpdateStreamView';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { getStreamSelfsVariables } from '../../../API/query/getStreamSelfs/__generated__/getStreamSelfs';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';

export interface CreateUpdateStreamProps extends ScreenProps {
  id?: string;
  getStreamSelfsVariables?: getStreamSelfsVariables;
}

export interface CreateUpdateStreamInnerProps extends CreateUpdateStreamProps {
  canPopRef: React.MutableRefObject<boolean>;
}

const CreateUpdateStreamInner: FC<CreateUpdateStreamInnerProps> = (props) => {
  const { data: { getChannelSelf } } = useGetChannelSelfQuery();

  if (!props.id) {
    return (
      <CreateUpdateStreamView
        channelData={getChannelSelf}
        getStreamSelfsVariables={props.getStreamSelfsVariables}
        canPopRef={props.canPopRef}
        onPop={() => Navigation.pop(props.componentId)}
      />
    );
  }

  const queryResult = useGetStreamSelfQuery({
    variables: {
      id: props.id,
    },
  });
  console.log('queryResult', queryResult);

  if (queryResult.loading || queryResult.error) {
    return <LoadRetry {...queryResult} />;
  }

  return (
    <CreateUpdateStreamView
      channelData={getChannelSelf}
      data={queryResult.data.getStreamSelf}
      getStreamSelfsVariables={props.getStreamSelfsVariables}
      canPopRef={props.canPopRef}
      onPop={() => Navigation.pop(props.componentId)}
    />
  );
};

const CreateUpdateStream: FC<CreateUpdateStreamProps> = (props) => {
  const { headerHeight } = useHeaderStyles();
  const safeAreaInsets = useSafeArea();
  const canPopRef = useRef();


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
          { text: 'Yes', onPress: () => Navigation.pop(props.componentId) },
        ],
      );
      return;
    }

    // Otherwise pop
    Navigation.pop(props.componentId);
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={onPop} />
      <View style={[GlobalStyles.PageFill, { paddingTop: safeAreaInsets.top + headerHeight / 2 }]}>
        <CreateUpdateStreamInner {...props} canPopRef={canPopRef} />
      </View>
    </View>
  );
};

export default CreateUpdateStream;
