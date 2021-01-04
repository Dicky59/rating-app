import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Text from './Text';
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  tab: {
    color: theme.colors.contrastText,
    fontSize: 24,
    padding: 15
  },
});

const AppBarTab = props => {
  return (
    <TouchableWithoutFeedback style={styles.container} {...props}>
      <Text style={styles.tab}>
        {props.children}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;