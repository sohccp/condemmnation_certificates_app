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
  Tooltip,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

// Mock data for certificates
const mockCertificates = [
  { 
    id: 1, 
    certificateNumber: 'C001', 
    instrument: 'Scalpel #10', 
    department: 'Surgery', 
    status: 'Pending', 
    date: '2025-04-05' 
  },
  { 
    id: 2, 
    certificateNumber: 'C002', 
    instrument: 'Forceps', 
    department: 'Surgery', 
    status: 'Approved', 
    date: '2025-04-04' 
  },
  { 
    id: 3, 
    certificateNumber: 'C003', 
    instrument: 'Scissors', 
    department: 'Surgery', 
    status: 'Completed', 
    date: '2025-04-03' 
  },
  { 
    id: 4, 
    certificateNumber: 'C004', 
    instrument: 'Retractor', 
    department: 'Surgery', 
    status: 'Rejected', 
    date: '2025-04-02' 
  },
  { 
    id: 5, 
    certificateNumber: 'C005', 
    instrument: 'Bone Saw', 
    department: 'Orthopedics', 
    status: 'Pending', 
    date: '2025-04-01' 
  }
];

// Mock data for departments
const mockDepartments = [
  { id: 1, name: 'Surgery' },
  { id: 2, name: 'Orthopedics' },
  { id: 3, name: 'Gastroenterology' },
  { id: 4, name: 'Cardiology' }
];

const CertificatesList = () => {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would fetch data from an API
    setCertificates(mockCertificates);
    setFilteredCertificates(mockCertificates);
  }, []);

  useEffect(() => {
    let result = certificates;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        certificate => 
          certificate.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          certificate.instrument.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply department filter
    if (departmentFilter) {
      result = result.filter(certificate => certificate.department === departmentFilter);
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(certificate => certificate.status === statusFilter);
    }
    
    setFilteredCertificates(result);
  }, [certificates, searchTerm, departmentFilter, statusFilter]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleViewCertificate = (id) => {
    navigate(`/certificates/${id}`);
  };

  const handleNewCertificate = () => {
    navigate('/certificates/new');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Approved':
        return 'info';
      case 'Completed':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Condemnation Certificates</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleNewCertificate}
        >
          New Certificate
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
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Certificate #</TableCell>
                <TableCell>Instrument</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCertificates.map((certificate) => (
                <TableRow key={certificate.id}>
                  <TableCell>{certificate.certificateNumber}</TableCell>
                  <TableCell>{certificate.instrument}</TableCell>
                  <TableCell>{certificate.department}</TableCell>
                  <TableCell>
                    <Chip 
                      label={certificate.status}
                      color={getStatusColor(certificate.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{certificate.date}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton 
                        color="primary"
                        onClick={() => handleViewCertificate(certificate.id)}
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

export default CertificatesList;
