import mongoose from "mongoose";

const slideSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  paragraph: {
    type: String,
  },
  image: {
    type: String,
  },
  height: {
    type: String,
  },
  width: {
    type: String,
  }
});

const webstorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverphoto: {
    type: String,
    required: true,
  },
  coverphotoheight: {
    type: String,
  },
  coverphotowidth: {
    type: String,
  },
  date: {
    type: Date,
  },
  link: {
    type: String,
  },
  ads: {
    type: String,
  },
  lastimage: {
    type: String,
  },
  lastheading: {
    type: String,
  },
  slides: {
    type: [slideSchema],
  },
});



export default mongoose.models.WebStory || mongoose.model('WebStory', webstorySchema);