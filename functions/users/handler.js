const mongoose = require("mongoose");
const { dbConnect } = require("../../config/connection");
const { userModel } = require("../../models/userModel.js");
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: 'AKIA6GEITEFVIYVY2R4I',
  secretAccessKey: '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',
});
const parser = require('lambda-multipart-parser');

// AWS.config.update({
  
//   region: 'us-east-1'
// });

module.exports.getUserProfileData = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let response;
  try {
    await dbConnect();
    event.body = JSON.parse(event.body);

    const checkUserData = await userModel.findById(
      new mongoose.Types.ObjectId(event.body.userId)
    );
    console.log(
      "checkUserData :>> ",
      checkUserData && JSON.stringify(checkUserData)
    );
    if (!checkUserData) throw new Error("User doesn't Exists.");

    response = {
      body: JSON.stringify({
        statusCode: 200,
        body: checkUserData,
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

module.exports.updateUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let response;
  try {
    console.log("inside updateUser");
    await dbConnect();

    event.body = JSON.parse(event.body);

    if (!event.body.userId) throw new Error("Please Enter userId");

    const checkUser = await userModel.findById(
      new mongoose.Types.ObjectId(event.body.userId)
    );
    console.log("checkUser :>> ", checkUser && JSON.stringify(checkUser));

    if (!checkUser) throw new Error("User not Exists");

    checkUser.phone = event.body.phone;
    checkUser.email = event.body.email;
    checkUser.Name = event.body.Name;
    checkUser.userName = event.body.userName;
    checkUser.pronouns = event.body.pronouns;
    checkUser.bio = event.body.bio;
    checkUser.gender = event.body.gender;
    checkUser.profilePicture = event.body.profilePicture;

    await checkUser.save();

    response = {
      body: JSON.stringify({
        statusCode: 200,
        message: "User updated Successfully",
        userId: event.body.userId,
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

module.exports.editProfilePicture = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let response;
  try {
    const result = await parser.parse(event);
    console.log("inside editProfilePicture");
    console.log('result :>> ', JSON.stringify(result));
    
    await dbConnect();

    console.log('result.userId :>> ', result.userId);
    if (!result.userId) throw new Error("Please Enter userId");

    const checkUser = await userModel.findById(
      new mongoose.Types.ObjectId(result.userId)
    );
    if (!checkUser) throw new Error("User not Exists");
    console.log("checkUser :>> ", checkUser && JSON.stringify(checkUser));

      const bucketName = 'instapostbucket'; //instapostbucket
      const key = 'profilePicture/profilePic.jpg';
      const body = event.body; 

      const params = {
        Bucket: bucketName,
        Key: key,
        Body: body,
        ACL: 'public-read', // Set the ACL as per your requirements
        ContentType: 'image/svg', // Set the content type according to your image type
    };

    try {
     const uploadImage =  await s3.putObject(params).promise();
     console.log('uploadImage :>> ', uploadImage && JSON.stringify(uploadImage));
      return {
          statusCode: 200,
          body: 'Image uploaded successfully',
      };
  } catch (error) {
      console.error('Error uploading image to S3:', error.message);
      return {
          statusCode: 500,
          body: 'Error uploading image to S3',
      };
  }
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


