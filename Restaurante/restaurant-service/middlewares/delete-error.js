import { cloudinary } from './file-uploader.js';

export const cleanupUploadedFileOnFinish = (req, res, next) => {
    if (req.file) {
        res.on('finish', async () => {
            try {
                if (res.statusCode >= 400) {
                    const publicId = req.file.publicId || req.file.fileName;
                    if (publicId) {
                        await cloudinary.uploader.destroy(publicId);
                        console.log(
                            `Archivo eliminado de cloudinary por respuesta: ${res.statusCode}: ${publicId}`
                        );
                    }
                }
            } catch (error) {
                console.error(
                    `Error en el archivo o error en la respuesta ${error.message}`
                );
            }
        })
    }
    next();
}

export const deleteFileOnError = async (err, req, res, next) => {
    try {
        if (req.file) {
            const publicId = req.file.publicId || req.file.fileName;
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
                console.log(
                    `Archivo eliminado de cloudinary: ${publicId}`
                );
            }
        }
    } catch (error) {
        console.error(`Error al eliminar el archivo: ${error.message}`)
    }
    return next(err);
}