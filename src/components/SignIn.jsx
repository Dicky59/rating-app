import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import Button from './Button';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput 
          name="username"
          placeholder="Username"
          testID='testUsername' />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
          testID='testPassword'
        />
      </View>
      <Button testID='testButton' onPress={onSubmit}>Sign in</Button>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    
    await signIn({ username, password });
    
    history.push('/');
  };
  return <SignInContainer onSubmit={onSubmit} />;
};

export const SignInContainer = ({ onSubmit }) => {  
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;