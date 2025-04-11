import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Mock data for instruments
const mockInstruments = [
  { id: 1, assetName: 'Scalpel #10', assetCode: 'SC001', department: 'Surgery' },
  { id: 2, assetName: 'Forceps', assetCode: 'FR002', department: 'Surgery' },
  { id: 3, assetName: 'Retractor', assetCode: 'RT003', department: 'Surgery' },
  { id: 4, assetName: 'Scissors', assetCode: 'SC004', department: 'Surgery' },
  { id: 5, assetName: 'Needle Holder', assetCode: 'NH005', department: 'Surgery' }
];

// Mock data for condemnation reasons
const mockReasons = [
  { code: 'BER', description: 'Beyond Economical Repair' },
  { code: 'TO', description: 'Technically Obsolete' },
  { code: 'CO', description: 'Clinically Obsolete' },
  { code: 'DC', description: 'Damaged by Contamination' },
  { code: 'SPNA', description: 'Spare Parts No Longer Available' }
];

const validationSchema = yup.object({
  instrumentId: yup.number().required('Instrument is required'),
  decontaminationMethod: yup.string().required('Decontamination method is required'),
  decontaminationDate: yup.date().required('Decontamination date is required'),
  reasonCode: yup.string().required('Reason is required'),
  reasonDetails: yup.string().required('Details are required').min(10, 'Please provide more details (minimum 10 characters)'),
  notes: yup.string()
});

const NewCertificate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [instruments, setInstruments] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  
  // Get instrumentId from location state if available (from instrument details page)
  const preselectedInstrumentId = location.state?.instrumentId;

  useEffect(() => {
    // In a real app, this would fetch data from an API
    setInstruments(mockInstruments);
    
    if (preselectedInstrumentId) {
      const instrument = mockInstruments.find(i => i.id === parseInt(preselectedInstrumentId));
      if (instrument) {
        setSelectedInstrument(instrument);
      }
    }
  }, [preselectedInstrumentId]);

  const formik = useFormik({
    initialValues: {
      instrumentId: preselectedInstrumentId || '',
      decontaminationMethod: '',
      decontaminationDate: new Date().toISOString().split('T')[0], // Today's date
      reasonCode: '',
      reasonDetails: '',
      notes: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // In a real app, this would send data to an API
      console.log('Form submitted:', values);
      alert('Certificate created successfully!');
      navigate('/certificates');
    }
  });

  useEffect(() => {
    if (formik.values.instrumentId) {
      const instrument = instruments.find(i => i.id === parseInt(formik.values.instrumentId));
      setSelectedInstrument(instrument || null);
    } else {
      setSelectedInstrument(null);
    }
  }, [formik.values.instrumentId, instruments]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">New Condemnation Certificate</Typography>
      </Box>
      
      <Paper sx={{ p: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Instrument Selection */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Instrument Information</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <FormControl 
                fullWidth 
                error={formik.touched.instrumentId && Boolean(formik.errors.instrumentId)}
              >
                <InputLabel>Instrument</InputLabel>
                <Select
                  name="instrumentId"
                  value={formik.values.instrumentId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Instrument"
                  disabled={Boolean(preselectedInstrumentId)}
                >
                  {instruments.map((instrument) => (
                    <MenuItem key={instrument.id} value={instrument.id}>
                      {instrument.assetName} ({instrument.assetCode})
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.instrumentId && formik.errors.instrumentId && (
                  <FormHelperText>{formik.errors.instrumentId}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            {selectedInstrument && (
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" color="text.secondary">Selected Instrument</Typography>
                  <Typography variant="body1">{selectedInstrument.assetName} ({selectedInstrument.assetCode})</Typography>
                  <Typography variant="body2" color="text.secondary">Department: {selectedInstrument.department}</Typography>
                </Paper>
              </Grid>
            )}
            
            {/* Decontamination Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Decontamination Information</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="decontaminationMethod"
                    label="Decontamination Method"
                    value={formik.values.decontaminationMethod}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.decontaminationMethod && Boolean(formik.errors.decontaminationMethod)}
                    helperText={formik.touched.decontaminationMethod && formik.errors.decontaminationMethod}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="decontaminationDate"
                    label="Decontamination Date"
                    type="date"
                    value={formik.values.decontaminationDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.decontaminationDate && Boolean(formik.errors.decontaminationDate)}
                    helperText={formik.touched.decontaminationDate && formik.errors.decontaminationDate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Grid>
            
            {/* Condemnation Reason */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Condemnation Reason</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl 
                    fullWidth 
                    error={formik.touched.reasonCode && Boolean(formik.errors.reasonCode)}
                  >
                    <InputLabel>Reason</InputLabel>
                    <Select
                      name="reasonCode"
                      value={formik.values.reasonCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      label="Reason"
                    >
                      {mockReasons.map((reason) => (
                        <MenuItem key={reason.code} value={reason.code}>
                          {reason.description}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.reasonCode && formik.errors.reasonCode && (
                      <FormHelperText>{formik.errors.reasonCode}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="reasonDetails"
                    label="Details"
                    multiline
                    rows={4}
                    value={formik.values.reasonDetails}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.reasonDetails && Boolean(formik.errors.reasonDetails)}
                    helperText={formik.touched.reasonDetails && formik.errors.reasonDetails}
                    placeholder="Please provide detailed explanation for the condemnation reason"
                  />
                </Grid>
              </Grid>
            </Grid>
            
            {/* Additional Notes */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Additional Notes</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <TextField
                fullWidth
                name="notes"
                label="Notes (Optional)"
                multiline
                rows={3}
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.notes && Boolean(formik.errors.notes)}
                helperText={formik.touched.notes && formik.errors.notes}
              />
            </Grid>
            
            {/* Form Actions */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button 
                  variant="outlined" 
                  onClick={handleBack}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="contained"
                  disabled={formik.isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default NewCertificate;
