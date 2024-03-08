import { View, StyleSheet, Image, Pressable } from "react-native";
import { nFormatter } from "../../helpers";
import Text from "../Text";
import Badge from "./Badge";
import { Link } from "react-router-native";

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
});

const RepoCard = ({ item }) => {
  return (
    <Pressable>
      <Link to={`/${item.id}`}>
        <View testID="repositoryItem" style={styles.container}>
          <View style={styles.info}>
            <Image
              style={styles.info.image}
              source={{
                uri: `${item.ownerAvatarUrl}`,
              }}
            />
            <View style={styles.info.description}>
              <Text fontSize="subheading" fontWeight="bold">
                {item.fullName}
              </Text>
              <Text color="textSecondary" fontSize="subheading">
                {item.description}
              </Text>
              <Badge>{item.language}</Badge>
            </View>
          </View>
          <View style={styles.stats}>
            <View style={styles.stats.container}>
              <Text
                style={{ textAlign: "center" }}
                fontSize="subheading"
                fontWeight="bold"
              >
                {nFormatter(item.stargazersCount)}
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
                {nFormatter(item.forksCount)}
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
                {nFormatter(item.reviewCount)}
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
                {item.ratingAverage}
              </Text>
              <Text style={{ textAlign: "center" }} color="secondary">
                Rating
              </Text>
            </View>
          </View>
        </View>
      </Link>
    </Pressable>
  );
};

export default RepoCard;
