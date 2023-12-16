const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: false },
    number: { type: Number, required: true },
    state: { type: String, enum: ['open', 'closed'], required: true },
  },
  { collection: 'issues', timestamps: true }
);

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
