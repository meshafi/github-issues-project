const Joi = require("joi");

const issueIdSchema = Joi.alternatives().try(
  Joi.string().length(24).hex(), 
  Joi.number().integer().positive() 
);

const getIssueSchema = Joi.object({
  issue_id: issueIdSchema.required(),
});

const updateIssueSchema = Joi.object({
  updatedIssueDetails: Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required()
  }).required(),
});

const jwtSchema = Joi.object({
  Authorization: Joi.string().required(),
}).unknown();

module.exports = {
  getIssueSchema,
  updateIssueSchema,
  jwtSchema,
};
