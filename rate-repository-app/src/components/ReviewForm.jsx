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
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};
const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
    .required("Rating is required"),
  text: yup.string(),
});

export const ReviewForm = ({ onSubmit }) => {
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
            borderColor: formik.errors.ownerName
              ? theme.colors.error
              : theme.colors.textSecondary,
          },
        ]}
        placeholder="Reposiory owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        testID="ownerName"
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.ownerName}
        </Text>
      )}
      <TextInput
        style={[
          styles.container.input,
          {
            borderColor: formik.errors.repositoryName
              ? theme.colors.error
              : theme.colors.textSecondary,
          },
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        testID="repositoryName"
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.repositoryName}
        </Text>
      )}
      <TextInput
        style={[
          styles.container.input,
          {
            borderColor: formik.errors.rating
              ? theme.colors.error
              : theme.colors.textSecondary,
          },
        ]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating.toString()}
        keyboardType="numeric"
        onChangeText={formik.handleChange("rating")}
        testID="rating"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.rating}
        </Text>
      )}
      <TextInput
        style={[
          styles.container.input,
          {
            borderColor: formik.errors.text
              ? theme.colors.error
              : theme.colors.textSecondary,
          },
        ]}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        testID="text"
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.text}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.container.button}>
        <Text style={styles.container.button.text}>Submit</Text>
      </Pressable>
    </View>
  );
};
