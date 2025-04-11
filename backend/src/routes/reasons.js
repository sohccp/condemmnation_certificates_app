const express = require('express');
const {
  getReasons,
  getReason,
  createReason,
  updateReason,
  deleteReason
} = require('../controllers/reasons');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getReasons)
  .post(protect, authorize('admin'), createReason);

router
  .route('/:id')
  .get(protect, getReason)
  .put(protect, authorize('admin'), updateReason)
  .delete(protect, authorize('admin'), deleteReason);

module.exports = router;

