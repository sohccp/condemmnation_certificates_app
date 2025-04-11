const express = require('express');
const {
  getCertificates,
  getCertificate,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  approveCertificate,
  rejectCertificate,
  completeCertificate
} = require('../controllers/certificates');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getCertificates)
  .post(protect, createCertificate);

router
  .route('/:id')
  .get(protect, getCertificate)
  .put(protect, updateCertificate)
  .delete(protect, authorize('admin'), deleteCertificate);

router
  .route('/:id/approve')
  .put(protect, authorize('department_head', 'biomedical_engineer', 'authorizing_officer'), approveCertificate);

router
  .route('/:id/reject')
  .put(protect, authorize('department_head', 'biomedical_engineer', 'authorizing_officer'), rejectCertificate);

router
  .route('/:id/complete')
  .put(protect, authorize('admin', 'authorizing_officer'), completeCertificate);

module.exports = router;
