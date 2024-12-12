import multer from "multer";
import path from "path"; // Import path module for resolving paths

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Use path.join to resolve the correct path
        const tempDir = path.join(process.cwd(), "public", "temp"); // Ensure the directory exists
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`); 
    }
});

export const upload = multer({ storage });
