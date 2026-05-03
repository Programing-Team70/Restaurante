'use strict';

import cloudinary from "../configs/cloudinary.js";
import streamifier from "streamifier";

export const uploadBuffer = (buffer, folder, format) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "raw", format },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};