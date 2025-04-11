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
  TextField
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
import { useParams, useNavigate } from 'react-router-dom';

// Mock data for a single instrument
const mockInstrumentDetails = {
  id: 1,
  assetName: 'Scalpel #10',
  assetCode: 'SC001',
  manufacturer: 'Surgical Co.',
  model: 'SCP-10',
  serialNumber: '12345678',
  category: 'Cutting Instrument',
  purchaseDate: '2023-01-15',
  cost: 150.00,
  department: 'Surgery',
  status: 'Active',
  lastMaintenance: '2025-02-10',
  maintenanceHistory: [
    { id: 1, date: '2025-02-10', type: 'Routine', performedBy: 'Jane Smith' },
    { id: 2, date: '2024-08-15', type: 'Repair', performedBy: 'Mike Johnson' },
    { id: 3, date: '2024-02-20', type: 'Routine', performedBy: 'Jane Smith' }
  ]
};

const InstrumentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instrument, setInstrument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCondemnDialog, setOpenCondemnDialog] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    setInstrument(mockInstrumentDetails);
    setLoading(false);
  }, [id]);

  const handleBack = () => {
    navigate('/instruments');
  };

  const handleEdit = () => {
    // In a real app, this would navigate to an edit form
    alert('Edit instrument functionality would be implemented here');
  };

  const handleOpenCondemnDialog = () => {
    setOpenCondemnDialog(true);
  };

  const handleCloseCondemnDialog = () => {
    setOpenCondemnDialog(false);
  };

  const handleCondemn = () => {
    // In a real app, this would navigate to the new certificate form
    navigate('/certificates/new', { state: { instrumentId: id } });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!instrument) {
    return <Typography>Instrument not found</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Instrument Details</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          variant="outlined" 
          startIcon={<EditIcon />} 
          sx={{ mr: 1 }}
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<WarningIcon />}
          onClick={handleOpenCondemnDialog}
        >
          Condemn
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Basic Information</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Asset Name</Typography>
                <Typography variant="body1">{instrument.assetName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Asset Code</Typography>
                <Typography variant="body1">{instrument.assetCode}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Manufacturer</Typography>
                <Typography variant="body1">{instrument.manufacturer}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Model</Typography>
                <Typography variant="body1">{instrument.model}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Serial Number</Typography>
                <Typography variant="body1">{instrument.serialNumber}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Category</Typography>
                <Typography variant="body1">{instrument.category}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Purchase Date</Typography>
                <Typography variant="body1">{instrument.purchaseDate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Cost</Typography>
                <Typography variant="body1">${instrument.cost.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Department</Typography>
                <Typography variant="body1">{instrument.department}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                <Chip 
                  label={instrument.status}
                  color={
                    instrument.status === 'Active' ? 'success' :
                    instrument.status === 'Under Repair' ? 'warning' :
                    'error'
                  }
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Last Maintenance</Typography>
                <Typography variant="body1">{instrument.lastMaintenance}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Maintenance History</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {instrument.maintenanceHistory.map((maintenance) => (
                <React.Fragment key={maintenance.id}>
                  <ListItem>
                    <ListItemText
                      primary={`${maintenance.date} - ${maintenance.type}`}
                      secondary={`Performed by: ${maintenance.performedBy}`}
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Condemn Dialog */}
      <Dialog open={openCondemnDialog} onClose={handleCloseCondemnDialog}>
        <DialogTitle>Condemn Instrument</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to condemn this instrument? This action will initiate the condemnation certificate process for {instrument.assetName} ({instrument.assetCode}).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCondemnDialog}>Cancel</Button>
          <Button onClick={handleCondemn} variant="contained" color="error">
            Proceed to Condemnation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InstrumentDetails;
