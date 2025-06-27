require("dotenv").config();
const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const client = require("../models/client");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../utilities");
const jobs = require("../models/jobs");
const sendEmail = require("../services/mailer");


const EventEmitter = require('events');
const userEvents = new EventEmitter();
userEvents.setMaxListeners(20); // Increase the limit to 20



//Client new user register route
router.post("/signup", async (req, res) => {
  try {
    let { UserName, Email, password } = req.body.client;
    let check = await client.findOne({ email: Email });
    if (check) {
      console.log("Email already use");
      res.json({ error: true, message: "Email already in use" });
    } else {
      let user = new client({
        username: UserName,
        email: Email,
        password: password,
      });
      user
        .save()
        .then(() => {
          console.log("User added successfuly");
          const accessToken = jwt.sign(
            { user },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: 3600,
            }
          );
          return res.json({
            error: false,
            user,
            accessToken,
            message: "Registration Successful",
          });
        })
        .catch((err) => {
          console.log(err);
          res.json({ message: "Username already exist" });
        });
    }
  } catch (err) {
    console.log(err);
  }
});

//Client existing user login route
router.post("/login", async (req, res) => {
  try {
    console.log("Login req. recieved");
    let { Email, password } = req.body.client;
    let check = await client.findOne({ email: Email });
    //console.log(check);
    if (check) {
      let currPassword = check.password;
      if (currPassword === password) {
        const user = { user: check };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "3600m",
        });
        console.log("Redirecting you to CLIENT DASHBOARD");
        return res.status(200).json({
          error: false,
          Email,
          accessToken,
          message: "Redirecting you to CLIENT DASHBOARD",
        });
      } else {
        res.status(400).json({ error: true, message: "Wrong Password" });
        console.log("Wrong Password");
      }
    } else {
      res.status(400);
      res.json({
        error: true,
        message: "User does not exist, Create a new user",
      });
      console.log("User does not exist, Create a new User");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await sendEmail(to, subject, text);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Failed to send email.' });
  }
});


router.get("/getUser", authenticateToken, async (req, res) => {
  const { user }   = req.user;
  console.log(req);
  const isUser = await client.findOne({ _id: user._id });
  if (!isUser) return res.sendStatus(400);
  console.log(user);
  console.log("_______________" + isUser);
  return res.json({
    user: {
      username: isUser.username,
      email: isUser.email,
      _id: isUser._id,
      fullname: isUser.fullname,
      description: isUser.description,
      chatFreelancer: isUser.chatFreelancer
    },
    message: "",
  });
});

router.put("/edit", authenticateToken, async (req, res) => {
  // console.log(req.params.id);
  try {
    let { user } = req.user;
    //console.log(id);
    let { name, username, email, description } = req.body;
    console.log(description);
    console.log(name);
    let Client = await client.findOne({ _id: user._id });
    console.log(Client);
    Client.description = description;
    Client.fullname = name;
    Client.save()
      .then(() => {
        res.json({ messsage: "Client profile updates successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: true,
      message: err,
    });
  }
});

router.get("/updateChatFreelancer", authenticateToken, async (req, res) => {
  //console.log( req.user.user._id);
  //console.log('Chat Freelancer IDs:', chatFreelancerIds);
  try {
    const { user } = req.user;
    //console.log(user);
    // Find all jobs created by the logged-in client
    const jobsCreated = await jobs.find({ userId: req.user.user._id });
    //console.log(jobsCreated);
    const freelancerIds = jobsCreated
      .filter((job) => job.hired)
      .flatMap((job) => job.applicants.map((applicant) => applicant._id));

    const updatedUser = await client.findByIdAndUpdate(
      user._id,
      { $set: { chatFreelancer: freelancerIds } },
      { new: true }
    );
    //console.log(updatedUser);
    res.status(200).json({
      message: "Chat freelancer list updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating chat freelancer list:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
