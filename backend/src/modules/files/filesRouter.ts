import express = require("express");
import {
    deleteFile, uploadFile, getFiles, getFile
} from "./filesController";
const router = express.Router();


router.post("/upload", uploadFile);
router.get("/get-files", getFiles);
router.get("/get-file/:id", getFile);
router.delete("/delete-file/:id", deleteFile);

export default router;