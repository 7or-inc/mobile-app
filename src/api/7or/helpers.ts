import * as SecureStore from 'expo-secure-store';

export const setAccessToken = (token: string) => SecureStore.setItemAsync('userToken', token);

export const getAccessToken = () => SecureStore.getItemAsync('userToken');

export const removeAccessToken = () => SecureStore.deleteItemAsync('userToken');
