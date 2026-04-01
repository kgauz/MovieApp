import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    movieID: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    poster_url: {
      type: String, 
    },
    searchText: {
      type: String,
      index: true,
    },
    count: {
      type: Number,
      default: 0, // starts from zero
    },
     typeMovie: {          
      type: String,
      default: "movie",  
        required: false, 
    },
  },
  { timestamps: true }
);


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String, // URL stored as string
      required:true,
      unique:true
      
    },
   
  },
  { timestamps: true }
);
const userListSchema = new mongoose.Schema(
  {
    userID: {
      type: String, // or ObjectId
      required: true,
    },
    movieID: {
      type: Number, // TMDB movie ID
      required: true,
    },
    typeMovie: {
      type: String,
      required: true,
    },
    title: String,
    poster: String,
    releaseDate: String,
    rating: Number,
  },
  { timestamps: true }
);


export const Movie = mongoose.model("Movie", movieSchema);
export const User = mongoose.model("User", userSchema);
export const UserList = mongoose.model("UserList", userListSchema);