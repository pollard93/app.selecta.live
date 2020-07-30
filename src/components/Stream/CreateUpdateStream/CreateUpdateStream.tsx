import React, { FC } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { ScreenProps } from '../../../screens/utils/interfaces';
import Header, { useHeaderStyles } from '../../UI/Headers/Header/Header';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import CreateUpdateStreamView from './CreateUpdateStreamView';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';

export interface CreateUpdateStreamProps extends ScreenProps {
  id?: string;
}

const CreateUpdateStreamInner: FC<CreateUpdateStreamProps> = (props) => {
  if (!props.id) {
    return <CreateUpdateStreamView />;
  }

  const queryResult = useGetStreamSelfQuery({
    variables: {
      id: props.id,
    },
  });

  if (queryResult.loading || queryResult.error) {
    return <LoadRetry {...queryResult} />;
  }

  return (
    <CreateUpdateStreamView
      data={queryResult.data.getStreamSelf}
    />
  );
};

const CreateUpdateStream: FC<CreateUpdateStreamProps> = (props) => {
  const { headerHeight } = useHeaderStyles();
  const safeAreaInsets = useSafeArea();

  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={() => Navigation.pop(props.componentId)} />
      <View style={[GlobalStyles.PageFill, { paddingTop: safeAreaInsets.top + headerHeight / 2 }]}>
        <CreateUpdateStreamInner {...props} />
      </View>
    </View>
  );
};

export default CreateUpdateStream;
