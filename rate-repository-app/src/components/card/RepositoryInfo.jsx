import { View, StyleSheet, Image, Pressable, FlatList } from "react-native";
import Text from "../Text";
import Badge from "../card/Badge";
import theme from "../../theme";
import * as Linking from "expo-linking";
import { nFormatter } from "../../helpers";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    gap: 20,
    marginBottom: 10,
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

export const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image
          style={styles.info.image}
          source={{
            uri: `${repository.ownerAvatarUrl}`,
          }}
        />
        <View style={styles.info.description}>
          <Text fontSize="subheading" fontWeight="bold">
            {repository.fullName}
          </Text>
          <Text color="textSecondary" fontSize="subheading">
            {repository.description}
          </Text>

          <Badge>{repository.language}</Badge>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stats.container}>
          <Text
            style={{ textAlign: "center" }}
            fontSize="subheading"
            fontWeight="bold"
          >
            {nFormatter(repository.stargazersCount)}
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
            {nFormatter(repository.forksCount)}
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
            {nFormatter(repository.reviewCount)}
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
            {repository.ratingAverage}
          </Text>
          <Text style={{ textAlign: "center" }} color="secondary">
            Rating
          </Text>
        </View>
      </View>
      <Pressable
        onPress={() => Linking.openURL(repository.url)}
        style={styles.linkButton}
      >
        <Text style={styles.linkButton.content}>Open In GitHub</Text>
      </Pressable>
    </View>
  );
};
