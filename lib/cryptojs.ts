import CryptoJS from "crypto-js";

const key = process.env.SECRET_KEY;

export function ecrypt(data: any) {
  if (key) {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      key
    ).toString();
    return encrypted;
  } else {
    return null;
  }
}

export function decrypt(encryptionString: any) {
  if (key) {
    const byte = CryptoJS.AES.decrypt(encryptionString, key);
    const decrypted = byte.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } else {
    return null;
  }
}
