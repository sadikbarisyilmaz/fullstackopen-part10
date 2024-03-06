import { StyleSheet } from "react-native";
import Text from "../Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 7,
    color: "white",
    alignSelf: "flex-start",
  },
});

const Badge = ({ children }) => {
  return <Text style={styles.content}>{children}</Text>;
};

export default Badge;
