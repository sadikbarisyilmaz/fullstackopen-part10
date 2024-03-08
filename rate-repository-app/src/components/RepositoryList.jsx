import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import Text from "./Text";
import RepositoryListContainer from "./RepositoryListContainer";

const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return (
      <Text style={{ alignSelf: "center", paddingVertical: 100 }}>
        Loading...
      </Text>
    );
  }

  return <RepositoryListContainer repositories={data.repositories} />;
};

export default RepositoryList;
