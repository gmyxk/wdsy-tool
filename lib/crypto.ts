import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('0E2C751636A0D3AA');

const iv = CryptoJS.enc.Utf8.parse('1234567812345678');

/**
 * 解密方法
 * @param word
 * @returns
 */
const Decrypt = function (word: string) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

/**
 * 加密方法
 * @param word
 * @returns
 */
const Encrypt = function (word: string) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString().toUpperCase();
};

export { Decrypt, Encrypt };
