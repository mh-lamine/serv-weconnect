const tagsService = require("../services/tagsService");
const Joi = require("joi");

const tagsSchema = Joi.object({
  name: Joi.string().required(),
});

exports.createTag = async (req, res, next) => {
  try {
    const { error } = tagsSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const tag = await tagsService.createTag(req.body);
    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};

exports.getTags = async (req, res, next) => {
  try {
    const tags = await tagsService.getTags();
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

exports.updateTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = tagsSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const tag = await tagsService.updateTag(id, req.body);
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.json(tag);
  } catch (error) {
    next(error);
  }
};

exports.deleteTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tag = await tagsService.deleteTag(id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.json(tag);
  } catch (error) {
    next(error);
  }
};
