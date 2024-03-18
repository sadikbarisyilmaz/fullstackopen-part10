import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link, useNavigate } from "react-router-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import { AuthStorage } from "../utils/authStorage";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.dark,
  },
  content: {
    paddingHorizontal: 10,
  },
});

const AppBar = () => {
  const { data, error, loading } = useQuery(ME);
  const navigate = useNavigate();
  const authStorage = new AuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
    console.log("signout");
  };

  if (!data) {
    return (
      <View style={styles.container}>
        <ScrollView horizontal style={styles.content}>
          <Pressable>
            <Link to="/">
              <AppBarTab>Repositories</AppBarTab>
            </Link>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  console.log(data);
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.content}>
        <Pressable>
          <Link to="/">
            <AppBarTab>Repositories</AppBarTab>
          </Link>
        </Pressable>
        {!data.me ? (
          <>
            <Pressable>
              <Link to="/signIn">
                <AppBarTab>Sign In</AppBarTab>
              </Link>
            </Pressable>
            <Pressable>
              <Link to="/signUp">
                <AppBarTab>Sign Up</AppBarTab>
              </Link>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable>
              <Link to="/createReview">
                <AppBarTab>Create a Review</AppBarTab>
              </Link>
            </Pressable>
            <Pressable>
              <Link to="/myReviews">
                <AppBarTab>My Reviews</AppBarTab>
              </Link>
            </Pressable>
            <Pressable onPress={signOut}>
              <AppBarTab>Sign Out</AppBarTab>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
