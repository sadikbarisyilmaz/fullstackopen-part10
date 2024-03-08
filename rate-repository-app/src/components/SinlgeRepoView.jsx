import { View, StyleSheet, Image, Pressable } from "react-native";
import Text from "./Text";
import Badge from "./card/Badge";
import theme from "../theme";
import * as Linking from "expo-linking";
import { GET_REPOSITORY } from "../graphql/queries";
import { nFormatter } from "../helpers";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";

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
      paddingVertical: 6,
      color: "white",
      alignSelf: "center",
    },
  },
});

const SinlgeRepoView = () => {
  let { id } = useParams();
  console.log(id);

  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
  });

  if (loading) {
    return <Text>loading...</Text>;
  }

  console.log(data.repository.language);
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.info}>
        <Image
          style={styles.info.image}
          source={{
            uri: `${data.repository.ownerAvatarUrl}`,
          }}
        />
        <View style={styles.info.description}>
          <Text fontSize="subheading" fontWeight="bold">
            {data.repository.fullName}
          </Text>
          <Text color="textSecondary" fontSize="subheading">
            {data.repository.description}
          </Text>

          <Badge>{data.repository.language}</Badge>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stats.container}>
          <Text
            style={{ textAlign: "center" }}
            fontSize="subheading"
            fontWeight="bold"
          >
            {nFormatter(data.repository.stargazersCount)}
          </Text>
          <Text style={{ textAlign: "center" }} color="secondary">
            Stars
          </Text>
        </View>
        <View style={styles.stats.container}>
          <Text
            style={{ textAlign: "center" }}
            fontSize="subheading"
            fontWeight="bold"
          >
            {nFormatter(data.repository.forksCount)}
          </Text>
          <Text style={{ textAlign: "center" }} color="secondary">
            Forks
          </Text>
        </View>
        <View style={styles.stats.container}>
          <Text
            style={{ textAlign: "center" }}
            fontSize="subheading"
            fontWeight="bold"
          >
            {nFormatter(data.repository.reviewCount)}
          </Text>
          <Text style={{ textAlign: "center" }} color="secondary">
            Reviews
          </Text>
        </View>
        <View style={styles.stats.container}>
          <Text
            style={{ textAlign: "center" }}
            fontSize="subheading"
            fontWeight="bold"
          >
            {data.repository.ratingAverage}
          </Text>
          <Text style={{ textAlign: "center" }} color="secondary">
            Rating
          </Text>
        </View>
      </View>
      <Pressable
        onPress={() => Linking.openURL(data.repository.url)}
        style={styles.linkButton}
      >
        <Text style={styles.linkButton.content}>Open In Github</Text>
      </Pressable>
    </View>
  );
};

export default SinlgeRepoView;
