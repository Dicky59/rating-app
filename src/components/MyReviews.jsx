import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import ReviewItem from './ReviewItem';
import theme from '../theme';
import { useHistory } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  reviewContainer: {
    backgroundColor: theme.colors.backgroundColor,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  alertButton: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'red',
    borderColor: 'red',
    margin: 6,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderWidth: 4,
    borderRadius: theme.roundness,
    padding: 10,
  },
  button: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    margin: 6,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderWidth: 4,
    borderRadius: theme.roundness,
    padding: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewsContainer = ({ authorizedUser, viewSingleRepo, deleteReview }) => {

  const deleteReviewAlert = (id) =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: () => deleteReview(id) }
      ],
      { cancelable: false }
  );

  const reviews = authorizedUser
  ? authorizedUser.reviews.edges.map(edge => edge.node)
  : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => 
      <View style={styles.reviewContainer}>
        <ReviewItem review={item} showRepositoryName />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => viewSingleRepo(item.repositoryId)} >
            <Text fontSize="subheading" style={styles.button}>View Repository</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteReviewAlert(item.id)} >
            <Text fontSize="subheading" style={styles.alertButton}>Delete review</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      }
    />
  );
};
const MyReviews = () => {
  const history = useHistory();
  const deleteReview = useDeleteReview();
  const { authorizedUser, refetch } = useAuthorizedUser({ includeReviews: true });

  const viewSingleRepo = id => {
    history.push(`/repository/${id}`);
  };

  const handleDeleteReview = async (id) => {
    try {
      const data = await deleteReview({ id });
      console.log(data);
      refetch();
    } catch (e) {
      console.log('error', e);
    }
  };

  return <MyReviewsContainer
  authorizedUser={authorizedUser}
  viewSingleRepo={viewSingleRepo}
  handleDeleteReview={handleDeleteReview}
  />;
};

export default MyReviews; 