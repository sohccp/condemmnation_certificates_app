const CondemnationReason = require('../models/CondemnationReason');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all condemnation reasons
// @route   GET /api/v1/reasons
// @access  Private
exports.getReasons = asyncHandler(async (req, res, next) => {
  const reasons = await CondemnationReason.find();

  res.status(200).json({
    success: true,
    count: reasons.length,
    data: reasons
  });
});

// @desc    Get single condemnation reason
// @route   GET /api/v1/reasons/:id
// @access  Private
exports.getReason = asyncHandler(async (req, res, next) => {
  const reason = await CondemnationReason.findById(req.params.id);

  if (!reason) {
    return next(
      new ErrorResponse(`Condemnation reason not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: reason
  });
});

// @desc    Create new condemnation reason
// @route   POST /api/v1/reasons
// @access  Private/Admin
exports.createReason = asyncHandler(async (req, res, next) => {
  const reason = await CondemnationReason.create(req.body);

  res.status(201).json({
    success: true,
    data: reason
  });
});

// @desc    Update condemnation reason
// @route   PUT /api/v1/reasons/:id
// @access  Private/Admin
exports.updateReason = asyncHandler(async (req, res, next) => {
  let reason = await CondemnationReason.findById(req.params.id);

  if (!reason) {
    return next(
      new ErrorResponse(`Condemnation reason not found with id of ${req.params.id}`, 404)
    );
  }

  reason = await CondemnationReason.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: reason
  });
});

// @desc    Delete condemnation reason
// @route   DELETE /api/v1/reasons/:id
// @access  Private/Admin
exports.deleteReason = asyncHandler(async (req, res, next) => {
  const reason = await CondemnationReason.findById(req.params.id);

  if (!reason) {
    return next(
      new ErrorResponse(`Condemnation reason not found with id of ${req.params.id}`, 404)
    );
  }

  await reason.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

