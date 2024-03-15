const Content = require('../models/content');

const getAllContents = async (req, res) => {
  try {
    const contents = await Content.find();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getContentById = async (req, res) => {
  const id = req.params.id;
  try {
    const content = await
      Content
        .findById
        (id);
    if (content) {
      res.json(content);
    }
    else {
      res.status(404).json({ message: "Content not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createContent = async (req, res) => {
  const content = new Content(req.body);
  try {
    const newContent = await content.save();
    res.status(201).json(newContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const updateContent = async (req, res) => {
  const id = req.params.id;
  const { title, description, url } = req.body;
  try {
    const content
      = await Content.findById(id);
    if (content) {
      content.title = title;
      content.description = description;
      content.url = url;
      const updatedContent = await content.save();
      res.json(updatedContent);
    }
    else {
      res.status(404).json({ message: "Content not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteContent = async (req, res) => {
  const id = req.params.id;
  try {
    const content
      = await Content.findById(id);
    if (content) {
      await content.remove();
      res.json({ message: "Content deleted!" });
    }
    else {
      res.status(404).json({ message: "Content not found!" });
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
};
