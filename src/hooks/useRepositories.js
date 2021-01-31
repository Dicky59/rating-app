import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = variables => {
  
  const { data, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: variables
});

  return { repositories: data ? data.repositories : undefined, ...result };
};

export default useRepositories;