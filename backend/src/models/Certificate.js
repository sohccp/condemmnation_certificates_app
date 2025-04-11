const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  certificateNumber: {
    type: String,
    unique: true,
    trim: true
  },
  instrument: {
    type: mongoose.Schema.ObjectId,
    ref: 'Instrument',
    required: [true, 'Please provide an instrument']
  },
  initiatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user who initiated the certificate']
  },
  initiatedDate: {
    type: Date,
    default: Date.now
  },
  decontaminationMethod: {
    type: String,
    required: [true, 'Please provide a decontamination method'],
    trim: true
  },
  decontaminationDate: {
    type: Date,
    required: [true, 'Please provide a decontamination date']
  },
  reason: {
    type: mongoose.Schema.ObjectId,
    ref: 'CondemnationReason',
    required: [true, 'Please provide a condemnation reason']
  },
  reasonDetails: {
    type: String,
    required: [true, 'Please provide details for the condemnation reason'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  approvalWorkflow: [
    {
      role: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      date: {
        type: Date
      },
      comments: {
        type: String
      }
    }
  ],
  notes: {
    type: String,
    trim: true
  },
  completedDate: {
    type: Date
  }
});

// Generate certificate number before saving
CertificateSchema.pre('save', async function(next) {
  if (!this.certificateNumber) {
    // Get current year
    const year = new Date().getFullYear();
    
    // Find the latest certificate number for this year
    const latestCertificate = await this.constructor.findOne(
      { certificateNumber: new RegExp(`^C-${year}-`) },
      { certificateNumber: 1 },
      { sort: { certificateNumber: -1 } }
    );
    
    let nextNumber = 1;
    
    if (latestCertificate) {
      // Extract the number from the latest certificate number
      const latestNumber = parseInt(
        latestCertificate.certificateNumber.split('-')[2]
      );
      nextNumber = latestNumber + 1;
    }
    
    // Format the certificate number (e.g., C-2025-0001)
    this.certificateNumber = `C-${year}-${nextNumber.toString().padStart(4, '0')}`;
  }
  
  next();
});

module.exports = mongoose.model('Certificate', CertificateSchema);
