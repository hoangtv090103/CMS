const mongosse = require('mongoose');

const ContentSchema = new mongosse.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: { // slug is a string that is used to identify a resource
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: { // excerpt is a brief summary of a post or article, or of a book
    type: String,
  },
  publishDate: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongosse.Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Content = mongosse.model('Content', ContentSchema);

module.exports = Content;
