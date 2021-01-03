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

const AppBarTab = ({ text, onPress }) => (
    <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
          <Text style={styles.tab}>
              {text}
          </Text>
      </TouchableWithoutFeedback>
  );

export default AppBarTab;