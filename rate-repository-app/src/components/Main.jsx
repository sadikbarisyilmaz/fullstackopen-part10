import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";

const styles = StyleSheet.create({
  container: {
    // marginVertical: Constants.statusBarHeight,
    // marginHorizontal: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <>
      <AppBar />
      <View style={styles.container}>
        <RepositoryList />
      </View>
    </>
  );
};

export default Main;
