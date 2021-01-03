import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';
import StatisticItem from './StatisticItem';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#F5F5DC',
  },
  avatar: {
    width: 50,
    height: 50,
    margin: 20,
    borderRadius: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  languageText: {
    color: 'white',
  },
  flexContainerA: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  flexContainerB: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
    flex: 0.8,
  },
  countDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  fullname: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 10,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
    marginBottom: 10,
  },
});

const RepositoryListItem = ({ list }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexContainerA}>
        <View>
          <Image 
            style={styles.avatar} 
            source={{ uri: `${list.item.ownerAvatarUrl}` }}
          />
        </View>
        <View style={styles.flexContainerB}>
          <View>
            <Text style={styles.fullname}>{list.item.fullName}</Text>
          </View>
          <View>
            <Text style={styles.description}>{list.item.description}</Text>
          </View>
          <View style={styles.language}>
            <Text style={styles.languageText}>{list.item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.countDetails}>
        <StatisticItem name="Stars" count={list.item.stargazersCount} />
        <StatisticItem name="Forks" count={list.item.forksCount} />
        <StatisticItem name="Rating" count={list.item.ratingAverage} />
        <StatisticItem name="Reviews" count={list.item.reviewCount} />
      </View>    
    </View>
  );
};

export default RepositoryListItem;