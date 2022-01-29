const CryptoJS = require('crypto-js');
const { performance } = require('perf_hooks');

const encryptedData = 'Message';

const PASSWORD = 'password';

const ALGORITHM = {
  AES: 'AES',
  DES: 'DES',
  TripleDES: 'TripleDES',
  RC4: 'RC4',
};

const MODE = {
  CBC: CryptoJS.mode.CBC,
  CFB: CryptoJS.mode.CFB,
  OFB: CryptoJS.mode.OFB,
  ECB: CryptoJS.mode.ECB,
};

const crypt = (algorithm, mode) => {
  let time = performance.now();

  const encrypted = CryptoJS[algorithm].encrypt(encryptedData, PASSWORD, mode);
  const decrypted = CryptoJS[algorithm].decrypt(encrypted, PASSWORD, mode);

  time = performance.now() - time;

  console.log(`Time of ${algorithm}:`, time);

  return decrypted;
};

crypt(ALGORITHM.AES, MODE.OFB);
crypt(ALGORITHM.DES, MODE.CBC);
crypt(ALGORITHM.TripleDES, MODE.CBC);
crypt(ALGORITHM.RC4, MODE.CBC);
