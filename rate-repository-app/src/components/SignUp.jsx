import { useNavigate } from "react-router-native";
import { SignUpForm } from "./SignUpForm";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/queries";

const SignUp = () => {
  const navigate = useNavigate();
  const [mutate, result] = useMutation(CREATE_USER);

  const handleSubmit = async (values) => {
    const user = { username: values.username, password: values.password };

    console.log("handle: ", user);
    try {
      const { data } = await mutate({ variables: { user } });
      console.log(data);
      navigate("/signIn");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpForm onSubmit={handleSubmit} />;
};

export default SignUp;
