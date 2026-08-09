"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = uploadFile;
exports.deleteFile = deleteFile;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
async function uploadFile(filePath, folder) {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
        console.warn('Cloudinary not configured');
        return { url: `mock-url/${folder}/file`, publicId: 'mock-id' };
    }
    try {
        const result = await cloudinary_1.v2.uploader.upload(filePath, {
            folder: `invoice-app/${folder}`,
            resource_type: 'auto',
        });
        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    }
    catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}
async function deleteFile(publicId) {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
        return { success: true };
    }
    try {
        const result = await cloudinary_1.v2.uploader.destroy(publicId);
        return result;
    }
    catch (error) {
        console.error('Delete error:', error);
        throw error;
    }
}
//# sourceMappingURL=cloudinary.js.map