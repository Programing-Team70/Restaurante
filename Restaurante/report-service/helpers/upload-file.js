'use strict';

import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

export const uploadBuffer = async (buffer, folder, format) => {

    const fileName = `${uuid()}.${format}`;

    const uploadPath = path.join(
        process.cwd(),
        "uploads",
        folder
    );

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = path.join(uploadPath, fileName);

    fs.writeFileSync(filePath, buffer);

    return `http://localhost:${process.env.PORT}/uploads/${folder}/${fileName}`;
};