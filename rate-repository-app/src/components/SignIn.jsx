import { useNavigate } from "react-router-native";
import { SignInForm } from "./SignInForm";
import useSignIn from "../hooks/useSignIn";

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate("/");
  const handleSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={handleSubmit} />;
};

export default SignIn;
