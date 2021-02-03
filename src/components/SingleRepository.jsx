import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({first: 3, id});
  
  const ItemSeparator = () => <View style={styles.separator} />;

  const item = repository ? repository : {};
  const reviews = item.reviews
    ? item.reviews.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

    return (
      <FlatList
        data={reviews}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => 
          <>
            <RepositoryItem repository={item} gitButton />
            <ItemSeparator />
          </>
        }
      />
    );
  };

export default SingleRepository;