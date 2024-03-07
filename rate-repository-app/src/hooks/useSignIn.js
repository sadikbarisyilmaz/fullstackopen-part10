import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/queries';

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);

    const signIn = async ({ username, password }) => {
        const credentials = { username, password }

        const data = await mutate({ variables: { credentials } })
        return data
    };
    // console.log("Result: ", result);

    return [signIn];

};

export default useSignIn;