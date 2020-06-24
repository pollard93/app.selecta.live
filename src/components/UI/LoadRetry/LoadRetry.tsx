import React, { useState } from 'react';
import { QueryResult } from 'react-apollo';
import { ActivityIndicator, View } from 'react-native';
import styles from './LoadRetry.style';
import color from '../../../styles/definitions/color';
import H4 from '../Typography/components/H4';
import Button from '../Button/Button';

const LoadRetry = (props: Partial<QueryResult>) => {
  const [refetching, setRefetching] = useState(false);
  const { loading, refetch } = props;

  if (loading) {
    return (
      <View style={styles.wrap}>
        <ActivityIndicator size="large" color={color.mono.dark} />
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <H4>Something Went Wrong</H4>
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
