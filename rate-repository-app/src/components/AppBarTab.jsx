import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
    color: "#FFFFFF",
  },
});

const AppBarTab = ({ children }) => {
  return (
    <Pressable>
      <Text fontSize="subheading" fontWeight="bold" style={styles.header}>
        {children}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
