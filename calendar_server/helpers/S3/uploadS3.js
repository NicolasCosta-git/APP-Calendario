require("dotenv").config();
const AWS = require("aws-sdk");
const s3Config = require("./s3Config");
const multer = require("multer");
const multerS3 = require("multer-s3");

module.exports = async function uploadS3(file) {
  const S3 = new AWS.S3(s3Config());
  const { mimetype, name } = file;
  // envia o arquivo pro s3
  const uploadedFile = await S3.upload({
    Body: file.data,
    Key: Date.now() + name,
    ContentType: mimetype,
  }).promise();

  return uploadedFile.Location;
};
