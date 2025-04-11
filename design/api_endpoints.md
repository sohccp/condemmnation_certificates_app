# API Endpoints for Condemnation Certificate App

## Overview
This document outlines the API endpoints for the Surgical Instrument Condemnation Certificate application. These endpoints will serve as the interface between the frontend and backend components of the application.

## Base URL
All endpoints will be prefixed with `/api/v1`

## Authentication Endpoints

### POST /auth/login
- **Description**: Authenticate a user and return a JWT token
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "token": "string",
    "user": {
      "id": "integer",
      "username": "string",
      "full_name": "string",
      "email": "string",
      "role": "string",
      "department": "string"
    }
  }
  ```

### POST /auth/logout
- **Description**: Invalidate the current user's token
- **Headers**: Authorization: Bearer {token}
- **Response**: 
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### GET /auth/me
- **Description**: Get the current authenticated user's information
- **Headers**: Authorization: Bearer {token}
- **Response**: 
  ```json
  {
    "id": "integer",
    "username": "string",
    "full_name": "string",
    "email": "string",
    "role": "string",
    "department": "string"
  }
  ```

## User Management Endpoints

### GET /users
- **Description**: Get a list of all users (admin only)
- **Headers**: Authorization: Bearer {token}
- **Query Parameters**:
  - page: integer (default: 1)
  - limit: integer (default: 20)
  - role: string (optional)
  - department: string (optional)
- **Response**: 
  ```json
  {
    "total": "integer",
    "page": "integer",
    "limit": "integer",
    "data": [
      {
        "id": "integer",
        "username": "string",
        "full_name": "string",
        "email": "string",
        "role": "string",
        "department": "string",
        "active": "boolean"
      }
    ]
  }
  ```

### POST /users
- **Description**: Create a new user (admin only)
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string",
    "full_name": "string",
    "email": "string",
    "role": "string",
    "department": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "id": "integer",
    "username": "string",
    "full_name": "string",
    "email": "string",
    "role": "string",
    "department": "string"
  }
  ```

### GET /users/{id}
- **Description**: Get a specific user by ID
- **Headers**: Authorization: Bearer {token}
- **Response**: 
  ```json
  {
    "id": "integer",
    "username": "string",
    "full_name": "string",
    "email": "string",
    "role": "string",
    "department": "string",
    "active": "boolean"
  }
  ```

### PUT /users/{id}
- **Description**: Update a specific user
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "full_name": "string",
    "email": "string",
    "role": "string",
    "department": "string",
    "active": "boolean"
  }
  ```
- **Response**: 
  ```json
  {
    "id": "integer",
    "username": "string",
    "full_name": "string",
    "email": "string",
    "role": "string",
    "department": "string",
    "active": "boolean"
  }
  ```

## Department Endpoints

### GET /departments
- **Description**: Get a list of all departments
- **Headers**: Authorization: Bearer {token}
- **Response**: 
  ```json
  {
    "data": [
      {
        "id": "integer",
        "name": "string",
        "description": "string",
        "location": "string",
        "head": {
          "id": "integer",
          "full_name": "string"
        }
      }
    ]
  }
  ```

### POST /departments
- **Description**: Create a new department (admin only)
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "location": "string",
    "head_id": "integer"
  }
  ```
- **Response**: 
  ```json
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "location": "string",
    "head": {
      "id": "integer",
      "full_name": "string"
    }
  }
  ```

## Instrument Endpoints

### GET /instruments
- **Description**: Get a list of all instruments
- **Headers**: Authorization: Bearer {token}
- **Query Parameters**:
  - page: integer (default: 1)
  - limit: integer (default: 20)
  - department_id: integer (optional)
  - status: string (optional)
  - search: string (optional - searches asset_name, asset_code, serial_number)
- **Response**: 
  ```json
  {
    "total": "integer",
    "page": "integer",
    "limit": "integer",
    "data": [
      {
        "id": "integer",
        "asset_name": "string",
        "asset_code": "string",
        "manufacturer": "string",
        "model": "string",
        "serial_number": "string",
        "category": "string",
        "purchase_date": "date",
        "cost": "number",
        "department": {
          "id": "integer",
          "name": "string"
        },
        "status": "string",
        "last_maintenance": "date"
      }
    ]
  }
  ```

### POST /instruments
- **Description**: Create a new instrument
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "asset_name": "string",
    "asset_code": "string",
    "manufacturer": "string",
    "model": "string",
    "serial_number": "string",
    "category": "string",
    "purchase_date": "date",
    "cost": "number",
    "department_id": "integer",
    "last_maintenance": "date"
  }
  ```
- **Response**: 
  ```json
  {
    "id": "integer",
    "asset_name": "string",
    "asset_code": "string",
    "manufacturer": "string",
    "model": "string",
    "serial_number": "string",
    "category": "string",
    "purchase_date": "date",
    "cost": "number",
    "department": {
      "id": "integer",
      "name": "string"
    },
    "status": "string",
    "last_maintenance": "date"
  }
  ```

### GET /instruments/{id}
- **Description**: Get a specific instrument by ID
- **Headers**: Authorization: Bearer {token}
- **Response**: 
  ```json
  {
    "id": "integer",
    "asset_name": "string",
    "asset_code": "string",
    "manufacturer": "string",
    "model": "string",
    "serial_number": "string",
    "category": "string",
    "purchase_date": "date",
    "cost": "number",
    "department": {
      "id": "integer",
      "name": "string"
    },
    "status": "string",
    "last_maintenance": "date"
  }
  ```

## Condemnation Certificate Endpoints

### GET /certificates
- **Description**: Get a list of all condemnation certificates
- **Headers**: Authorization: Bearer {token}
- **Query Parameters**:
  - page: integer (default: 1)
  - limit: integer (default: 20)
  - status: string (optional)
  - department_id: integer (optional)
  - from_date: date (optional)
  - to_date: date (optional)
- **Response**: 
  ```json
  {
    "total": "integer",
    "page": "integer",
    "limit": "integer",
    "data": [
      {
        "id": "integer",
        "certificate_number": "string",
        "instrument": {
          "id": "integer",
          "asset_name": "string",
          "asset_code": "string"
        },
        "initiated_by": {
          "id": "integer",
          "full_name": "string"
        },
        "initiated_date": "timestamp",
        "reason": {
          "code": "string",
          "description": "string"
        },
        "status": "string",
        "completion_date": "timestamp"
      }
    ]
  }
  ```

### POST /certificates
- **Description**: Create a new condemnation certificate
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "instrument_id": "integer",
    "decontamination_method": "string",
    "decontamination_date": "date",
    "reason_code": "string",
    "reason_details": "string",
    "notes": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "id": "integer",
    "certificate_number": "string",
    "instrument": {
      "id": "integer",
      "asset_name": "string",
      "asset_code": "string"
    },
    "initiated_by": {
      "id": "integer",
      "full_name": "string"
    },
    "initiated_date": "timestamp",
    "decontamination_method": "string",
    "decontamination_date": "date",
    "reason": {
      "code": "string",
      "description": "string"
    },
    "reason_details": "string",
    "status": "string",
    "notes": "string"
  }
  ```

### GET /certificates/{id}
- **Description**: Get a specific certificate by ID
- **Headers**: Authorization: Bearer {token}
- **Response**: 
  ```json
  {
    "id": "integer",
    "certificate_number": "string",
    "instrument": {
      "id": "integer",
      "asset_name": "string",
      "asset_code": "string",
      "manufacturer": "string",
      "model": "string",
      "serial_number": "string",
      "category": "string",
      "purchase_date": "date",
      "cost": "number",
      "department": {
        "id": "integer",
        "name": "string"
      }
    },
    "initiated_by": {
      "id": "integer",
      "full_name": "string"
    },
    "initiated_date": "timestamp",
    "decontamination_method": "string",
    "decontamination_date": "date",
    "decontamination_certified_by": {
      "id": "integer",
      "full_name": "string"
    },
    "reason": {
      "code": "string",
      "description": "string"
    },
    "reason_details": "string",
    "department_head_approval": "boolean",
    "department_head": {
      "id": "integer",
      "full_name": "string"
    },
    "department_head_approval_date": "timestamp",
    "biomedical_engineer_approval": "boolean",
    "biomedical_engineer": {
      "id": "integer",
      "full_name": "string"
    },
    "biomedical_engineer_approval_date": "timestamp",
    "final_approval": "boolean",
    "final_approval_by": {
      "id": "integer",
      "full_name": "string"
    },
    "final_approval_date": "timestamp",
    "status": "string",
    "completion_date": "timestamp",
    "notes": "string"
  }
  ```

### PUT /certificates/{id}/approve
- **Description**: Approve a certificate (based on user role)
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "notes": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "id": "integer",
    "certificate_number": "string",
    "status": "string",
    "message": "Certificate approved successfully"
  }
  ```

### PUT /certificates/{id}/reject
- **Description**: Reject a certificate (based on user role)
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "rejection_reason": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "id": "integer",
    "certificate_number": "string",
    "status": "string",
    "message": "Certificate rejected successfully"
  }
  ```

### GET /certificates/{id}/pdf
- **Description**: Generate a PDF version of the certificate
- **Headers**: Authorization: Bearer {token}
- **Response**: PDF file

## Condemnation Reasons Endpoints

### GET /reasons
- **Description**: Get a list of all condemnation reasons
- **Headers**: Authorization: Bearer {token}
- **Response**: 
  ```json
  {
    "data": [
      {
        "id": "integer",
        "code": "string",
        "description": "string",
        "active": "boolean"
      }
    ]
  }
  ```

### POST /reasons
- **Description**: Create a new condemnation reason (admin only)
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "code": "string",
    "description": "string",
    "active": "boolean"
  }
  ```
- **Response**: 
  ```json
  {
    "id": "integer",
    "code": "string",
    "description": "string",
    "active": "boolean"
  }
  ```

## Reports Endpoints

### GET /reports/condemned-instruments
- **Description**: Get a report of condemned instruments
- **Headers**: Authorization: Bearer {token}
- **Query Parameters**:
  - from_date: date (required)
  - to_date: date (required)
  - department_id: integer (optional)
  - reason_code: string (optional)
- **Response**: 
  ```json
  {
    "total_count": "integer",
    "total_cost": "number",
    "by_department": [
      {
        "department": "string",
        "count": "integer",
        "cost": "number"
      }
    ],
    "by_reason": [
      {
        "reason": "string",
        "count": "integer",
        "cost": "number"
      }
    ],
    "data": [
      {
        "certificate_number": "string",
        "asset_name": "string",
        "asset_code": "string",
        "department": "string",
        "reason": "string",
        "completion_date": "timestamp",
        "cost": "number"
      }
    ]
  }
  ```

### GET /reports/pending-approvals
- **Description**: Get a report of certificates pending approval
- **Headers**: Authorization: Bearer {token}
- **Query Parameters**:
  - role: string (optional - department_head, biomedical_engineer, authorizing_officer)
  - department_id: integer (optional)
- **Response**: 
  ```json
  {
    "total_count": "integer",
    "by_department": [
      {
        "department": "string",
        "count": "integer"
      }
    ],
    "by_age": [
      {
        "age_range": "string",
        "count": "integer"
      }
    ],
    "data": [
      {
        "id": "integer",
        "certificate_number": "string",
        "asset_name": "string",
        "department": "string",
        "initiated_date": "timestamp",
        "days_pending": "integer",
        "current_approval_stage": "string"
      }
    ]
  }
  ```

## Audit Log Endpoints

### GET /audit-logs
- **Description**: Get audit logs (admin only)
- **Headers**: Authorization: Bearer {token}
- **Query Parameters**:
  - page: integer (default: 1)
  - limit: integer (default: 20)
  - user_id: integer (optional)
  - action: string (optional)
  - entity_type: string (optional)
  - entity_id: integer (optional)
  - from_date: date (optional)
  - to_date: date (optional)
- **Response**: 
  ```json
  {
    "total": "integer",
    "page": "integer",
    "limit": "integer",
    "data": [
      {
        "id": "integer",
        "user": {
          "id": "integer",
          "username": "string",
          "full_name": "string"
        },
        "action": "string",
        "entity_type": "string",
        "entity_id": "integer",
        "details": "string",
        "ip_address": "string",
        "timestamp": "timestamp"
      }
    ]
  }
  ```

This API design provides a comprehensive set of endpoints to support all the functionality required for the Surgical Instrument Condemnation Certificate application, including user management, instrument tracking, certificate creation and approval workflows, and reporting.
