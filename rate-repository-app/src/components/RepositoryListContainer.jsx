import { FlatList, View, StyleSheet } from "react-native";
import RepoCard from "./card/RepoCard";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index }) => <RepoCard item={item} key={index} />}
    />
  );
};

export default RepositoryListContainer;
