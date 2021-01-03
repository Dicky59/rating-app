import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import Constants from "expo-constants";
import AppBar from './AppBar';
import theme from '../theme';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.white
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar title="Repositories" />
      <RepositoryList />
    </View>
  );
};

export default Main;