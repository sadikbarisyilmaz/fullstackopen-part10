import { View, StyleSheet, Pressable, Linking, Alert } from "react-native";
import Text from "../Text";
import theme from "../../theme";
import { format } from "date-fns";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../../graphql/queries";

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
  buttonsContainer: {
    flex: 2,
    flexDirection: "row",
    gap: 2,
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
  },
  linkButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    width: "48%",
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    borderRadius: 3,
    width: "48%",
  },
  buttonContent: {
    paddingVertical: 8,
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
  },
});

const MyReviewCard = ({ item, refetch }) => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const handleDelete = async (values) => {
    const deleteReviewId = ({ id } = values);
    console.log(deleteReviewId);

    try {
      const { data } = await mutate({ variables: { deleteReviewId } });
      console.log(data);
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const createAlert = (id) =>
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => handleDelete(id) },
      ]
    );

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
            {item.repository.name}/{item.repository.ownerName}
          </Text>
          <Text color="textSecondary" fontSize="subheading">
            {formattedDate}
          </Text>
          <Text>{item.text}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={() => Linking.openURL(item.repository.url)}
          style={styles.linkButton}
        >
          <Text style={styles.buttonContent}>Open in GitHub</Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={() => createAlert(item.id)}
        >
          <Text style={styles.buttonContent}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MyReviewCard;
