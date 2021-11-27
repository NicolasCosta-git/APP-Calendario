require("dotenv").config();
const AWS = require("aws-sdk");
const s3Config = require('./s3Config')

 module.exports = async function uploadS3(file) {
  const S3 = new AWS.S3(s3Config());
  const { mimetype: type, filename: name } = file;
  // envia o arquivo pro s3
  const uploadedFile = await S3.upload({
    Body: file,
    Key: `${filename}`,
    ContentType: mimetype,
  }).promise();

  return uploadedFile.Location;
};

