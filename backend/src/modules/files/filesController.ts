import File from "./fileModel";
import fs = require("fs");
import { ObjectId } from 'mongodb';
import mongoose = require("mongoose");
import { Request, Response } from "express";


export const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    // Read the file from the file system
    const fileBuffer = fs.readFileSync(file.path);

    // Delete the temporary file from the file system
    fs.unlinkSync(file.path);

    // Save the file buffer to MongoDB
    const fileId = new ObjectId();
    const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    const uploadStream = gridFSBucket.openUploadStreamWithId(fileId, file.originalname);
    uploadStream.end(fileBuffer);

    // Handle the completion of the upload stream
    uploadStream.on('finish', async () => {
      const fileToSave = new File({
        _id: fileId,
        filename: file.originalname,
      })
      await fileToSave.save();
      res.status(201).json({ message: 'success', file: fileToSave });
    });

    uploadStream.on('error', (error) => {
      console.error(error);
      res.status(500).json({ message: 'Error uploading file' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFiles = async (req: any, res: any) => {
  try {
    // const files = await File.find({ uploadedBy: req.user._id });
    const files = await File.find();
    res.status(200).json({ files: files });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFile = async (req, res) => {
  try {
    const fileId = new ObjectId(req.params.id);
    const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    const downloadStream = gridFSBucket.openDownloadStream(fileId);
    const chunks = [];

    downloadStream.on('data', (chunk) => {
      // @ts-ignore
      chunks.push(chunk);
    });

    downloadStream.on('end', () => {
      const fileData = Buffer.concat(chunks);

      res.status(200).json({
        file: {
          _id: fileId,
          data: fileData.toString('base64'),
        },
      });
    });

    downloadStream.on('error', (error) => {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving file' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleteFile = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: 'Bad request' });
    }

    // Delete the file from the MongoDB collection
    const deletedFile = await File.findByIdAndDelete(id);

    if (!deletedFile) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Delete the file from the GridFS store
    const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    await gridFSBucket.delete(deletedFile._id).then(() => {
      res.status(200).json({ success: true, message: 'success' });
    }).catch(err => {
      res.status(500).json({ message: 'Error deleting file' });
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
