const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    "mongodb+srv://omgovindani:2612@cluster0.2tzmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
}
main()
  .then(() => {
    console.log("Client Database Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

const clientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date().getTime(),
  },
  fullname: {
    type: String,
    default: "Client",
  },
  description: {
    type: String,
    default:
      "Description Description Description Description Description Description Description",
  },
  chatFreelancer: {
    type: [String],
  },
});

const client = mongoose.model("Client", clientSchema);
module.exports = client;
