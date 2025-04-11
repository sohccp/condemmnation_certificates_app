# Surgical Instrument Condemnation Certificate System - User Manual

## Introduction

The Surgical Instrument Condemnation Certificate System is a comprehensive web-based application designed to streamline the process of documenting, approving, and tracking the condemnation of surgical instruments in hospital settings. This system replaces paper-based workflows with a digital solution that ensures proper documentation, approval chains, and regulatory compliance.

## System Overview

The application consists of several key modules:

1. **User Authentication System**: Secure login with role-based access control
2. **Instrument Management**: Track and manage all surgical instruments
3. **Certificate Creation**: Generate condemnation certificates with proper documentation
4. **Approval Workflow**: Multi-step approval process with role-specific permissions
5. **Reporting**: Generate reports on condemned instruments

## Getting Started

### Accessing the System

The system can be accessed in two ways:
- **Web Browser**: Navigate to the system URL provided by your administrator
- **Android App**: Install the APK file on your Android device

### Login

1. Enter your username and password on the login screen
2. The system will authenticate your credentials and direct you to the appropriate dashboard based on your role

## User Roles and Permissions

The system supports the following roles:

| Role | Permissions |
|------|-------------|
| Admin | Full system access, user management, department configuration |
| Department Head | Initiate and approve certificates for their department |
| Biomedical Engineer | Technical assessment and approval of condemnation |
| Authorizing Officer | Final approval of condemnation certificates |
| Staff | View certificates and initiate condemnation requests |

## Dashboard

The dashboard provides an overview of:
- Recent condemnation certificates
- Certificates awaiting your approval
- Summary statistics
- Quick access to common functions

## Instrument Management

### Viewing Instruments

1. Navigate to the "Instruments" section from the sidebar
2. Use filters to search for specific instruments by name, code, department, or status
3. Click on an instrument to view its details

### Adding New Instruments

1. Click "Add New Instrument" button
2. Fill in all required fields:
   - Asset Name
   - Asset Code
   - Manufacturer
   - Model
   - Serial Number
   - Department
   - Purchase Date
   - Cost
3. Click "Save" to add the instrument to the system

## Creating a Condemnation Certificate

### Initiating a Certificate

1. Navigate to "Certificates" > "New Certificate"
2. Select the instrument to be condemned from the dropdown
3. Complete the decontamination information:
   - Decontamination Method
   - Decontamination Date
4. Select the reason for condemnation
5. Provide detailed explanation in the "Reason Details" field
6. Click "Submit" to create the certificate

### Certificate Status

Certificates can have the following statuses:
- **Pending**: Awaiting approval
- **Approved**: All approvals received
- **Rejected**: Certificate rejected by an approver
- **Completed**: Instrument has been physically disposed of

## Approval Process

### Reviewing Certificates

1. Navigate to "Certificates" > "Pending Approval"
2. Review certificates awaiting your approval
3. Click on a certificate to view details

### Approving or Rejecting

1. Review all certificate information
2. For approval: Click "Approve" and add any comments
3. For rejection: Click "Reject", provide a reason, and add comments

## Reports

### Generating Reports

1. Navigate to "Reports" section
2. Select report type:
   - Condemned Instruments by Department
   - Condemnation by Reason
   - Monthly Condemnation Summary
3. Set date range and other filters
4. Click "Generate Report"
5. View on screen or export as PDF/CSV

## Troubleshooting

### Common Issues

1. **Login Problems**:
   - Verify username and password
   - Contact administrator if account is locked

2. **Certificate Not Appearing**:
   - Check that all required fields were completed
   - Verify you have permission to view the certificate

3. **Approval Button Not Available**:
   - Confirm you have the correct role for approval
   - Check if the certificate is in the correct status for your approval

### Support Contact

For technical support, please contact your system administrator or the IT department.

## Appendix

### Glossary of Terms

- **Condemnation**: The process of officially declaring a surgical instrument unfit for use
- **Decontamination**: The process of cleaning and sterilizing instruments before disposal
- **Certificate**: The official document recording the condemnation of an instrument
