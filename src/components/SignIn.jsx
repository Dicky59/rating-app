import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import theme from "../theme";
import Text from './Text';
import FormikTextInput from "./FormikTextInput";
import { Formik } from 'formik';

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: theme.colors.backgroundColor,
    padding: 10
  },
  textInput: {
    borderColor: theme.appBar.backgroundColor,
    borderWidth: 2,
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading
  },
  button: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 14,
    textAlign: 'center'
  }
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name='username'
        placeholder='Username'
        style={styles.textInput}
      />
      <FormikTextInput
        name='password'
        placeholder='Password'
        secureTextEntry={true}
        style={styles.textInput}
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text
          fontSize='subHeading'
          fontWeight='bold'
          style={styles.button}
        >
          Sign in
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;