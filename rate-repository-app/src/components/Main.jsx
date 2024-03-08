import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate, useParams } from "react-router-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SinlgeRepoView from "./SinlgeRepoView";

const styles = StyleSheet.create({
  container: {
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
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path=":id" element={<SinlgeRepoView />} />
        </Routes>
        {/* <RepositoryList /> */}
      </View>
    </>
  );
};

export default Main;
