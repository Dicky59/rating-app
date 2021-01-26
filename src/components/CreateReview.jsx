import React from 'react';
import * as yup from 'yup';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import { useHistory } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useReview from '../hooks/useReview';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundColor,
    padding: 15,
  },
  formController: {
    padding: 15,
    margin: 15,
    borderRadius: 4,
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
  buttonText: {
    color: 'white',
    fontSize: 18
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
    rating: yup
    .number()
    .required('rating is required')
    .positive()
    .integer()
    .max(100),
  text: yup
    .string()
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.formController}
        name="ownerName"
        placeholder="Repository owner name"
      />
      <FormikTextInput
        style={styles.formController}
        name="repositoryName"
        placeholder="Repository name"
      />
      <FormikTextInput
        style={styles.formController}
        name="rating"
        placeholder="Rating between 0 and 100"
      />
      <FormikTextInput
        style={styles.formController}
        name="text"
        placeholder="Review"
        multiline
      />
      <TouchableOpacity onPress={onSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Create a review</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text} = values;

    try {
      const data = await createReview({ ownerName, repositoryName, rating: Number(rating), text });
      console.log(data);
      history.push(`/${data.repositoryId}`);
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
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};
export default CreateReview;