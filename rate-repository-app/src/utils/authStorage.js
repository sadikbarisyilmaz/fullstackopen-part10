import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        const accessToken = await AsyncStorage.getItem(
            `${this.namespace}:token`,
        );

        return accessToken ? accessToken : "";
    }

    async setAccessToken(accessToken) {

        await AsyncStorage.setItem(
            `${this.namespace}:token`,
            accessToken,
        );
    }

    async removeAccessToken() {
        await AsyncStorage.removeItem(`${this.namespace}:token`);
    }
}
