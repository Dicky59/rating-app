import React from 'react';
import { FlatList } from 'react-native';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import ReviewItem from './ReviewItem';

const MyReviewsContainer = ({ authorizedUser }) => {
  const reviews = authorizedUser
  ? authorizedUser.reviews.edges.map(edge => edge.node)
  : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} showRepositoryName />}
    />
  );
};
const MyReviews = () => {
  const authorizedUser = useAuthorizedUser({ includeReviews: true });
  return <MyReviewsContainer authorizedUser={authorizedUser} />;
};

export default MyReviews; 