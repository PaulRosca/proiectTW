import cos from "../config/ibmCOS.js";

const bucketName = "cloud-object-storage-z2-cos-standard-4gt";

export const uploadFile = (itemName, file) => {
  return cos
    .putObject({
      Bucket: bucketName,
      Key: itemName,
      Body: file,
    })
    .promise();
};

export const getFileStream = (itemName) => {
  return cos
    .getObject({
      Bucket: bucketName,
      Key: itemName,
    })
    .createReadStream();
};
export const deleteFile = (itemName) => {
  return cos
    .deleteObject({
      Bucket: bucketName,
      Key: itemName,
    })
    .promise();
};
