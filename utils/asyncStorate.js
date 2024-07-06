import AsyncStorage from '@react-native-async-storage/async-storage';

// Simpan data ke AsyncStorage
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Gagal menyimpan item', error);
  }
};

// Ambil data dari AsyncStorage berdasarkan key
export const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('Gagal mengambil item', error);
    return null; 
  }
};

// Hapus data dari AsyncStorage berdasarkan key
export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Gagal menghapus item', error);
  }
};
