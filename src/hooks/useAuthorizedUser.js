import { useQuery } from "@apollo/react-hooks";
import { AUTHORIZED_USER } from "../graphql/queries";

const useAuthorizedUser = (variables) => {
  const includeReviews = variables && variables.includeReviews;
  const { data } = useQuery(AUTHORIZED_USER,
    { variables: { includeReviews }});

  return data ? data.authorizedUser : undefined;
};

export default useAuthorizedUser;