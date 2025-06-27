const mongoose = require("mongoose");


async function main() {
    await mongoose.connect(
      "mongodb+srv://omgovindani:2612@cluster0.2tzmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
  }
  main()
    .then(() => {
      console.log("Jobs Database Connection Successfull");
    })
    .catch((err) => {
      console.log(err);
    });
  

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
