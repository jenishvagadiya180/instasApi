const mongoose = require("mongoose");
const { dbConnect } = require("../../config/connection");
const { userModel } = require("../../models/userModel.js");
const iconv = require('iconv-lite');

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
    console.log("inside editProfilePicture");
    await dbConnect();

    event.body = JSON.parse(event.body);

    if (!event.body.userId) throw new Error("Please Enter userId");

    const checkUser = await userModel.findById(
      new mongoose.Types.ObjectId(event.body.userId)
    );
    console.log("checkUser :>> ", checkUser && JSON.stringify(checkUser));

    if (!checkUser) throw new Error("User not Exists");

   console.log('checkUser :>> ', checkUser);

    response = {
      body: JSON.stringify({
        statusCode: 200,
        message: "User updated Successfully",
        // userId: event.body.userId,
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


