import __dirname from "./index.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isImage = file.mimetype.startsWith('image/');
        const folder = isImage ? 'pets' : 'documents';

        const folderPath = path.join(__dirname, `../public/${folder}`);

        fs.mkdirSync(folderPath, { recursive: true });

        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploader = multer({ storage })

export default uploader;