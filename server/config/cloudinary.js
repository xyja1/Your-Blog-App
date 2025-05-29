import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Funksioni për ngarkim të fotove
export const uploadOnCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "blog_images",
    });
    return result;
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    return null;
  }
};

// ✅ Funksioni për fshirje të fotove
export const deleteOnCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    console.error("❌ Failed to delete from Cloudinary:", error);
    throw error;
  }
};
