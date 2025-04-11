import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

// Mock data for instruments
const mockInstruments = [
  { id: 1, assetName: 'Scalpel #10', assetCode: 'SC001', department: 'Surgery', status: 'Active' },
  { id: 2, assetName: 'Forceps', assetCode: 'FR002', department: 'Surgery', status: 'Active' },
  { id: 3, assetName: 'Retractor', assetCode: 'RT003', department: 'Surgery', status: 'Under Repair' },
  { id: 4, assetName: 'Scissors', assetCode: 'SC004', department: 'Surgery', status: 'Condemned' },
  { id: 5, assetName: 'Needle Holder', assetCode: 'NH005', department: 'Surgery', status: 'Active' },
  { id: 6, assetName: 'Clamp', assetCode: 'CL006', department: 'Surgery', status: 'Active' },
  { id: 7, assetName: 'Suction Tube', assetCode: 'ST007', department: 'Surgery', status: 'Under Repair' },
  { id: 8, assetName: 'Surgical Drill', assetCode: 'SD008', department: 'Orthopedics', status: 'Active' },
  { id: 9, assetName: 'Bone Saw', assetCode: 'BS009', department: 'Orthopedics', status: 'Condemned' },
  { id: 10, assetName: 'Endoscope', assetCode: 'EN010', department: 'Gastroenterology', status: 'Active' }
];

// Mock data for departments
const mockDepartments = [
  { id: 1, name: 'Surgery' },
  { id: 2, name: 'Orthopedics' },
  { id: 3, name: 'Gastroenterology' },
  { id: 4, name: 'Cardiology' }
];

const InstrumentsList = () => {
  const [instruments, setInstruments] = useState([]);
  const [filteredInstruments, setFilteredInstruments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would fetch data from an API
    setInstruments(mockInstruments);
    setFilteredInstruments(mockInstruments);
  }, []);

  useEffect(() => {
    let result = instruments;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        instrument => 
          instrument.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          instrument.assetCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply department filter
    if (departmentFilter) {
      result = result.filter(instrument => instrument.department === departmentFilter);
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(instrument => instrument.status === statusFilter);
    }
    
    setFilteredInstruments(result);
  }, [instruments, searchTerm, departmentFilter, statusFilter]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleViewInstrument = (id) => {
    navigate(`/instruments/${id}`);
  };

  const handleAddInstrument = () => {
    // In a real app, this would navigate to a form to add a new instrument
    alert('Add new instrument functionality would be implemented here');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Instruments</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleAddInstrument}
        >
          Add New Instrument
        </Button>
      </Box>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              endAdornment: <SearchIcon color="action" />
            }}
            sx={{ flexGrow: 1, minWidth: '200px' }}
          />
          
          <FormControl size="small" sx={{ minWidth: '200px' }}>
            <InputLabel>Department</InputLabel>
            <Select
              value={departmentFilter}
              label="Department"
              onChange={handleDepartmentChange}
            >
              <MenuItem value="">All Departments</MenuItem>
              {mockDepartments.map(dept => (
                <MenuItem key={dept.id} value={dept.name}>{dept.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: '200px' }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Under Repair">Under Repair</MenuItem>
              <MenuItem value="Condemned">Condemned</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset Name</TableCell>
                <TableCell>Asset Code</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInstruments.map((instrument) => (
                <TableRow key={instrument.id}>
                  <TableCell>{instrument.assetName}</TableCell>
                  <TableCell>{instrument.assetCode}</TableCell>
                  <TableCell>{instrument.department}</TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: 
                          instrument.status === 'Active' ? 'success.light' :
                          instrument.status === 'Under Repair' ? 'warning.light' :
                          'error.light',
                        color: 
                          instrument.status === 'Active' ? 'success.dark' :
                          instrument.status === 'Under Repair' ? 'warning.dark' :
                          'error.dark',
                      }}
                    >
                      {instrument.status}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton 
                        color="primary"
                        onClick={() => handleViewInstrument(instrument.id)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default InstrumentsList;

