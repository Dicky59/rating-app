import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { SIGN_IN } from '../graphql/mutations';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import {useHistory} from 'react-router-native';

const useSignIn = () => {
  const history = useHistory();
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    try {
      const {data} = await mutate({
        variables: { username: username, password: password },
      });
      await authStorage.setAccessToken(data.authorize.accessToken);  
      apolloClient.resetStore();
      history.push('/');
    } catch (error) {
      console.log(error);
    }

  };

  return [signIn, result];
};

export default useSignIn;