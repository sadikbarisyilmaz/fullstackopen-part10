import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";

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
const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be more than 5 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be more than 5 characters")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirm is required"),
});

export const SignUpForm = ({ onSubmit }) => {
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
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        testID="username"
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
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        testID="password"
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.password}
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
        placeholder="Confirm Password"
        secureTextEntry
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange("passwordConfirm")}
        testID="passwordConfirm"
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.container.button}>
        <Text style={styles.container.button.text}>Sign Up</Text>
      </Pressable>
    </View>
  );
};
