const express = require('express');
const {
  getInstruments,
  getInstrument,
  createInstrument,
  updateInstrument,
  deleteInstrument
} = require('../controllers/instruments');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getInstruments)
  .post(protect, createInstrument);

router
  .route('/:id')
  .get(protect, getInstrument)
  .put(protect, updateInstrument)
  .delete(protect, authorize('admin', 'technician'), deleteInstrument);

module.exports = router;
