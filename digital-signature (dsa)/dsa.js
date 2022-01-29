const crypto = require('crypto');
const fs = require('fs');

const fileContent = fs.readFileSync('data.txt', 'utf8');
console.log('FileContent:', fileContent);

const { publicKey, privateKey } = crypto.generateKeyPairSync('dsa', {
  modulusLength: 570,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

let signature = crypto.createSign('sha384').update(fileContent).end().sign(privateKey);

fs.writeFileSync('signature.txt', Buffer.from(signature));

const signatureFile = fs.readFileSync('signature.txt');
console.log('SignatureFile:', signatureFile);

const verified = crypto.verify('sha384', Buffer.from(fileContent), publicKey, signatureFile);
console.log('Match:', verified);
