import { View, StyleSheet, FlatList } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { GET_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import ReviewCard from "./card/ReviewCard";
import { RepositoryInfo } from "./card/RepositoryInfo";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    gap: 20,
  },
  info: {
    flexDirection: "row",
    gap: 20,
    image: {
      flex: 1,
      aspectRatio: 1 / 1,
      maxWidth: 50,
      borderRadius: 3,
    },
    description: {
      flex: 2,
      gap: 6,
    },
  },
  stats: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    container: {
      gap: 4,
      justifyContent: "center",
    },
  },
  linkButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    content: {
      paddingVertical: 8,
      color: "white",
      alignSelf: "center",
      fontWeight: "bold",
    },
  },
  separator: {
    height: 10,
  },
});

const SinlgeRepoView = () => {
  let { id } = useParams();
  const { data, loading, error, fetchMore, refetch, ...result } = useQuery(
    GET_REPOSITORY,
    {
      fetchPolicy: "cache-and-network",
      variables: { repositoryId: id, first: 2 },
    }
  );

  if (loading) {
    return <Text>loading...</Text>;
  }

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      console.log("cant");
      return;
    }

    console.log("fetch more");
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first: 2,
      },
    });
  };

  const ItemSeparator = () => <View style={styles.separator} />;

  const reviewNodes = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];
  console.log(data);
  return (
    <>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item, index }) => <ReviewCard item={item} key={index} />}
        onEndReachedThreshold={0.5}
        onEndReached={handleFetchMore}
        ListHeaderComponent={() => (
          <RepositoryInfo repository={data.repository} />
        )}
      />
    </>
  );
};

export default SinlgeRepoView;
