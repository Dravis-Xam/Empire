
// Encrypt sensitive data before storage
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_STORAGE_SECRET;

export const secureStorage = {
  set: (key, value) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY);
    localStorage.setItem(key, ciphertext.toString());
  },
  get: (key) => {
    const ciphertext = localStorage.getItem(key);
    if (!ciphertext) return null;
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
};