import mongoose from "mongoose";

let resultSchema = new mongoose.Schema({ 
  query: String,
  users: [String],
  questions: [String],
  answers: [String]
});

const Result = mongoose.model('Result', resultSchema);

export default Result;