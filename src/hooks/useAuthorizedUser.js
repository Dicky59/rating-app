import { useQuery } from "@apollo/react-hooks";
import { AUTHORIZED_USER } from "../graphql/queries";

const useAuthorizedUser = (variables) => {
  const includeReviews = variables && variables.includeReviews;
  const { data, refetch } = useQuery(AUTHORIZED_USER,
    { variables: { includeReviews },
      fetchPolicy: "cache-and-network",
    });

  return { 
    authorizedUser: data ? data.authorizedUser : undefined,
    refetch,
   };
};

export default useAuthorizedUser;