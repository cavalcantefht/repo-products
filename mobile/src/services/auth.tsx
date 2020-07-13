import { AsyncStorage } from 'react-native';

export const auth = async () => {
  return (await AsyncStorage.getItem('@appToken') !== null ? true : false);
}

export const getToken = async () => {
  return await AsyncStorage.getItem('@appToken');
}

export const setToken = async (token: String) => {
  await AsyncStorage.setItem('@appToken', String(token));
  return;
}

export const logout = async () => {
  await AsyncStorage.removeItem('@appToken');
}