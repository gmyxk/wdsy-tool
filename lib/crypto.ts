import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_KEY || '0E2C751636A0D3AA');

const iv = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_IV || '1234567812345678');

/**
 * 解密方法
 * @param word
 * @returns
 */
const Decrypt = function (word: string) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

/**
 * 加密方法
 * @param word
 * @returns
 */
const Encrypt = function (word: string) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString().toUpperCase();
};

export { Decrypt, Encrypt };
