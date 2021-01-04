import React from "react";
import { View, StyleSheet } from "react-native";
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
  }
});

const AppBar = () => (
  <View style={styles.container}>
    <Link to='/' component={AppBarTab}>
      Repositories
    </Link>
    <Link to='/signin' component={AppBarTab}>
      Sign in
    </Link>
  </View>
);

export default AppBar;