import React, { useState } from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  sortPicker: {
    marginVertical: 10,
    marginHorizontal: 15
    
  },
  searchBar: {
    marginHorizontal: 15,
    marginTop: 15
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onEndReach }) => {
  const history = useHistory();
  const viewSingleRepo = id => {
    history.push(`/repository/${id}`);
  };
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.5} onPress={() => viewSingleRepo(item.id)}>
            <RepositoryItem repository={item}/>
          </TouchableOpacity>
        )}
      />
    );
  };

  const RepositoryList = () => {
    const [orderBy, setOrderBy] = useState('CREATED_AT');
    const [orderDirection, setOrderDirection] = useState('DESC');
    const [sortType, setSortType] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchKeyword] = useDebounce(searchText, 500);
    const { repositories, fetchMore } = useRepositories({ first: 3, orderBy, orderDirection, searchKeyword });
  
    const dropDown = (value) => {
      setSortType(value);
      if (value === 'latest') {
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
      } else if (value === 'highest') {
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
      } else if (value === 'lowest') {
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
      }
    };

    const onEndReach = () => {
      fetchMore();
    };
    
    return (
      <>
        <Searchbar
          style={styles.searchBar}
          autoCapitalize='none'
          placeholder='Search'
          onChangeText={(query) => setSearchText(query)}
          value={searchText}
        />
        <Picker
          style={styles.sortPicker}
          selectedValue={sortType}
          onValueChange={(value) => dropDown(value)}
        >
          <Picker.Item label='Latest repositories' value='latest' />
          <Picker.Item label='Highest rated repositories' value='highest' />
          <Picker.Item label='Lowest rated repositories' value='lowest' />
        </Picker>
        <RepositoryListContainer 
        repositories={repositories}
        onEndReach={onEndReach} />
      </>
    );
  };

  export default RepositoryList;