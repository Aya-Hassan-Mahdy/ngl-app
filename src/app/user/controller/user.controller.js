import * as userService from "../service/user.service.js";

export const uploadProfilePic = async (req, res, next) => {
    try {
        await userService.uploadProfilePic(req.user.id, req.file);
        res.json({message: "upload profile successfully.", success: true});
    } catch (error) {
        next(error)
    }
}


export const uploadCv = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError("No file uploaded", 400);
    const user = await userService.uploadCv(req.user.id, req.file);
    res.json({ message: "CV uploaded", success: true, user });
  } catch (error) {
    next(error);
  }
};

export const uploadCoverImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) throw new AppError("No files uploaded", 400);
    const user = await userService.uploadCoverImages(req.user.id, req.files);
    res.json({ message: "Cover images uploaded", success: true, user });
  } catch (error) {
    next(error);
  }
};