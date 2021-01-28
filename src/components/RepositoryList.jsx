import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity} from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 5,
  },
  heading: {
    padding: 10,
    backgroundColor: "#e1e4e8",
  },
  dropdown: {
    backgroundColor: "#e1e4e8",
    color: "#e1e4e8",
    borderRadius: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, sortOrder, setSortOrder }) => {
  const history = useHistory();
  const viewSingleRepo = id => {
    history.push(`/repository/${id}`);
  };
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      ListHeaderComponent={
        <RNPickerSelect
          onValueChange={(value) => { setSortOrder(value); }}
          value={sortOrder}
          items={[
            {
              label: "Latest repositories",
              value: "CREATED_AT_DESC",
            },
            {
              label: "Highest rated repositories",
              value: "RATING_AVERAGE_DESC",
            },
            {
              label: "Lowest rated repositores",
              value: "RATING_AVERAGE_ASC",
            },
          ]}
        />
      }
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => 
      <TouchableOpacity activeOpacity={0.5} onPress={() => viewSingleRepo(item.id)}>
          <RepositoryItem repository={item} />
        </TouchableOpacity>
      }
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState("CREATED_AT_DESC");
  const { repositories } = useRepositories(sortOrder);
  return <RepositoryListContainer
    repositories={repositories}
    sortOrder={sortOrder}
    setSortOrder={setSortOrder}
    />;
};

export default RepositoryList;