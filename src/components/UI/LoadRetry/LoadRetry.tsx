import React, { useState } from 'react';
import { QueryResult } from 'react-apollo';
import { Text, ActivityIndicator, View, Button } from 'react-native';
import styles from './LoadRetry.style';

const LoadRetry = (props: Partial<QueryResult>) => {
  const [refetching, setRefetching] = useState(false);
  const { loading, refetch } = props;

  if (loading) {
    return (
      <View style={styles.wrap}>
        <ActivityIndicator size="large" color={'red'} />
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text>Something Went Wrong</Text>
      <Button
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
        disabled={refetching}
      />
    </View>
  );
};

export default LoadRetry;
