import * as userRepository from "../repository/user.repository.js";
import { userNotExist } from "../user.errors.js";
import fs from 'node:fs';

export const uploadProfilePic = async (userId, file) => {
    if (!file) throw new Error("No file uploaded");
    const user = await userRepository.findUserById(userId);
    if (!user) throw userNotExist;

    if (user.profilePicPath && fs.existsSync(user.profilePicPath)) {
        fs.unlinkSync(user.profilePicPath);
    }

    await userRepository.updateUserByEmail(user.email, { 
        profilePicPath: file.path 
    });
}



export const uploadCv = async (userId, file) => {
  if (!file) throw new AppError("No file uploaded", 400);
  
  const user = await userRepository.findUserById(userId);
  if (!user) throw new AppError("User not found", 404);

  if (user.cvPath && fs.existsSync(user.cvPath)) {
    fs.unlinkSync(user.cvPath);
  }

  await userRepository.updateUserByEmail(user.email, {
    cvPath: file.path
  });

  return userRepository.findUserById(userId);
};



export const uploadCoverImages = async (userId, files) => {
  if (!files) throw new AppError("No files uploaded", 400);

  const user = await userRepository.findUserById(userId);
  if (!user) throw new AppError("User not found", 404);

  if (user.coverImagePaths && user.coverImagePaths.length > 0) {
    user.coverImagePaths.forEach((path) => {
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
    });
  }

  await userRepository.updateUserByEmail(user.email, {
    coverImagePaths: files.map(f => f.path)
  });

  return userRepository.findUserById(userId);
};