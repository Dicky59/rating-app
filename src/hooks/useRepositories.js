import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderCriteria) => {

  const createdAtDescObject = {
    orderBy: "CREATED_AT",
    orderDirection: "DESC"
  };

  let variables = null;

  switch (orderCriteria) {
      case "CREATED_AT_DESC":
          variables = createdAtDescObject;
          break;
      case "RATING_AVERAGE_ASC":
          variables = {
              orderBy: "RATING_AVERAGE",
              orderDirection: "ASC"
          };
          break;
      case "RATING_AVERAGE_DESC":
          variables = {
              orderBy: "RATING_AVERAGE",
              orderDirection: "DESC"
          };
          break;

      default:
          variables = createdAtDescObject;
  }

const { data, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: variables
});

  return { repositories: data ? data.repositories : undefined, ...result };
};

export default useRepositories;