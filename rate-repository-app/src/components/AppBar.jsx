import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    // paddingHorizontal: Constants.statusBarHeight,
    backgroundColor: theme.colors.dark,
  },
  content: {
    paddingHorizontal: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.content}>
        <Pressable>
          <Link to="/">
            <AppBarTab>Repositories</AppBarTab>
          </Link>
        </Pressable>
        <Pressable>
          <Link to="/signIn">
            <AppBarTab>Sign In</AppBarTab>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;
