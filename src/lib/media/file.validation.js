import { fileTypeFromBuffer } from "file-type";
import fs from "node:fs";
import { AppError } from "../error/error.js";

export const allowedFields = {
    images: ['image/png', 'image/jpeg'],
    files:  ['application/pdf', 'application/msword'],
    videos: ['video/mp4'],
    audios: ['audio/mp3'],
}


export const fileValidation = (allowedTypes = allowedFields.images) => 
async (req, res, next) => {
  try {
    const files = req.files?.length ? req.files : req.file ? [req.file] : [];
    if (!files.length) return next();

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024){
        throw new AppError('exceeded size allowed', 400)
      }
      const filePath = file.path;
      const buffer = fs.readFileSync(filePath);
      const type = await fileTypeFromBuffer(buffer);
      if (!type || !allowedTypes.includes(type.mime)) {
        fs.unlinkSync(filePath)
        return next(new AppError("Invalid file type", 400));
      }
    }
    return next();
  } catch (error) {
    return next(error);
  }
}