import AsyncStorage from '@react-native-community/async-storage';

/**
 * Store, retrieve and delete data via async storage
 * @param namespace
 * @param data - undefined|null|any
 */
export const store = async (namespace: string, data?: any) => {
  // Get item if no data passed
  if (data === undefined) {
    const getData = await AsyncStorage.getItem(namespace);
    return getData && JSON.parse(getData);
  }

  // Remove item if null
  if (data === null) {
    return AsyncStorage.removeItem(namespace);
  }

  // Othwerwise set item
  return AsyncStorage.setItem(namespace, JSON.stringify(data));
};
