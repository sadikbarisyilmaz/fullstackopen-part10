import { View, StyleSheet } from "react-native";
import Text from "../Text";
import theme from "../../theme";
import { format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    gap: 20,
  },
  info: {
    flexDirection: "row",
    gap: 20,
    rating: {
      flex: 1,
      justifyContent: "center",
      aspectRatio: 1 / 1,
      maxWidth: 50,
      maxHeight: 50,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      color: theme.colors.primary,
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

const ReviewCard = ({ item }) => {
  const formattedDate = format(new Date(item.createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.info.rating}>
          <Text
            style={{
              alignSelf: "center",
              color: theme.colors.primary,
              fontWeight: "bold",
            }}
          >
            {item.rating}
          </Text>
        </View>
        <View style={styles.info.description}>
          <Text fontSize="subheading" fontWeight="bold">
            {item.user.username}
          </Text>
          <Text color="textSecondary" fontSize="subheading">
            {formattedDate}
          </Text>
          <Text>{item.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;
