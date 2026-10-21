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