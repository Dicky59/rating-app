import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Text from './Text';
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: theme.colors.contrastText,
    fontSize: 24,
  },
});

const AppBarTab = ({ children, ...props }) => {
  return (
    <TouchableWithoutFeedback style={styles.tabTouchable} {...props}>
      <View style={styles.tab}>
        <Text style={styles.tabText}>
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;