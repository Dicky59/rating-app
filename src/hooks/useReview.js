import {useMutation} from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';


const useReview = () =>{
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const review = async (variables) => {
    const response = await mutate({variables
      });   

    return response;
  };

  return [review, result];
};

export default useReview;