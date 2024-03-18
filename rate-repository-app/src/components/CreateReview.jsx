import { useNavigate } from "react-router-native";
import { ReviewForm } from "./ReviewForm";
import useAuthStorage from "../hooks/useAuthStorage";
import { useMutation } from "@apollo/client";
import { POST_REVIEW } from "../graphql/queries";

const CreateReview = () => {
  const navigate = useNavigate();
  const [mutate, result] = useMutation(POST_REVIEW);

  const handleSubmit = async (values) => {
    const review = ({ ownerName, repositoryName, rating, text } = values);
    review.rating = Number(rating);
    console.log(review);
    try {
      const { data } = await mutate({ variables: { review } });
      console.log(data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewForm onSubmit={handleSubmit} />;
};

export default CreateReview;
