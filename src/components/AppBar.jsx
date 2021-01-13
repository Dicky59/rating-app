import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import { Link, useHistory } from 'react-router-native';
import Constants from "expo-constants";
import AppBarTab from './AppBarTab';
import theme from "../theme";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { AUTHORIZED_USER } from "../graphql/queries";
import AuthStorageContext from "../contexts/AuthStorageContext";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: 'row',
  },
});

const AppBar = () => {

  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const accessToken = authStorage.getAccessToken();

  let authorizedUser = null;

  if (accessToken) {
    const { data } = useQuery(AUTHORIZED_USER, {
      fetchPolicy: 'cache-and-network'
    });

    if (data) {
      data.authorizedUser !== null ?
        authorizedUser = data.authorizedUser
        :
        authorizedUser = null;
    }
}

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <Link to='/' component={AppBarTab}>Repositories</Link>
        {authorizedUser ?
        <Link to='/' onPress={signOut} component={AppBarTab}>Sign Out</Link>
        :
        <Link to='/signin' component={AppBarTab}>Sign In</Link>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;