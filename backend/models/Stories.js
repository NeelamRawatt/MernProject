const mongoose = require("mongoose");
const storySchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    // required: true,
  },
  upvotes: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
  },
});
// collection and userSchema
const storyModel = mongoose.model("stories", storySchema);
module.exports = storyModel;
