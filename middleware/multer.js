import multer from "multer";

const Upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 500 * 1024 * 1024, // limit file size to 5MB
    },
  });

export default Upload;