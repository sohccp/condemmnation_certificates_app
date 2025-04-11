const Certificate = require('../models/Certificate');
const Instrument = require('../models/Instrument');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all certificates
// @route   GET /api/v1/certificates
// @access  Private
exports.getCertificates = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  let query = Certificate.find(JSON.parse(queryStr))
    .populate({
      path: 'instrument',
      select: 'assetName assetCode department',
      populate: {
        path: 'department',
        select: 'name'
      }
    })
    .populate('initiatedBy', 'fullName')
    .populate('reason', 'code description');

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-initiatedDate');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Certificate.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const certificates = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: certificates.length,
    pagination,
    data: certificates
  });
});

// @desc    Get single certificate
// @route   GET /api/v1/certificates/:id
// @access  Private
exports.getCertificate = asyncHandler(async (req, res, next) => {
  const certificate = await Certificate.findById(req.params.id)
    .populate({
      path: 'instrument',
      select: 'assetName assetCode manufacturer model serialNumber department',
      populate: {
        path: 'department',
        select: 'name'
      }
    })
    .populate('initiatedBy', 'fullName')
    .populate('reason', 'code description')
    .populate('approvalWorkflow.user', 'fullName');

  if (!certificate) {
    return next(
      new ErrorResponse(`Certificate not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: certificate
  });
});

// @desc    Create new certificate
// @route   POST /api/v1/certificates
// @access  Private
exports.createCertificate = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.initiatedBy = req.user.id;

  // Check if instrument exists
  const instrument = await Instrument.findById(req.body.instrument);

  if (!instrument) {
    return next(
      new ErrorResponse(`Instrument not found with id of ${req.body.instrument}`, 404)
    );
  }

  // Create default approval workflow based on roles
  req.body.approvalWorkflow = [
    {
      role: 'department_head',
      status: 'pending'
    },
    {
      role: 'biomedical_engineer',
      status: 'pending'
    },
    {
      role: 'authorizing_officer',
      status: 'pending'
    }
  ];

  const certificate = await Certificate.create(req.body);

  // Update instrument status to under_repair
  instrument.status = 'under_repair';
  await instrument.save();

  res.status(201).json({
    success: true,
    data: certificate
  });
});

// @desc    Update certificate
// @route   PUT /api/v1/certificates/:id
// @access  Private
exports.updateCertificate = asyncHandler(async (req, res, next) => {
  let certificate = await Certificate.findById(req.params.id);

  if (!certificate) {
    return next(
      new ErrorResponse(`Certificate not found with id of ${req.params.id}`, 404)
    );
  }

  certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: certificate
  });
});

// @desc    Approve certificate step
// @route   PUT /api/v1/certificates/:id/approve
// @access  Private
exports.approveCertificate = asyncHandler(async (req, res, next) => {
  const { comments } = req.body;
  
  let certificate = await Certificate.findById(req.params.id);

  if (!certificate) {
    return next(
      new ErrorResponse(`Certificate not found with id of ${req.params.id}`, 404)
    );
  }

  // Find the current approval step based on user role
  const approvalIndex = certificate.approvalWorkflow.findIndex(
    step => step.role === req.user.role && step.status === 'pending'
  );

  if (approvalIndex === -1) {
    return next(
      new ErrorResponse('You are not authorized to approve this certificate or it has already been processed', 403)
    );
  }

  // Update the approval step
  certificate.approvalWorkflow[approvalIndex].status = 'approved';
  certificate.approvalWorkflow[approvalIndex].user = req.user.id;
  certificate.approvalWorkflow[approvalIndex].date = Date.now();
  certificate.approvalWorkflow[approvalIndex].comments = comments || '';

  // Check if all steps are approved
  const allApproved = certificate.approvalWorkflow.every(step => step.status === 'approved');

  if (allApproved) {
    certificate.status = 'approved';
    
    // Update instrument status to condemned
    const instrument = await Instrument.findById(certificate.instrument);
    if (instrument) {
      instrument.status = 'condemned';
      await instrument.save();
    }
  }

  await certificate.save();

  res.status(200).json({
    success: true,
    data: certificate
  });
});

// @desc    Reject certificate step
// @route   PUT /api/v1/certificates/:id/reject
// @access  Private
exports.rejectCertificate = asyncHandler(async (req, res, next) => {
  const { comments } = req.body;
  
  if (!comments) {
    return next(
      new ErrorResponse('Please provide comments explaining the rejection reason', 400)
    );
  }
  
  let certificate = await Certificate.findById(req.params.id);

  if (!certificate) {
    return next(
      new ErrorResponse(`Certificate not found with id of ${req.params.id}`, 404)
    );
  }

  // Find the current approval step based on user role
  const approvalIndex = certificate.approvalWorkflow.findIndex(
    step => step.role === req.user.role && step.status === 'pending'
  );

  if (approvalIndex === -1) {
    return next(
      new ErrorResponse('You are not authorized to reject this certificate or it has already been processed', 403)
    );
  }

  // Update the approval step
  certificate.approvalWorkflow[approvalIndex].status = 'rejected';
  certificate.approvalWorkflow[approvalIndex].user = req.user.id;
  certificate.approvalWorkflow[approvalIndex].date = Date.now();
  certificate.approvalWorkflow[approvalIndex].comments = comments;

  // Update certificate status
  certificate.status = 'rejected';
  
  // Update instrument status back to active
  const instrument = await Instrument.findById(certificate.instrument);
  if (instrument) {
    instrument.status = 'active';
    await instrument.save();
  }

  await certificate.save();

  res.status(200).json({
    success: true,
    data: certificate
  });
});

// @desc    Complete certificate (after physical disposal)
// @route   PUT /api/v1/certificates/:id/complete
// @access  Private/Admin
exports.completeCertificate = asyncHandler(async (req, res, next) => {
  let certificate = await Certificate.findById(req.params.id);

  if (!certificate) {
    return next(
      new ErrorResponse(`Certificate not found with id of ${req.params.id}`, 404)
    );
  }

  if (certificate.status !== 'approved') {
    return next(
      new ErrorResponse('Only approved certificates can be marked as completed', 400)
    );
  }

  certificate.status = 'completed';
  certificate.completedDate = Date.now();
  await certificate.save();

  res.status(200).json({
    success: true,
    data: certificate
  });
});

// @desc    Delete certificate
// @route   DELETE /api/v1/certificates/:id
// @access  Private/Admin
exports.deleteCertificate = asyncHandler(async (req, res, next) => {
  const certificate = await Certificate.findById(req.params.id);

  if (!certificate) {
    return next(
      new ErrorResponse(`Certificate not found with id of ${req.params.id}`, 404)
    );
  }

  await certificate.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
