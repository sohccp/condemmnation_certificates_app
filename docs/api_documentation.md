# API Documentation - Surgical Instrument Condemnation Certificate System

## Overview

This document provides detailed information about the RESTful API endpoints available in the Surgical Instrument Condemnation Certificate System. The API allows for programmatic interaction with the system's core functionality including user authentication, instrument management, certificate creation, and approval workflows.

## Base URL

All API endpoints are relative to the base URL:
```
https://[your-domain]/api/v1
```

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. To access protected endpoints, include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

### Obtaining a Token

#### Register a New User

```
POST /auth/register
```

Request Body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "fullName": "string",
  "role": "string",
  "department": "string" // Optional, MongoDB ObjectId
}
```

Response:
```json
{
  "success": true,
  "token": "string"
}
```

#### Login

```
POST /auth/login
```

Request Body:
```json
{
  "username": "string",
  "password": "string"
}
```

Response:
```json
{
  "success": true,
  "token": "string"
}
```

## User Management

### Get Current User

```
GET /auth/me
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "username": "string",
    "email": "string",
    "fullName": "string",
    "role": "string",
    "department": "string", // MongoDB ObjectId
    "lastLogin": "date"
  }
}
```

## Department Management

### Get All Departments

```
GET /departments
```

Response:
```json
{
  "success": true,
  "count": "number",
  "data": [
    {
      "_id": "string",
      "name": "string",
      "code": "string",
      "description": "string",
      "head": {
        "_id": "string",
        "fullName": "string"
      }
    }
  ]
}
```

### Get Single Department

```
GET /departments/:id
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "name": "string",
    "code": "string",
    "description": "string",
    "head": {
      "_id": "string",
      "fullName": "string"
    }
  }
}
```

### Create Department

```
POST /departments
```

Request Body:
```json
{
  "name": "string",
  "code": "string",
  "description": "string",
  "head": "string" // Optional, MongoDB ObjectId
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "name": "string",
    "code": "string",
    "description": "string",
    "createdAt": "date"
  }
}
```

### Update Department

```
PUT /departments/:id
```

Request Body:
```json
{
  "name": "string",
  "code": "string",
  "description": "string",
  "head": "string" // Optional, MongoDB ObjectId
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "name": "string",
    "code": "string",
    "description": "string",
    "head": "string" // MongoDB ObjectId
  }
}
```

### Delete Department

```
DELETE /departments/:id
```

Response:
```json
{
  "success": true,
  "data": {}
}
```

## Instrument Management

### Get All Instruments

```
GET /instruments
```

Query Parameters:
- `select`: Comma-separated fields to include
- `sort`: Field to sort by (prefix with - for descending)
- `page`: Page number
- `limit`: Results per page
- Additional filter parameters (e.g., status, department)

Response:
```json
{
  "success": true,
  "count": "number",
  "pagination": {
    "next": {
      "page": "number",
      "limit": "number"
    },
    "prev": {
      "page": "number",
      "limit": "number"
    }
  },
  "data": [
    {
      "_id": "string",
      "assetName": "string",
      "assetCode": "string",
      "manufacturer": "string",
      "model": "string",
      "serialNumber": "string",
      "department": {
        "_id": "string",
        "name": "string"
      },
      "purchaseDate": "date",
      "cost": "number",
      "status": "string",
      "createdAt": "date"
    }
  ]
}
```

### Get Single Instrument

```
GET /instruments/:id
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "assetName": "string",
    "assetCode": "string",
    "manufacturer": "string",
    "model": "string",
    "serialNumber": "string",
    "department": {
      "_id": "string",
      "name": "string"
    },
    "purchaseDate": "date",
    "cost": "number",
    "status": "string",
    "createdAt": "date"
  }
}
```

### Create Instrument

```
POST /instruments
```

Request Body:
```json
{
  "assetName": "string",
  "assetCode": "string",
  "manufacturer": "string",
  "model": "string",
  "serialNumber": "string",
  "department": "string", // MongoDB ObjectId
  "purchaseDate": "date",
  "cost": "number",
  "status": "string"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "assetName": "string",
    "assetCode": "string",
    "manufacturer": "string",
    "model": "string",
    "serialNumber": "string",
    "department": "string", // MongoDB ObjectId
    "purchaseDate": "date",
    "cost": "number",
    "status": "string",
    "createdBy": "string", // MongoDB ObjectId
    "createdAt": "date"
  }
}
```

### Update Instrument

```
PUT /instruments/:id
```

Request Body:
```json
{
  "assetName": "string",
  "assetCode": "string",
  "manufacturer": "string",
  "model": "string",
  "serialNumber": "string",
  "department": "string", // MongoDB ObjectId
  "purchaseDate": "date",
  "cost": "number",
  "status": "string"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "assetName": "string",
    "assetCode": "string",
    "manufacturer": "string",
    "model": "string",
    "serialNumber": "string",
    "department": "string", // MongoDB ObjectId
    "purchaseDate": "date",
    "cost": "number",
    "status": "string"
  }
}
```

### Delete Instrument

```
DELETE /instruments/:id
```

Response:
```json
{
  "success": true,
  "data": {}
}
```

## Condemnation Reasons

### Get All Reasons

```
GET /reasons
```

Response:
```json
{
  "success": true,
  "count": "number",
  "data": [
    {
      "_id": "string",
      "code": "string",
      "description": "string",
      "active": "boolean",
      "createdAt": "date"
    }
  ]
}
```

### Get Single Reason

```
GET /reasons/:id
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "code": "string",
    "description": "string",
    "active": "boolean",
    "createdAt": "date"
  }
}
```

### Create Reason

```
POST /reasons
```

Request Body:
```json
{
  "code": "string",
  "description": "string",
  "active": "boolean"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "code": "string",
    "description": "string",
    "active": "boolean",
    "createdAt": "date"
  }
}
```

### Update Reason

```
PUT /reasons/:id
```

Request Body:
```json
{
  "code": "string",
  "description": "string",
  "active": "boolean"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "code": "string",
    "description": "string",
    "active": "boolean"
  }
}
```

### Delete Reason

```
DELETE /reasons/:id
```

Response:
```json
{
  "success": true,
  "data": {}
}
```

## Certificate Management

### Get All Certificates

```
GET /certificates
```

Query Parameters:
- `select`: Comma-separated fields to include
- `sort`: Field to sort by (prefix with - for descending)
- `page`: Page number
- `limit`: Results per page
- Additional filter parameters (e.g., status, department)

Response:
```json
{
  "success": true,
  "count": "number",
  "pagination": {
    "next": {
      "page": "number",
      "limit": "number"
    },
    "prev": {
      "page": "number",
      "limit": "number"
    }
  },
  "data": [
    {
      "_id": "string",
      "certificateNumber": "string",
      "instrument": {
        "_id": "string",
        "assetName": "string",
        "assetCode": "string",
        "department": {
          "_id": "string",
          "name": "string"
        }
      },
      "initiatedBy": {
        "_id": "string",
        "fullName": "string"
      },
      "initiatedDate": "date",
      "decontaminationMethod": "string",
      "decontaminationDate": "date",
      "reason": {
        "_id": "string",
        "code": "string",
        "description": "string"
      },
      "reasonDetails": "string",
      "status": "string",
      "approvalWorkflow": [
        {
          "role": "string",
          "status": "string",
          "user": "string", // MongoDB ObjectId
          "date": "date",
          "comments": "string"
        }
      ]
    }
  ]
}
```

### Get Single Certificate

```
GET /certificates/:id
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "certificateNumber": "string",
    "instrument": {
      "_id": "string",
      "assetName": "string",
      "assetCode": "string",
      "manufacturer": "string",
      "model": "string",
      "serialNumber": "string",
      "department": {
        "_id": "string",
        "name": "string"
      }
    },
    "initiatedBy": {
      "_id": "string",
      "fullName": "string"
    },
    "initiatedDate": "date",
    "decontaminationMethod": "string",
    "decontaminationDate": "date",
    "reason": {
      "_id": "string",
      "code": "string",
      "description": "string"
    },
    "reasonDetails": "string",
    "status": "string",
    "approvalWorkflow": [
      {
        "role": "string",
        "status": "string",
        "user": {
          "_id": "string",
          "fullName": "string"
        },
        "date": "date",
        "comments": "string"
      }
    ],
    "notes": "string",
    "completedDate": "date"
  }
}
```

### Create Certificate

```
POST /certificates
```

Request Body:
```json
{
  "instrument": "string", // MongoDB ObjectId
  "decontaminationMethod": "string",
  "decontaminationDate": "date",
  "reason": "string", // MongoDB ObjectId
  "reasonDetails": "string",
  "notes": "string" // Optional
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "certificateNumber": "string",
    "instrument": "string", // MongoDB ObjectId
    "initiatedBy": "string", // MongoDB ObjectId
    "initiatedDate": "date",
    "decontaminationMethod": "string",
    "decontaminationDate": "date",
    "reason": "string", // MongoDB ObjectId
    "reasonDetails": "string",
    "status": "string",
    "approvalWorkflow": [
      {
        "role": "string",
        "status": "string",
        "_id": "string"
      }
    ],
    "notes": "string"
  }
}
```

### Update Certificate

```
PUT /certificates/:id
```

Request Body:
```json
{
  "decontaminationMethod": "string",
  "decontaminationDate": "date",
  "reason": "string", // MongoDB ObjectId
  "reasonDetails": "string",
  "notes": "string"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "certificateNumber": "string",
    "instrument": "string", // MongoDB ObjectId
    "initiatedBy": "string", // MongoDB ObjectId
    "initiatedDate": "date",
    "decontaminationMethod": "string",
    "decontaminationDate": "date",
    "reason": "string", // MongoDB ObjectId
    "reasonDetails": "string",
    "status": "string",
    "approvalWorkflow": [
      {
        "role": "string",
        "status": "string",
        "user": "string", // MongoDB ObjectId
        "date": "date",
        "comments": "string"
      }
    ],
    "notes": "string"
  }
}
```

### Approve Certificate

```
PUT /certificates/:id/approve
```

Request Body:
```json
{
  "comments": "string" // Optional
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "certificateNumber": "string",
    "status": "string",
    "approvalWorkflow": [
      {
        "role": "string",
        "status": "string",
        "user": "string", // MongoDB ObjectId
        "date": "date",
        "comments": "string"
      }
    ]
  }
}
```

### Reject Certificate

```
PUT /certificates/:id/reject
```

Request Body:
```json
{
  "comments": "string" // Required
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "certificateNumber": "string",
    "status": "string",
    "approvalWorkflow": [
      {
        "role": "string",
        "status": "string",
        "user": "string", // MongoDB ObjectId
        "date": "date",
        "comments": "string"
      }
    ]
  }
}
```

### Complete Certificate

```
PUT /certificates/:id/complete
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "certificateNumber": "string",
    "status": "string",
    "completedDate": "date"
  }
}
```

### Delete Certificate

```
DELETE /certificates/:id
```

Response:
```json
{
  "success": true,
  "data": {}
}
```

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "error": "Error message"
}
```

Common HTTP status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

