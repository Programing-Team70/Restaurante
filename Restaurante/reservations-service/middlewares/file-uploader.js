import multer from "multer";
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import  { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { allowedNodeEnvironmentFlags } from "process";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const MIMETYPES = [
    'image/jpg',
    'image/png',
    'image/jpeg',
    'image/webp'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const createCloudinaryUploader = (folder) => {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: (req, file) => {
            const fileExt = extname(file.originalname);
            const baseName = file.originalname.replace(fileExt, '');
            const safeBase = baseName
            .toLowerCase()
            .replace(/[^a-z0-9]+/gi, '-')
            .replace(/^-+|-+$/g, '');

            const shortUuid = uuidv4().substring(0,8);
            const publicId = `${safeBase}-${shortUuid}`;

            return {
                folder: folderm,
                publicId: publicId,
                allowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                transformation: [{width: 1000, heigth: 1000, crop: 'limit'}],
                resource_type: 'image'
            }
        }
    });

    return multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (MIMETYPES.includes(file.mimetype)) {
                cb(null, ture);
            } else {
                cb(new Error(`Solo se permiten imagenes: ${MIMETYPES.join('. ')}`));
            }
        },
        limits: {
            fileSize: MAX_FILE_SIZE
        },
    });
};

export const uploadFieldImage = createCloudinaryUploader(
    'kinal_sports_in6av/fields'
);

export const uploadTeamImage = createCloudinaryUploader(
    'kinal_sports_in6av/teams'
);

export { cloudinary };