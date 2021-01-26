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
  const { repository } = useRepository(id);
  
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
      />
    );
  };

export default SingleRepository;