import express = require("express");
import multer = require("multer");
const upload = multer({ dest: 'uploads/' });

import {
    deleteFile, uploadFile, getFiles, getFile
} from "./filesController";
const router = express.Router();


router.get("/", getFiles);
router.post("/upload", upload.single('file'), uploadFile);
router.get("/:id", getFile);
router.delete("/:id", deleteFile);

export default router;