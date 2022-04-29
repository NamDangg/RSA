const crypto = require("crypto");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  // The standard secure default length for RSA keys is 1024 bits
  modulusLength: 1024,
});

// This is the data we want to encrypt
const data = "my secret data";

const encryptedData = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  //convert the data string to a buffer
  Buffer.from(data)
);

// The encrypted data is in the form of bytes, so we print it in base64 format
console.log("encypted data: ", encryptedData.toString("base64"));
//encypted data:  gmO/8/xfg2eNFySJeQ7U7Ivocb2qzQcKXSr9VNzkaj0Mr9H1IvVUwlwDq/Us2KSrkhIccOIp9F/8SfUAS8IUtO3gx+9oPBHQ6RG5rdHFBSs9PTtI4GTShuWywbXajps1cDe2AWHK5vprzMqDJCQKYpst9D6ZJnHwqDzy+8VZ+d8=

// Create some sample data that we want to sign
const verifiableData = "this need to be verified";

//Decryption 
const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedData
  );
  console.log("decrypted data: ", decryptedData.toString());

//Sign
const signature = crypto.sign("sha256", Buffer.from(verifiableData), {
  key: privateKey,
  padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
});

console.log(signature.toString("base64"));

//Verify
const isVerified = crypto.verify(
  "sha256",
  Buffer.from(verifiableData),
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
  },
  signature
);

//Verifying public key
console.log("signature verified: ", isVerified);