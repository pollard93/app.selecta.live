import React, { useState, FC } from 'react';
import { QueryResult } from 'react-apollo';
import { View } from 'react-native';
import styles from './LoadRetry.style';
import H4 from '../Typography/components/H4';
import Button from '../Button/Button';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { getGQLErrorMessage } from '../../../utils/functions';

interface LoadRetryProps extends Partial<QueryResult> {
  cover?: boolean; // Absolutely fills parent
}

const LoadRetry: FC<LoadRetryProps> = (props) => {
  const [refetching, setRefetching] = useState(false);
  const { loading, called, refetch, error } = props;

  if (loading || !called) {
    return (
      <View style={[styles.wrap, props.cover && styles.cover]}>
        <LoadingIcon />
      </View>
    );
  }

  return (
    <View style={[styles.wrap, props.cover && styles.cover]}>
      <H4>{getGQLErrorMessage(error)}</H4>
      <Button
        style={styles.button}
        title="Retry"
        onPress={async () => {
          setRefetching(true);

          // Refetch, if it fails again then reset the refetching
          // If it succeeds, this component should be removed from render
          try {
            await refetch();
          } catch (e) {
            setRefetching(false);
          }
        }}
        loading={refetching}
      />
    </View>
  );
};

export default LoadRetry;
