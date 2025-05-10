import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MAX_SIZE = 3; // 3MB
const MAX_FILE_SIZE = 1024 * 1024 * MAX_SIZE;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(resquest, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const filmeName = `${fileHash}-${file.originalname}`;

      return callback(null, filmeName);
    }
  })
};

export default {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
  MAX_SIZE,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES
}