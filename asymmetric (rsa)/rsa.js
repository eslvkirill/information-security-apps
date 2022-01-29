const crypto = require('crypto');
const fs = require('fs');
const builder = require('xmlbuilder');
const converter = require('xml-js');
const readline = require('readline-sync');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

const keys = builder.create('root');

keys
  .ele('keys')
  .ele('privateKey')
  .att('algorithm', 'RSA')
  .txt(`\n${privateKey}`)
  .up()
  .ele('publicKey')
  .att('algorithm', 'RSA')
  .txt(`\n${publicKey}`);

const exportPath = readline.question('Wrtite the export path of the file: '); // example: keys.xml

fs.writeFileSync(exportPath, keys.toString({ pretty: true }));

const importPath = readline.question('Wrtite the import path of the file: '); // example: keys.xml

const xmlFile = fs.readFileSync(importPath, 'utf8');

const json = JSON.parse(converter.xml2json(xmlFile, { compact: true }));

const importPrivateKey = json.root.keys.privateKey._text;
const importPublicKey = json.root.keys.publicKey._text;

const fileContent = fs.readFileSync('data.txt', 'utf8');

const encryptedData = crypto.publicEncrypt(
  {
    key: importPublicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256',
  },
  Buffer.from(fileContent)
);

console.log('Encypted data: ', encryptedData.toString('base64'));

const decryptedData = crypto.privateDecrypt(
  {
    key: importPrivateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256',
  },
  encryptedData
);

console.log('FileContent:', fileContent);
console.log('Decrypted data:', decryptedData.toString());
console.log('Match:', fileContent === decryptedData.toString());
