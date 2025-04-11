import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';

// Mock data for dashboard
const mockStats = {
  pending: 12,
  approved: 45,
  rejected: 3,
  completed: 78
};

const mockRecentActivity = [
  { id: 1, date: '2025-04-05', action: 'Created', status: 'Pending', certificate: 'C001', instrument: 'Scalpel #10' },
  { id: 2, date: '2025-04-04', action: 'Approved', status: 'Approved', certificate: 'C002', instrument: 'Forceps' },
  { id: 3, date: '2025-04-03', action: 'Completed', status: 'Completed', certificate: 'C003', instrument: 'Scissors' },
  { id: 4, date: '2025-04-02', action: 'Rejected', status: 'Rejected', certificate: 'C004', instrument: 'Retractor' }
];

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <PendingIcon color="warning" sx={{ fontSize: 40 }} />
              <Typography variant="h5" component="div">
                {mockStats.pending}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Certificates
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircleIcon color="info" sx={{ fontSize: 40 }} />
              <Typography variant="h5" component="div">
                {mockStats.approved}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Approved Certificates
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CancelIcon color="error" sx={{ fontSize: 40 }} />
              <Typography variant="h5" component="div">
                {mockStats.rejected}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rejected Certificates
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <DoneAllIcon color="success" sx={{ fontSize: 40 }} />
              <Typography variant="h5" component="div">
                {mockStats.completed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed Certificates
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Activity</Typography>
              <Button variant="outlined" size="small">View All</Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Certificate</TableCell>
                    <TableCell>Instrument</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockRecentActivity.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.certificate}</TableCell>
                      <TableCell>{row.instrument}</TableCell>
                      <TableCell>{row.action}</TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
