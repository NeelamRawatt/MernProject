const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const storyModel = require("./models/Stories");
const UserModel = require("./models/User");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const session = require("express-session");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://neelam30rawat:fdKGNwKppaj06BaV@cluster0.58clcqf.mongodb.net/mern"
);
// app.use(passport.initialize());
// app.use(passport.session());
// Passport configuration for user authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "username", // Specify the field names for username and password
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        // Find the user by username in the database
        const user = await UserModel.findOne({ username });

        // If the user doesn't exist or the password is incorrect, return an error
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return done(null, false, { message: "Invalid username or password" });
        }

        // If authentication is successful, return the user object
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
// Registration endpoint
app.post("/registerUser", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken in the userStories collection
    console.log("in tryyyyyyy");
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      console.log("in tryyyyyyy11111");
      console.log("user already present -------");
      return res.status(400).json({ message: "Username already taken" });
    }

    // If the username is not taken, create a new user in the userStories collection
    const newUser = new UserModel({
      username,
      password,
    });
    console.log("username -----", username);

    console.log("in tryyyyyyy22222");

    // Save the user to the userStories collection
    await newUser.save();
    console.log("in tryyyyyyy333");

    // Return a success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/submitStory", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const { prompt, story } = req.body;

  try {
    // Create a new story associated with the logged-in user
    const newStory = new storyModel({
      prompt,
      story,
      upvotes: 0,
      user: req.user._id, // Associate the story with the user
    });

    // Save the story to the database
    await newStory.save();

    res.status(201).json({ message: "Story submitted successfully" });
  } catch (error) {
    console.error("Error submitting story:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// app.get("/getDetails", (req, resp) => {
//   storyModel
//     .find({})
//     .then(function (stories) {
//       resp.json(stories);
//     })
//     .catch(function (err) {
//       resp.json(err);
//     });
// });
app.get("/getDetails", async (req, resp) => {
  try {
    const storiesWithUsers = await storyModel
      .find({})
      .populate("user", "username")
      .exec();

    resp.json(storiesWithUsers);
  } catch (error) {
    console.error("Error fetching stories:", error);
    resp.status(500).json({ error: "Internal server error" });
  }
});

app.post("/setDetails", async (req, resp) => {
  const story = req.body;
  const newStory = new storyModel(story);
  await newStory.save();
  resp.json(newStory); //yaha story return kr rahe thi tum and isme _id nhi rahta
});
app.put("/upvote/:storyId", async (req, res) => {
  try {
    const storyId = req.params.storyId;

    // Retrieve the story from the database
    const story = await storyModel.findById(storyId);

    // Increment the upvotes
    story.upvotes += 1;

    // Save the updated story with the new upvotes count
    await story.save();

    res.status(200).json({ message: "Upvote successful" });
  } catch (error) {
    console.error("Error upvoting story:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/checkUsername/:username", async (req, res) => {
  const { username } = req.params;
  console.log("heyyyy");
  try {
    const existingUser = await UserModel.findOne({ username });
    console.log("heyyyy2");

    if (existingUser) {
      // Username is already taken
      console.log("heyyyy3");

      res.json({ isTaken: true });
    } else {
      console.log("heyyyy4");

      // Username is available
      res.json({ isTaken: false });
    }
  } catch (error) {
    console.error("Error checking username availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});
