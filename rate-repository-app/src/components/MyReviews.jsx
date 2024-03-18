import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import Text from "./Text";
import MyReviewsContainer from "./MyReviewsContainer";

const MyReviews = () => {
  const { data, error, loading, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return (
      <Text style={{ alignSelf: "center", paddingVertical: 100 }}>
        Loading...
      </Text>
    );
  }

  if (!data) {
  }

  return <MyReviewsContainer refetch={refetch} reviews={data.me.reviews} />;
};

export default MyReviews;
