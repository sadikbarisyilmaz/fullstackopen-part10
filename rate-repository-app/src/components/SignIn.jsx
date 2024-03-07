import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";
import { AuthStorage } from "../utils/authStorage";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    gap: 10,
    input: {
      borderWidth: 1,
      borderRadius: 3,
      paddingVertical: 4,
      paddingHorizontal: 12,
    },
    button: {
      borderRadius: 3,
      backgroundColor: theme.colors.primary,
      color: "white",
      paddingVertical: 4,
      paddingHorizontal: 6,
      text: {
        color: "white",
        alignSelf: "center",
        paddingVertical: 4,
        paddingHorizontal: 6,
      },
    },
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be more than 3 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be more than 5 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  // console.log(AuthStorage);
  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      const AccessTokenStorage = new AuthStorage("AccessToken");
      await AccessTokenStorage.setAccessToken(data.authenticate.accessToken);

      console.log("get: ", await AccessTokenStorage.getAccessToken());
    } catch (e) {
      console.log(e);
    }
  };

  const Form = ({ onSubmit }) => {
    const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

    return (
      <View style={styles.container}>
        <TextInput
          style={[
            styles.container.input,
            {
              borderColor: formik.errors.username
                ? theme.colors.error
                : theme.colors.textSecondary,
            },
          ]}
          placeholder="Username: matti"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.username}
          </Text>
        )}
        <TextInput
          style={[
            styles.container.input,
            {
              borderColor: formik.errors.password
                ? theme.colors.error
                : theme.colors.textSecondary,
            },
          ]}
          placeholder="Password: password"
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.password}
          </Text>
        )}
        <Pressable
          onPress={formik.handleSubmit}
          style={styles.container.button}
        >
          <Text style={styles.container.button.text}>Sign In</Text>
        </Pressable>
      </View>
    );
  };

  return <Form onSubmit={handleSubmit} />;
};

export default SignIn;
