require("dotenv").config();

// dados de configuração do s3
module.exports = function S3Config() {
  const s3 = {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_S3_REGION,
    params: {
      ACL: "public-read",
      Bucket: `${process.env.AWS_S3_CALENDAR_BUCKET}`,
    },
  };

  return s3;
}
