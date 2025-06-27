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

const jobSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
  },
  deadline: {
    type: String,
  },
  tags: {
    type: String,
  },
  reward: {
    type: String,
  },
  applicants: [
    {
      _id: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: false,
      },
      bid: {
        type: String,
        required: false,
      },
      username:{
        type:String
      },
      skills:{
        type:String
      },
    }
  ],
  createdAt: {
    type: Date,
    default: new Date().getTime(),
  },
  hired: {
    type: Boolean,
    default: false,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  numberOfRatings: {
    type: Number,
    default: 0, 
  },
  overallRating: {
    type: Number,
    default: 0,
  },
});

const jobs = mongoose.model("Jobs", jobSchema);
module.exports = jobs;
