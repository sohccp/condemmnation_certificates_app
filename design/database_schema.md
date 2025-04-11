# Database Schema for Condemnation Certificate App

## Overview
This document outlines the database schema for the Surgical Instrument Condemnation Certificate application. The schema is designed to store all necessary information for tracking and managing the condemnation process of surgical instruments in a hospital setting.

## Tables

### 1. Users
Stores information about system users with different roles.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique identifier for each user |
| username | VARCHAR(50) | NOT NULL, UNIQUE | Username for login |
| password | VARCHAR(255) | NOT NULL | Hashed password |
| full_name | VARCHAR(100) | NOT NULL | Full name of the user |
| email | VARCHAR(100) | NOT NULL, UNIQUE | Email address |
| role | VARCHAR(20) | NOT NULL | Role (admin, technician, department_head, biomedical_engineer, authorizing_officer) |
| department | VARCHAR(100) | | Department the user belongs to |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation timestamp |
| last_login | TIMESTAMP | | Last login timestamp |
| active | BOOLEAN | DEFAULT TRUE | Whether the account is active |

### 2. Instruments
Stores information about surgical instruments.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique identifier for each instrument |
| asset_name | VARCHAR(100) | NOT NULL | Name of the instrument |
| asset_code | VARCHAR(50) | UNIQUE | Asset code/inventory number |
| manufacturer | VARCHAR(100) | | Manufacturer name |
| model | VARCHAR(100) | | Model number/name |
| serial_number | VARCHAR(100) | | Serial number |
| category | VARCHAR(50) | | Category of instrument |
| purchase_date | DATE | | Date of purchase |
| cost | DECIMAL(10,2) | | Original cost |
| department_id | INTEGER | FOREIGN KEY | Department that owns the instrument |
| status | VARCHAR(20) | DEFAULT 'active' | Current status (active, under_repair, condemned) |
| last_maintenance | DATE | | Date of last maintenance |

### 3. Departments
Stores information about hospital departments.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique identifier for each department |
| name | VARCHAR(100) | NOT NULL, UNIQUE | Department name |
| description | TEXT | | Department description |
| location | VARCHAR(100) | | Physical location in the hospital |
| head_id | INTEGER | FOREIGN KEY | User ID of the department head |

### 4. CondemnationCertificates
Stores information about condemnation certificates.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique identifier for each certificate |
| certificate_number | VARCHAR(50) | NOT NULL, UNIQUE | Certificate reference number |
| instrument_id | INTEGER | FOREIGN KEY, NOT NULL | ID of the instrument being condemned |
| initiated_by | INTEGER | FOREIGN KEY, NOT NULL | User ID of the person initiating condemnation |
| initiated_date | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date when condemnation was initiated |
| decontamination_method | VARCHAR(100) | | Method used for decontamination |
| decontamination_date | DATE | | Date of decontamination |
| decontamination_certified_by | INTEGER | FOREIGN KEY | User ID who certified decontamination |
| reason_code | VARCHAR(20) | NOT NULL | Code for condemnation reason |
| reason_details | TEXT | | Detailed explanation for condemnation |
| department_head_approval | BOOLEAN | DEFAULT FALSE | Whether department head approved |
| department_head_id | INTEGER | FOREIGN KEY | User ID of approving department head |
| department_head_approval_date | TIMESTAMP | | Date of department head approval |
| biomedical_engineer_approval | BOOLEAN | DEFAULT FALSE | Whether biomedical engineer approved |
| biomedical_engineer_id | INTEGER | FOREIGN KEY | User ID of approving biomedical engineer |
| biomedical_engineer_approval_date | TIMESTAMP | | Date of biomedical engineer approval |
| final_approval | BOOLEAN | DEFAULT FALSE | Whether final approval is given |
| final_approval_by | INTEGER | FOREIGN KEY | User ID who gave final approval |
| final_approval_date | TIMESTAMP | | Date of final approval |
| status | VARCHAR(20) | DEFAULT 'pending' | Status (pending, approved, rejected, completed) |
| completion_date | TIMESTAMP | | Date when condemnation process was completed |
| notes | TEXT | | Additional notes |

### 5. CondemnationReasons
Lookup table for standardized condemnation reasons.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique identifier for each reason |
| code | VARCHAR(20) | NOT NULL, UNIQUE | Short code for the reason |
| description | VARCHAR(255) | NOT NULL | Description of the reason |
| active | BOOLEAN | DEFAULT TRUE | Whether this reason is active |

### 6. AuditLogs
Tracks all significant actions in the system.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique identifier for each log entry |
| user_id | INTEGER | FOREIGN KEY | User who performed the action |
| action | VARCHAR(50) | NOT NULL | Type of action performed |
| entity_type | VARCHAR(50) | NOT NULL | Type of entity affected (user, instrument, certificate) |
| entity_id | INTEGER | NOT NULL | ID of the affected entity |
| details | TEXT | | Additional details about the action |
| ip_address | VARCHAR(45) | | IP address from which action was performed |
| timestamp | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When the action occurred |

## Relationships

1. **Users to Departments**: Many-to-One (Many users can belong to one department)
2. **Departments to Users**: One-to-One (One department has one head who is a user)
3. **Instruments to Departments**: Many-to-One (Many instruments can belong to one department)
4. **CondemnationCertificates to Instruments**: One-to-One (One certificate condemns one instrument)
5. **CondemnationCertificates to Users**: Many-to-One (Multiple relationships for different approval roles)
6. **CondemnationCertificates to CondemnationReasons**: Many-to-One (Many certificates can use one reason code)
7. **AuditLogs to Users**: Many-to-One (Many logs can be created by one user)

## Indexes

1. Index on Users(username) for fast login lookups
2. Index on Instruments(asset_code) for fast instrument lookups
3. Index on CondemnationCertificates(certificate_number) for fast certificate lookups
4. Index on CondemnationCertificates(instrument_id) for finding certificates by instrument
5. Index on AuditLogs(user_id, timestamp) for user activity reports
6. Index on AuditLogs(entity_type, entity_id) for entity history tracking

This schema provides a comprehensive structure for managing the entire lifecycle of surgical instrument condemnation certificates while maintaining proper approval workflows and audit trails.
