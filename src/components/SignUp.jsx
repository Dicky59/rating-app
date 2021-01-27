import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import useCreateUser from '../hooks/useCreateUser';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundColor,
    padding: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    margin: 15,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderWidth: 4,
    borderRadius: theme.roundness,
    paddingVertical: 10,
  },
  formController: {
    padding: 15,
    margin: 15,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required('Username is required'),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Password do not match')
});

export const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.formController}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={styles.formController}
        secureTextEntry
        name="password"
        placeholder="Password"
      />
      <FormikTextInput
        style={styles.formController}
        secureTextEntry
        name="passwordConfirmation"
        placeholder="Password confirmation"
      />
      <TouchableOpacity onPress={onSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const [createUser] = useCreateUser();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ username, password });
      await signIn({ username, password });
      history.push("/");

    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;