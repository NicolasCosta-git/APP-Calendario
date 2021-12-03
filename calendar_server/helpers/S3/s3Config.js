require("dotenv").config();

// dados de configuração do s3
module.exports = function S3Config() {
  const s3 = {
    credentials: {
      accessKeyId: "",
      secretAccessKey: "",
    },
    region: "",
    params: {
      Bucket: '',
    },
  };

  return s3;
}
