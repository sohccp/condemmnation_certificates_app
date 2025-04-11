const mongoose = require('mongoose');

const CondemnationReasonSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please provide a reason code'],
    unique: true,
    trim: true,
    maxlength: [20, 'Reason code cannot be more than 20 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a reason description'],
    trim: true,
    maxlength: [255, 'Reason description cannot be more than 255 characters']
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CondemnationReason', CondemnationReasonSchema);
