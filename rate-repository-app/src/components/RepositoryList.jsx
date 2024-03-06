import { FlatList, View, StyleSheet } from "react-native";
import RepoCard from "./card/RepoCard";
import Text from "./Text";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index }) => <RepoCard item={item} key={index} />}
    />
  );
};

export default RepositoryList;
