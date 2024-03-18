import { FlatList, View, StyleSheet } from "react-native";

import MyReviewCard from "./card/MyReviewCard";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewsContainer = ({ reviews, refetch }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index }) => (
        <MyReviewCard refetch={refetch} item={item} key={index} />
      )}
    />
  );
};

export default MyReviewsContainer;
