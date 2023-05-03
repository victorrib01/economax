import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = '@economax_user_data';

export const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(USER_STORAGE_KEY, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export default {
  USER_STORAGE_KEY,
  getData,
  storeData,
};
