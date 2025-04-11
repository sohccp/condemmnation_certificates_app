const Instrument = require('../models/Instrument');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all instruments
// @route   GET /api/v1/instruments
// @access  Private
exports.getInstruments = asyncHandler(async (req, res, next) => {
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
  let query = Instrument.find(JSON.parse(queryStr)).populate('department', 'name');

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
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Instrument.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const instruments = await query;

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
    count: instruments.length,
    pagination,
    data: instruments
  });
});

// @desc    Get single instrument
// @route   GET /api/v1/instruments/:id
// @access  Private
exports.getInstrument = asyncHandler(async (req, res, next) => {
  const instrument = await Instrument.findById(req.params.id).populate('department', 'name');

  if (!instrument) {
    return next(
      new ErrorResponse(`Instrument not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: instrument
  });
});

// @desc    Create new instrument
// @route   POST /api/v1/instruments
// @access  Private
exports.createInstrument = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.createdBy = req.user.id;

  const instrument = await Instrument.create(req.body);

  res.status(201).json({
    success: true,
    data: instrument
  });
});

// @desc    Update instrument
// @route   PUT /api/v1/instruments/:id
// @access  Private
exports.updateInstrument = asyncHandler(async (req, res, next) => {
  let instrument = await Instrument.findById(req.params.id);

  if (!instrument) {
    return next(
      new ErrorResponse(`Instrument not found with id of ${req.params.id}`, 404)
    );
  }

  instrument = await Instrument.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: instrument
  });
});

// @desc    Delete instrument
// @route   DELETE /api/v1/instruments/:id
// @access  Private
exports.deleteInstrument = asyncHandler(async (req, res, next) => {
  const instrument = await Instrument.findById(req.params.id);

  if (!instrument) {
    return next(
      new ErrorResponse(`Instrument not found with id of ${req.params.id}`, 404)
    );
  }

  await instrument.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
