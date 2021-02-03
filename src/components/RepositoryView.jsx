import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 5,
  },
});

const RepositoryView = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({ first: 3, id });

  const onEndReach = () => {
    fetchMore();
  };
  
  const ItemSeparator = () => <View style={styles.separator} />;

  const item = repository ? repository : {};
  const reviews = item.reviews
    ? item.reviews.edges.map(edge => edge.node)
    : [];

    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => 
          <>
            <RepositoryItem repository={item} gitButton />
            <ItemSeparator />
          </>
        }
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  };

export default RepositoryView;