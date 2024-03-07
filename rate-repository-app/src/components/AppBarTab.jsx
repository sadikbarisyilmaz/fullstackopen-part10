import { StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
    color: "#FFFFFF",
    paddingHorizontal: 10,
  },
});

const AppBarTab = ({ children }) => {
  return (
    <Text fontSize="subheading" fontWeight="bold" style={styles.header}>
      {children}
    </Text>
  );
};

export default AppBarTab;
