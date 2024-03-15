const mongoose = require('mongoose');

const ContentTgSchema = new mongoose.Schema(
  {
    contenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
    },
    tagId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
    }
  });

const ContentTag = mongoose.model('ContentTag', ContentTgSchema);

module.exports = ContentTag;
