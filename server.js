import express, { request } from "express";
import mongoose from "mongoose";
import {Movie, User, UserList} from "./services/movie.js";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
import { auth } from "./middleware.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
//  Use simple CORS for dev

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Trending endpoint
app.get("/trending", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ count: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//all movies
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Search endpoint
app.post("/search", async (req, res) => {
  try {
    const { movieID, title, poster_url,movieType } = req.body;
    if (!movieID || !title) return res.status(400).json({ error: "Invalid movie data" });

    const existingMovie = await Movie.findOne({ movieID });
    if (existingMovie) {
      existingMovie.count += 1;
      await existingMovie.save();
      return res.json(existingMovie);
    }

    const newMovie = await Movie.create({ movieID,movieType, title, poster_url, count: 1 });
    res.json(newMovie);
  } catch (error) {
    console.error("SEARCH ERROR:", error);
    res.status(500).json({ error: "Failed to save search" });
  }
});

app.post("/register", async (req, res) => {

 
  try {
    const { username, email, password } = req.body;

     // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password:hashedPassword,
    });

    await newUser.save();  

    // console.log("User saved!");

    res.status(201).json({ message: "User registered" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// find user details from databse
app.get("/register", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    //  Find user by email or username
     const user = await User.findOne({
      $or: [{ username: username }, { email: username }]
    });

     if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    //const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    

     // Generate Token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    

    // Success: return user info
    res.json({
      message: "Login successful",
      token,
      user: {
        name: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
  
});


app.delete("/delete-account", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: true });
  } catch (error) {
    res.status(500).json({ message: false });
  }
});



// Save or remove movie
app.post("/save-movie", auth, async (req, res) => {
  try {
    const userID = req.user.id; // token is already verified in auth middleware
    const { movie } = req.body;
  

    if (!movie) return res.status(400).json({ msg: "No movie provided" });

    // Check if movie is already saved
    const exists = await UserList.findOne({
      userID,
      movieID: movie.id,
    });

    if (exists) {
      await UserList.deleteOne({ _id: exists._id });
      return res.json({ msg: "Removed from saved" });
    }

    const baseURL = "https://image.tmdb.org/t/p/w500";

    // Save new movie
    const newEntry = new UserList({
      userID,
      movieID: movie.id,
      typeMovie: "movie" || "tv",
      title: movie.title,
      poster:  movie.poster_path ? `${baseURL}${movie.poster_path}` : movie.poster,
      releaseDate: movie.release_date || movie.releaseDate,
      rating: movie.vote_average || movie.rating,
    });

    await newEntry.save();
    return res.json({ msg: "Saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

app.get("/save-movie", auth, async (req, res) => {
  try {
    const movies = await UserList.find({ userID: req.user.id });

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});
app.listen(PORT, () => console.log("Server running on port ${PORT}"));
