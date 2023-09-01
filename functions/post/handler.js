const mongoose = require("mongoose");
const { dbConnect } = require("../../config/connection");
const { postModel } = require("../../models/postModel.js");
const { postPictureModel } = require("../../models/postPictureModel.js");
const express = require('express')
const multer = require('multer');
const AWS = require('aws-sdk');
const multipartParser = require('lambda-multipart-parser');
require('dotenv').config()









//It's a studio rap code
  // const trackUpload = async (req, res) => {
  //   try {
  //     const upload = multer({ dest: "uploads/" }).single("trackFile");
  //     upload(req, res, async (err) => {
  //       try {
  //         if (err) {
  //           res.status(400).send("Something went wrong!");
  //         }
  //         let { file, body } = req;
  //         let { filename, originalname } = file;
  //         let { projectId } = body;
  //         if (!projectId) throw new Error("please enter valid project");
  
  //         let projectExist = await projectModel.aggregate([
  //           { $match: { _id: ObjectID(projectId) } },
  //           {
  //             $lookup: {
  //               from: "tracks",
  //               localField: "_id",
  //               foreignField: "projectId",
  //               as: "trackData",
  //             },
  //           },
  //         ]);
  //         if (!projectExist) throw new Error("Project not found");
  
  //         let trackCount = projectExist[0].trackData.length
  //           ? projectExist[0].trackData.length
  //           : null;
  
  //         if (trackCount == 4) {
  //           if (projectExist[0].audioSubPayment.length == 0)
  //             throw new Error("you have to buy audio subscription");
  //         } else if (trackCount == 8) {
  //           if (projectExist[0].audioSubPayment.length > 2)
  //             throw new Error("your payment is not done yet");
  //         } else if (trackCount == 12)
  //           throw new Error("you are not allowed to upload more track");
  
  //         const uploadedFile = await uploadAudioInS3Bucket(filename);
  
  //         fs.unlinkSync(process.cwd() + "/uploads/" + filename, (err) => {
  //           throw new Error(err);
  //         });
  //         const trackName = originalname;
  //         const url = uploadedFile.Location;
  //         const saveTrack = await trackModel.create({
  //           projectId,
  //           trackName,
  //           url,
  //         });
  //         res
  //           .status(200)
  //           .send({ message: "file uploaded successfully", saveTrack });
  //       } catch (error) {
  //         res.status(400).send({ success: false, message: error.message });
  //       }
  //     });
  //   } catch (error) {
  //     res.status(400).send({ success: false, message: error.message });
  //   }
  // };
  