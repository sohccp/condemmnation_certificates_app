import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Mock data for reports
const mockReportTypes = [
  { id: 1, name: 'Condemned Instruments Report' },
  { id: 2, name: 'Pending Approvals Report' },
  { id: 3, name: 'Department Summary Report' },
  { id: 4, name: 'Condemnation Reasons Report' }
];

// Mock data for departments
const mockDepartments = [
  { id: 1, name: 'Surgery' },
  { id: 2, name: 'Orthopedics' },
  { id: 3, name: 'Gastroenterology' },
  { id: 4, name: 'Cardiology' }
];

const Reports = () => {
  const navigate = useNavigate();
  const [reportType, setReportType] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [format, setFormat] = React.useState('pdf');

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleGenerateReport = (reportId) => {
    // In a real app, this would generate and download a report
    alert(`Generating report ${reportId || reportType}`);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      
      <Grid container spacing={3}>
        {/* Report Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Condemned Instruments
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View all condemned instruments with details and reasons
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => handleGenerateReport(1)}
              >
                Generate
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending Approvals
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View certificates pending approval at different stages
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => handleGenerateReport(2)}
              >
                Generate
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Department Summary
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View condemnation statistics by department
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => handleGenerateReport(3)}
              >
                Generate
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Condemnation Reasons
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View statistics by condemnation reason
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => handleGenerateReport(4)}
              >
                Generate
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Custom Report */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Custom Report
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    label="Report Type"
                    onChange={handleReportTypeChange}
                  >
                    <MenuItem value="">Select Report Type</MenuItem>
                    {mockReportTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={department}
                    label="Department"
                    onChange={handleDepartmentChange}
                  >
                    <MenuItem value="">All Departments</MenuItem>
                    {mockDepartments.map((dept) => (
                      <MenuItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Format</InputLabel>
                  <Select
                    value={format}
                    label="Format"
                    onChange={handleFormatChange}
                  >
                    <MenuItem value="pdf">PDF</MenuItem>
                    <MenuItem value="excel">Excel</MenuItem>
                    <MenuItem value="csv">CSV</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  onClick={() => handleGenerateReport()}
                  disabled={!reportType}
                  sx={{ mt: 2 }}
                >
                  Generate Custom Report
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;
