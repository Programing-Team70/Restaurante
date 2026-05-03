import { cloudinary } from './file-uploader.js';

export const cleanupUploadedFileOnFinish = (req, res, next) => {
    res.on('finish', async () => {
        try {
            if (res.statusCode >= 400 && (req.file || req.files)) {
                const filesToDelete = req.files ? req.files : [req.file].filter(Boolean);
                for (const file of filesToDelete) {
                    const publicId = file.filename || file.public_id;
                    
                    if (publicId) {
                        await cloudinary.uploader.destroy(publicId);
                        console.log(`[Limpieza] Archivo eliminado a causa del error: ${res.statusCode}: ${publicId}`);
                    }
                }
            }
        } catch (error) {
            console.error(`[Limpieza] No se pudo limpiar Cloudinary: ${error.message}`);
        }
    });
    next();
};

export const deleteFileOnError = async (err, req, res, next) => {
    try {
        if (req.file || req.files) {
            const filesToDelete = req.files ? req.files : [req.file].filter(Boolean);

            for (const file of filesToDelete) {
                const publicId = file.filename || file.public_id;
                if (publicId) {
                    await cloudinary.uploader.destroy(publicId);
                    console.log(`[Limpieza] Archivo eliminado correctamente: ${publicId}`);
                }
            }
        }
    } catch (cleanupError) {
        console.error(`[Limpieza] Archivo no se pudo eliminar correctamente: ${cleanupError.message}`);
    }
    next(err);
};