const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: [true, 'Please provide an action'],
    trim: true
  },
  entityType: {
    type: String,
    required: [true, 'Please provide an entity type'],
    enum: ['user', 'instrument', 'certificate', 'department']
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide an entity ID']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user who performed the action']
  },
  details: {
    type: Object
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String
  }
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
