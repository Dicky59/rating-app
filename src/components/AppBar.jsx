import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from 'react-router-native';
import Constants from "expo-constants";
import AppBarTab from './AppBarTab';
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    alignItems: "flex-end",
    backgroundColor: theme.appBar.backgroundColor
  },
  tabsContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
});

const AppBar = () => (
  <View style={styles.container}>
    <ScrollView horizontal style={styles.tabsContainer}>
      <Link to='/' component={AppBarTab}>
        Repositories
      </Link>
      <Link to='/signin' component={AppBarTab}>
        Sign in
      </Link>
    </ScrollView>
  </View>
);

export default AppBar;