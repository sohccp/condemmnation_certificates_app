# Technical Documentation - Surgical Instrument Condemnation Certificate System

## Architecture Overview

The Surgical Instrument Condemnation Certificate System is built using a modern web application architecture with the following components:

1. **Frontend**: React-based single-page application (SPA) with Material UI
2. **Backend**: Node.js REST API with Express.js
3. **Database**: MongoDB document database
4. **Mobile Access**: Android application packaged using Capacitor

### System Architecture Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Web Browser    │     │  Android App    │     │  Admin Panel    │
│  (React SPA)    │     │  (Capacitor)    │     │  (React SPA)    │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                     REST API (Express.js)                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                     Business Logic Layer                        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                     Data Access Layer                           │
│                                                                 │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 │
                                 ▼
                       ┌─────────────────────┐
                       │                     │
                       │      MongoDB        │
                       │                     │
                       └─────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 18.x
- **UI Library**: Material UI 5.x
- **State Management**: React Context API
- **Form Handling**: Formik with Yup validation
- **HTTP Client**: Axios
- **Routing**: React Router 6.x
- **Build Tool**: Webpack 5.x

### Backend
- **Runtime**: Node.js 16.x
- **Framework**: Express.js 4.x
- **Authentication**: JSON Web Tokens (JWT)
- **Database ODM**: Mongoose 6.x
- **Validation**: Express Validator
- **Logging**: Morgan

### Database
- **DBMS**: MongoDB 4.x
- **Schema Design**: Document-based with references

### Mobile
- **Framework**: Capacitor 5.x
- **Platform**: Android 8.0+

## Code Structure

### Frontend Structure

```
frontend/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── auth/            # Authentication components
│   │   └── layout/          # Layout components
│   ├── context/             # React context providers
│   ├── pages/               # Page components
│   │   ├── certificates/    # Certificate-related pages
│   │   ├── instruments/     # Instrument-related pages
│   │   └── reports/         # Reporting pages
│   ├── App.js               # Main application component
│   └── index.js             # Application entry point
├── capacitor.config.json    # Capacitor configuration
├── package.json             # Dependencies and scripts
└── webpack.config.js        # Webpack configuration
```

### Backend Structure

```
backend/
├── src/
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Express middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API route definitions
│   ├── utils/               # Utility functions
│   └── server.js            # Server entry point
├── .env                     # Environment variables
└── package.json             # Dependencies and scripts
```

## Database Schema

### Collections and Relationships

#### Users Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  fullName: String,
  role: String (enum),
  department: ObjectId (ref: 'Department'),
  lastLogin: Date,
  createdAt: Date
}
```

#### Departments Collection
```javascript
{
  _id: ObjectId,
  name: String,
  code: String,
  description: String,
  head: ObjectId (ref: 'User'),
  createdAt: Date
}
```

#### Instruments Collection
```javascript
{
  _id: ObjectId,
  assetName: String,
  assetCode: String,
  manufacturer: String,
  model: String,
  serialNumber: String,
  department: ObjectId (ref: 'Department'),
  purchaseDate: Date,
  cost: Number,
  status: String (enum),
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date
}
```

#### CondemnationReasons Collection
```javascript
{
  _id: ObjectId,
  code: String,
  description: String,
  active: Boolean,
  createdAt: Date
}
```

#### Certificates Collection
```javascript
{
  _id: ObjectId,
  certificateNumber: String,
  instrument: ObjectId (ref: 'Instrument'),
  initiatedBy: ObjectId (ref: 'User'),
  initiatedDate: Date,
  decontaminationMethod: String,
  decontaminationDate: Date,
  reason: ObjectId (ref: 'CondemnationReason'),
  reasonDetails: String,
  status: String (enum),
  approvalWorkflow: [
    {
      role: String,
      status: String (enum),
      user: ObjectId (ref: 'User'),
      date: Date,
      comments: String
    }
  ],
  notes: String,
  completedDate: Date
}
```

#### AuditLogs Collection
```javascript
{
  _id: ObjectId,
  action: String,
  entityType: String (enum),
  entityId: ObjectId,
  user: ObjectId (ref: 'User'),
  details: Object,
  timestamp: Date,
  ipAddress: String
}
```

## Authentication and Authorization

### Authentication Flow

1. **User Registration**:
   - User submits registration form with username, email, password, and personal details
   - Password is hashed using bcrypt
   - User record is created in the database
   - JWT token is generated and returned

2. **User Login**:
   - User submits username and password
   - System verifies credentials against database
   - If valid, JWT token is generated and returned
   - Last login timestamp is updated

3. **Token Validation**:
   - JWT token is included in Authorization header for protected routes
   - Middleware validates token signature and expiration
   - User information is attached to request object

### Authorization System

The application implements role-based access control (RBAC) with the following roles:

1. **Admin**: Full system access
2. **Department Head**: Department-specific access and first-level approval
3. **Biomedical Engineer**: Technical assessment and second-level approval
4. **Authorizing Officer**: Final approval authority
5. **Staff**: Basic access for initiating certificates

Authorization is enforced through middleware that checks the user's role against the required roles for each endpoint.

## API Design

### RESTful Endpoints

The API follows RESTful principles with the following main resource endpoints:

- `/api/v1/auth`: Authentication endpoints
- `/api/v1/departments`: Department management
- `/api/v1/instruments`: Instrument management
- `/api/v1/reasons`: Condemnation reason management
- `/api/v1/certificates`: Certificate management

Each resource supports standard CRUD operations where appropriate.

### Request/Response Format

All API responses follow a consistent format:

```javascript
// Success response
{
  "success": true,
  "data": { ... }
}

// Error response
{
  "success": false,
  "error": "Error message"
}
```

### Error Handling

The API implements centralized error handling through middleware that:

1. Captures Mongoose validation errors
2. Handles duplicate key errors
3. Processes invalid ObjectId errors
4. Manages custom application errors
5. Provides appropriate HTTP status codes

## Frontend Implementation

### Component Architecture

The frontend follows a component-based architecture with:

1. **Layout Components**: Header, Sidebar, Layout wrapper
2. **Page Components**: Dashboard, Lists, Details, Forms
3. **Reusable UI Components**: Buttons, Cards, Tables, Modals

### State Management

Application state is managed using React Context API with the following contexts:

1. **AuthContext**: User authentication state and methods
2. **AlertContext**: Application-wide notifications
3. **ThemeContext**: UI theme preferences

### Routing

React Router is used for client-side routing with the following route structure:

- `/login`: Authentication page
- `/dashboard`: Main dashboard
- `/instruments`: Instrument management
- `/certificates`: Certificate management
- `/reports`: Reporting interface
- `/settings`: User and system settings

Protected routes are implemented using a higher-order component that verifies authentication status.

## Mobile Application

### Capacitor Integration

The web application is packaged for Android using Capacitor with the following configuration:

1. **Native Shell**: Android application wrapper
2. **Web Content**: Built React application
3. **Configuration**: capacitor.config.json settings

### Native Features

The mobile application leverages the following native features:

1. **Camera Access**: For capturing images of instruments
2. **File System**: For storing certificates offline
3. **Push Notifications**: For approval workflow alerts
4. **Biometric Authentication**: For secure login

## Security Considerations

### Data Protection

1. **Password Security**:
   - Passwords are hashed using bcrypt with appropriate salt rounds
   - Password reset uses secure tokens with expiration

2. **API Security**:
   - JWT tokens with appropriate expiration
   - HTTPS for all communications
   - Input validation on all endpoints

3. **Database Security**:
   - Principle of least privilege for database access
   - No direct exposure of database identifiers to clients
   - Sanitization of all database inputs

### Audit Trail

The system maintains a comprehensive audit trail that records:

1. User authentication events
2. Certificate creation and updates
3. Approval actions
4. System configuration changes

Each audit record includes the user, timestamp, IP address, and action details.

## Performance Optimization

### Backend Optimizations

1. **Database Indexing**:
   - Indexes on frequently queried fields
   - Compound indexes for common query patterns

2. **Query Optimization**:
   - Selective field projection
   - Pagination for large result sets
   - Efficient use of MongoDB aggregation pipeline

### Frontend Optimizations

1. **Bundle Size Reduction**:
   - Code splitting for route-based chunking
   - Tree shaking to eliminate unused code
   - Compression of static assets

2. **Rendering Performance**:
   - Memoization of expensive computations
   - Virtualized lists for large data sets
   - Lazy loading of components and images

## Testing Strategy

### Backend Testing

1. **Unit Tests**:
   - Controller function testing
   - Model validation testing
   - Utility function testing

2. **Integration Tests**:
   - API endpoint testing
   - Database interaction testing
   - Authentication flow testing

3. **Performance Tests**:
   - Load testing for concurrent users
   - Response time benchmarking

### Frontend Testing

1. **Component Tests**:
   - Rendering tests
   - User interaction tests
   - State management tests

2. **End-to-End Tests**:
   - User flow testing
   - Form submission testing
   - Navigation testing

## Deployment Architecture

### Production Environment

The recommended production deployment architecture is:

1. **Web Server**: Nginx for static content and reverse proxy
2. **Application Server**: Node.js with PM2 process manager
3. **Database**: MongoDB replica set for redundancy
4. **Load Balancer**: For horizontal scaling of application servers
5. **CDN**: For static asset delivery

### Scaling Considerations

The application is designed to scale horizontally with:

1. **Stateless Backend**: No session state stored on servers
2. **Database Sharding**: For large data volumes
3. **Caching Layer**: Redis for frequently accessed data
4. **Microservices Potential**: Architecture allows for future decomposition

## Maintenance and Monitoring

### Logging

The system implements comprehensive logging:

1. **Application Logs**: Express request/response logging
2. **Error Logs**: Detailed error tracking
3. **Audit Logs**: User and system actions

### Monitoring

Recommended monitoring setup:

1. **Health Checks**: Endpoint for system health verification
2. **Performance Metrics**: Response times, database query times
3. **Resource Utilization**: CPU, memory, disk usage
4. **Error Tracking**: Aggregation of application errors

## Future Enhancements

Potential future enhancements include:

1. **Advanced Reporting**: Business intelligence dashboard
2. **Integration**: With inventory management systems
3. **Workflow Customization**: Configurable approval workflows
4. **Offline Support**: Enhanced capabilities for mobile app
5. **Machine Learning**: Predictive maintenance for instruments

