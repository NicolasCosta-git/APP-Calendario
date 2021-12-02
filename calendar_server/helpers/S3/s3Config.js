require("dotenv").config();

// dados de configuração do s3
module.exports = function S3Config() {
  const s3 = {
    credentials: {
      accessKeyId: "AKIAQEKWHTOTEUT6V2M2",
      secretAccessKey: "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",
    },
    region: "us-east-1",
    params: {
      Bucket: 'calendar-images/uploads',
    },
  };

  return s3;
}
