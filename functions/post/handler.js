const mongoose = require("mongoose");
const { dbConnect } = require("../../config/connection");
const { postModel } = require("../../models/postModel.js");
const { postPictureModel } = require("../../models/postPictureModel.js");
const express = require('express')
const multer = require('multer');
const AWS = require('aws-sdk');
require('dotenv').config()

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey:  process.env.AWS_SECRET_KEY,
    region: 'US East (N. Virginia) us-east-1'
  });

module.exports.createPost = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let response;
  try {
    console.log("inside createPost")
    await dbConnect();
    event.body = JSON.parse(event.body);

    console.log('event.file :>> ',event.file && JSON.stringify(event.file));        

        const s3 = new AWS.S3();
        const upload = multer();


    // const params = {
    //     Bucket: 'your-bucket-name',
    //     Key: req.file.originalname, // Use the original filename
    //     Body: req.file.buffer // Use the file buffer from multer
    //   };

    //   s3.upload(params, (err, data) => {
    //     if (err) {
    //       console.error('Error uploading to S3:', err);
    //       return res.status(500).json({ message: 'Upload failed' });
    //     }
    //     console.log('Image uploaded to S3:', data.Location);
    //     return res.status(200).json({ message: 'Upload successful', imageUrl: data.Location });
    //   });
   

    response = {
      body: JSON.stringify({
        statusCode: 200,
        message: "",
      }),
    };
  } catch (error) {
    console.log("error.message :>> ", error.message);
    response = {
      body: JSON.stringify({
        statusCode: 400,
        message: error.message,
      }),
    };
  }
  return response;
};

module.exports.createUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let response;
  try {
    console.log("inside CreateUser");
    await dbConnect();
    event.body = JSON.parse(event.body);
    console.log("event.body :>> ", JSON.stringify(event.body));
    console.log("event.body.phone :>> ", event.body.phone);
    console.log("event.body.email :>> ", event.body.email);
    if (
      !event.body.email ||
      !event.body.phone ||
      !event.body.Name ||
      !event.body.userName ||
      !event.body.gender
    )
      throw new Error("Please Enter valid data");

    let matchEmail = await userModel.findOne({ email: event.body.email });
    console.log("matchEmail :>> ", JSON.stringify(matchEmail));
    if (matchEmail) throw new Error("User Already Exists");

    const user = new userModel({
      phone: event.body.phone,
      email: event.body.email,
      Name: event.body.Name,
      userName: event.body.userName,
      pronouns: event.body.pronouns,
      bio: event.body.bio,
      gender: event.body.gender,
      profilePicture: event.body.profilePicture,
    });

   await user.save();

    response = {
      body: JSON.stringify({
        statusCode: 200,
        message: "User Created Successfully",
      }),
    };
  } catch (error) {
    console.log("error.message :>> ", error.message);
    response = {
      body: JSON.stringify({
        statusCode: 400,
        message: error.message,
      }),
    };
  }
  return response;
};

const s3Upload = async (body, fileName) => {
    try {
      console.log(`s3BucketConsole000::::>>>`);
  
      const s3 = new AWS.S3({
        accessKeyId,
        secretAccessKey,
      });
  
      const buffer = body.files[0].content;
  
      const fileMime = { mime: body.files[0].contentType };
      if (fileMime == null) {
        return context.fail('The string suppliede is not a file type');
      }
      fileName = fileName.replace(/[^A-Z0-9]+/gi, '_');
  
      const params = {
        Bucket: s3Buckename,
        Key: `${fileName}`,
        Body: buffer,
        ACL: 'public-read',
        ContentType: fileMime.mime,
      };
  
      const data = await s3.putObject(params).promise();
      if (!data) throw new Error('Something went wrong while uploading image');
      console.log(`s3BucketConsole::::>>>`, JSON.stringify(data));
      console.log(`s3BucketConsoleURL::::>>>`, JSON.stringify(data.Location));
      return fileName;
    } catch (error) {
      return { statusCode: 400, message: error.message };
    }
  };

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
  