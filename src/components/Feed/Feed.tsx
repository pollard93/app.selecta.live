import React from 'react';
import { View, FlatList, Text } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import gql from 'graphql-tag';
import Styles from './Feed.styles';
import { useGetFeedQuery } from '../../API/query/getFeed/getFeed';
import LoadRetry from '../UI/LoadRetry/LoadRetry';
import { FEED_TYPE } from '../../../__generated__/globalTypes';

const Feed = () => {
  const queryResult = useGetFeedQuery();

  if (queryResult.loading || queryResult.error) {
    return (
      <LoadRetry {...queryResult} />
    );
  }

  return (
    <View>
      <FlatList
        data={queryResult.data.getFeed.items}
        renderItem={({ item }) => (
          <View style={Styles.item}>
            <Text>{item.heading}</Text>
            {(() => {
              switch (item.type) {
                case FEED_TYPE.VERTICAL:
                  return (
                    <ApolloFlatList
                      query={gql(item.query)}
                      variables={item.variables}
                      accessor={item.accessor}
                      renderItem={(args) => (
                        <View>
                          {console.log(1, args.item)}
                        </View>
                      )}
                    />
                  );

                case FEED_TYPE.HORIZONTAL:
                  return (
                    <ApolloFlatList
                      query={gql(item.query)}
                      variables={item.variables}
                      accessor={item.accessor}
                      FlatListProps={{
                        horizontal: true,
                      }}
                      renderItem={(args) => (
                        <View>
                          {console.log(1, args.item)}
                        </View>
                      )}
                    />
                  );

                case FEED_TYPE.HORIZONTAL_SMALL:
                  return (
                    <ApolloFlatList
                      query={gql(item.query)}
                      variables={item.variables}
                      accessor={item.accessor}
                      FlatListProps={{
                        horizontal: true,
                      }}
                      renderItem={(args) => (
                        <View>
                          {console.log(1, args.item)}
                        </View>
                      )}
                    />
                  );

                default:
                  return null;
              }
            })()}
          </View>
        )}
        keyExtractor={(item, index) => `${item.heading}${index}`}
      />
    </View>
  );
};

export default Feed;
