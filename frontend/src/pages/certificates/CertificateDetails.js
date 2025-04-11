import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams, useNavigate } from 'react-router-dom';

// Mock data for a single certificate
const mockCertificateDetails = {
  id: 1,
  certificateNumber: 'C001',
  status: 'Pending',
  instrument: {
    id: 1,
    assetName: 'Scalpel #10',
    assetCode: 'SC001',
    manufacturer: 'Surgical Co.',
    model: 'SCP-10',
    serialNumber: '12345678',
    department: 'Surgery'
  },
  initiatedBy: {
    id: 1,
    fullName: 'John Doe'
  },
  initiatedDate: '2025-04-05',
  decontaminationMethod: 'Autoclave',
  decontaminationDate: '2025-04-05',
  reason: {
    code: 'BER',
    description: 'Beyond Economical Repair'
  },
  reasonDetails: 'The instrument is damaged beyond repair. The handle is cracked and the blade attachment mechanism is no longer functional.',
  approvalWorkflow: [
    { role: 'Department Head', status: 'Pending', date: null, name: null },
    { role: 'Biomedical Engineer', status: 'Pending', date: null, name: null },
    { role: 'Authorizing Officer', status: 'Pending', date: null, name: null }
  ],
  notes: ''
};

const CertificateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [approvalComment, setApprovalComment] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    // In a real app, this would fetch data from an API
    setCertificate(mockCertificateDetails);
    setLoading(false);
  }, [id]);

  const handleBack = () => {
    navigate('/certificates');
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF download functionality would be implemented here');
  };

  const handleOpenApproveDialog = () => {
    setOpenApproveDialog(true);
  };

  const handleCloseApproveDialog = () => {
    setOpenApproveDialog(false);
    setApprovalComment('');
  };

  const handleOpenRejectDialog = () => {
    setOpenRejectDialog(true);
  };

  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false);
    setRejectionReason('');
  };

  const handleApprove = () => {
    // In a real app, this would send an API request to approve the certificate
    alert(`Certificate approved with comment: ${approvalComment || 'None'}`);
    handleCloseApproveDialog();
  };

  const handleReject = () => {
    // In a real app, this would send an API request to reject the certificate
    if (!rejectionReason) {
      alert('Please provide a reason for rejection');
      return;
    }
    alert(`Certificate rejected with reason: ${rejectionReason}`);
    handleCloseRejectDialog();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!certificate) {
    return <Typography>Certificate not found</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Certificate Details</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h6">
            Certificate #{certificate.certificateNumber}
          </Typography>
          <Chip 
            label={certificate.status}
            color={getStatusColor(certificate.status)}
            size="small"
            sx={{ mt: 0.5 }}
          />
        </Box>
        <Button 
          variant="outlined" 
          startIcon={<DownloadIcon />}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Instrument Information</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Asset Name</Typography>
                <Typography variant="body1">{certificate.instrument.assetName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Asset Code</Typography>
                <Typography variant="body1">{certificate.instrument.assetCode}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Manufacturer</Typography>
                <Typography variant="body1">{certificate.instrument.manufacturer}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Model</Typography>
                <Typography variant="body1">{certificate.instrument.model}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Serial Number</Typography>
                <Typography variant="body1">{certificate.instrument.serialNumber}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Department</Typography>
                <Typography variant="body1">{certificate.instrument.department}</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Condemnation Details</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Initiated By</Typography>
                <Typography variant="body1">{certificate.initiatedBy.fullName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Initiated Date</Typography>
                <Typography variant="body1">{certificate.initiatedDate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Decontamination Method</Typography>
                <Typography variant="body1">{certificate.decontaminationMethod}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Decontamination Date</Typography>
                <Typography variant="body1">{certificate.decontaminationDate}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">Reason</Typography>
                <Typography variant="body1">{certificate.reason.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">Details</Typography>
                <Typography variant="body1">{certificate.reasonDetails}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Approval Workflow</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Stepper orientation="vertical" sx={{ mt: 2 }}>
              {certificate.approvalWorkflow.map((step, index) => (
                <Step key={index} active={step.status !== 'Pending'} completed={step.status === 'Approved'}>
                  <StepLabel
                    optional={
                      step.date && (
                        <Typography variant="caption">
                          {step.date} - {step.name}
                        </Typography>
                      )
                    }
                  >
                    {step.role}
                    <Chip 
                      label={step.status}
                      color={getStatusColor(step.status)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {certificate.status === 'Pending' && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="success" 
                  startIcon={<CheckCircleIcon />}
                  onClick={handleOpenApproveDialog}
                >
                  Approve
                </Button>
                <Button 
                  variant="contained" 
                  color="error" 
                  startIcon={<CancelIcon />}
                  onClick={handleOpenRejectDialog}
                >
                  Reject
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Approve Dialog */}
      <Dialog open={openApproveDialog} onClose={handleCloseApproveDialog}>
        <DialogTitle>Approve Certificate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to approve the condemnation certificate for {certificate.instrument.assetName} ({certificate.instrument.assetCode}).
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comments (Optional)"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={approvalComment}
            onChange={(e) => setApprovalComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseApproveDialog}>Cancel</Button>
          <Button onClick={handleApprove} variant="contained" color="success">
            Confirm Approval
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={openRejectDialog} onClose={handleCloseRejectDialog}>
        <DialogTitle>Reject Certificate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to reject the condemnation certificate for {certificate.instrument.assetName} ({certificate.instrument.assetCode}).
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="Reason for Rejection"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            required
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRejectDialog}>Cancel</Button>
          <Button onClick={handleReject} variant="contained" color="error">
            Confirm Rejection
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CertificateDetails;

