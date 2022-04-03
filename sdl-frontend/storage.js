import * as SecureStore from "expo-secure-store";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    console.log("No stored Token");
    return false;
  }
}

async function deleteItem(key) {
  let result = await SecureStore.deleteItemAsync(key);
  if (result) {
    return result;
  } else {
    console.log("Token Deleted");
  }
}

export { save, getValueFor, deleteItem };
