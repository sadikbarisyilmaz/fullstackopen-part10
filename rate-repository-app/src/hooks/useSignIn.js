import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
    const apolloClient = useApolloClient();

    const [mutate, result] = useMutation(SIGN_IN);
    const authStorage = useAuthStorage();

    const signIn = async ({ username, password }) => {
        const credentials = { username, password }
        const { data } = await mutate({ variables: { credentials } })
        console.log(data.authenticate.accessToken);
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
        // console.log("get: ", await authStorage.getAccessToken());

        return data
    };
    // console.log("Result: ", result);

    return [signIn];

};

export default useSignIn;