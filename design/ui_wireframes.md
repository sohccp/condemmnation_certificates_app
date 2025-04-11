# User Interface Wireframes for Condemnation Certificate App

## Overview
This document outlines the user interface wireframes for the Surgical Instrument Condemnation Certificate application. The wireframes represent the key screens and user flows in the application.

## Login Screen

```
+------------------------------------------+
|                                          |
|                                          |
|              [HOSPITAL LOGO]             |
|                                          |
|        Surgical Instrument Condemnation  |
|             Certificate System           |
|                                          |
|  +----------------------------------+    |
|  | Username                         |    |
|  +----------------------------------+    |
|                                          |
|  +----------------------------------+    |
|  | Password                         |    |
|  +----------------------------------+    |
|                                          |
|  +----------------------------------+    |
|  |             LOGIN                |    |
|  +----------------------------------+    |
|                                          |
|  Forgot password?                        |
|                                          |
+------------------------------------------+
```

## Dashboard

```
+------------------------------------------+
| LOGO  Condemnation Certificate System    |
+------------------------------------------+
| [User: John Doe] [Role: Technician] [Logout]
+------------------------------------------+
| Dashboard | Instruments | Certificates | Reports
+------------------------------------------+
|                                          |
|  SUMMARY                                 |
|  +----------------+ +----------------+   |
|  | Pending        | | Approved       |   |
|  | Certificates   | | Certificates   |   |
|  |                | |                |   |
|  |      12        | |      45        |   |
|  +----------------+ +----------------+   |
|  +----------------+ +----------------+   |
|  | Rejected       | | Completed      |   |
|  | Certificates   | | Certificates   |   |
|  |                | |                |   |
|  |       3        | |      78        |   |
|  +----------------+ +----------------+   |
|                                          |
|  RECENT ACTIVITY                         |
|  +------------------------------------+  |
|  | Date       | Action    | Status    |  |
|  |-----------+----------+-----------|  |
|  | 2025-04-05 | Created   | Pending   |  |
|  | 2025-04-04 | Approved  | Approved  |  |
|  | 2025-04-03 | Completed | Completed |  |
|  | 2025-04-02 | Rejected  | Rejected  |  |
|  +------------------------------------+  |
|                                          |
|  [View All]                              |
|                                          |
+------------------------------------------+
```

## Instruments List

```
+------------------------------------------+
| LOGO  Condemnation Certificate System    |
+------------------------------------------+
| [User: John Doe] [Role: Technician] [Logout]
+------------------------------------------+
| Dashboard | Instruments | Certificates | Reports
+------------------------------------------+
|                                          |
|  INSTRUMENTS                             |
|  [+ Add New Instrument]  [Search: ____] |
|                                          |
|  Department: [All Departments ▼]         |
|  Status: [All Statuses ▼]                |
|                                          |
|  +------------------------------------+  |
|  | Asset Name | Code  | Department | Status |
|  |-----------+------+-----------+-------|
|  | Scalpel #10| SC001 | Surgery   | Active |
|  | Forceps    | FR002 | Surgery   | Active |
|  | Retractor  | RT003 | Surgery   | Under Repair |
|  | Scissors   | SC004 | Surgery   | Condemned |
|  +------------------------------------+  |
|                                          |
|  [< Prev]  Page 1 of 5  [Next >]        |
|                                          |
+------------------------------------------+
```

## Instrument Details

```
+------------------------------------------+
| LOGO  Condemnation Certificate System    |
+------------------------------------------+
| [User: John Doe] [Role: Technician] [Logout]
+------------------------------------------+
| Dashboard | Instruments | Certificates | Reports
+------------------------------------------+
|                                          |
|  INSTRUMENT DETAILS                      |
|  [Edit]  [Condemn]  [Back to List]      |
|                                          |
|  Asset Name: Scalpel #10                 |
|  Asset Code: SC001                       |
|  Manufacturer: Surgical Co.              |
|  Model: SCP-10                           |
|  Serial Number: 12345678                 |
|  Category: Cutting Instrument            |
|  Purchase Date: 2023-01-15               |
|  Cost: $150.00                           |
|  Department: Surgery                     |
|  Status: Active                          |
|  Last Maintenance: 2025-02-10            |
|                                          |
|  MAINTENANCE HISTORY                     |
|  +------------------------------------+  |
|  | Date       | Type      | Performed By |
|  |-----------+----------+--------------|  |
|  | 2025-02-10 | Routine   | Jane Smith   |  |
|  | 2024-08-15 | Repair    | Mike Johnson |  |
|  | 2024-02-20 | Routine   | Jane Smith   |  |
|  +------------------------------------+  |
|                                          |
+------------------------------------------+
```

## New Condemnation Certificate

```
+------------------------------------------+
| LOGO  Condemnation Certificate System    |
+------------------------------------------+
| [User: John Doe] [Role: Technician] [Logout]
+------------------------------------------+
| Dashboard | Instruments | Certificates | Reports
+------------------------------------------+
|                                          |
|  NEW CONDEMNATION CERTIFICATE            |
|  [Back to Instrument]                    |
|                                          |
|  Instrument: Scalpel #10 (SC001)         |
|  Department: Surgery                     |
|                                          |
|  DECONTAMINATION INFORMATION             |
|  Decontamination Method:                 |
|  [________________________]              |
|  Decontamination Date:                   |
|  [__/__/____]                            |
|                                          |
|  CONDEMNATION REASON                     |
|  Reason: [Select Reason ▼]               |
|  Details:                                |
|  +----------------------------------+    |
|  |                                  |    |
|  |                                  |    |
|  +----------------------------------+    |
|                                          |
|  Additional Notes:                       |
|  +----------------------------------+    |
|  |                                  |    |
|  |                                  |    |
|  +----------------------------------+    |
|                                          |
|  [Cancel]  [Save as Draft]  [Submit]     |
|                                          |
+------------------------------------------+
```

## Certificates List

```
+------------------------------------------+
| LOGO  Condemnation Certificate System    |
+------------------------------------------+
| [User: John Doe] [Role: Technician] [Logout]
+------------------------------------------+
| Dashboard | Instruments | Certificates | Reports
+------------------------------------------+
|                                          |
|  CONDEMNATION CERTIFICATES               |
|  [+ New Certificate]  [Search: ____]    |
|                                          |
|  Status: [All Statuses ▼]                |
|  Department: [All Departments ▼]         |
|  Date Range: [__/__/____] to [__/__/____]|
|                                          |
|  +------------------------------------+  |
|  | Cert# | Instrument | Dept | Status | Date |
|  |------+----------+-----+-------+------|
|  | C001 | Scalpel #10| Surgery | Pending | 2025-04-05 |
|  | C002 | Forceps    | Surgery | Approved | 2025-04-04 |
|  | C003 | Scissors   | Surgery | Completed | 2025-04-03 |
|  | C004 | Retractor  | Surgery | Rejected | 2025-04-02 |
|  +------------------------------------+  |
|                                          |
|  [< Prev]  Page 1 of 5  [Next >]        |
|                                          |
+------------------------------------------+
```

## Certificate Details

```
+------------------------------------------+
| LOGO  Condemnation Certificate System    |
+------------------------------------------+
| [User: John Doe] [Role: Technician] [Logout]
+------------------------------------------+
| Dashboard | Instruments | Certificates | Reports
+------------------------------------------+
|                                          |
|  CERTIFICATE DETAILS                     |
|  [Download PDF]  [Back to List]          |
|                                          |
|  Certificate #: C001                     |
|  Status: Pending                         |
|                                          |
|  INSTRUMENT INFORMATION                  |
|  Asset Name: Scalpel #10                 |
|  Asset Code: SC001                       |
|  Manufacturer: Surgical Co.              |
|  Model: SCP-10                           |
|  Serial Number: 12345678                 |
|  Department: Surgery                     |
|                                          |
|  CONDEMNATION DETAILS                    |
|  Initiated By: John Doe                  |
|  Initiated Date: 2025-04-05              |
|  Decontamination Method: Autoclave       |
|  Decontamination Date: 2025-04-05        |
|  Reason: Beyond Economical Repair        |
|  Details: The instrument is damaged...   |
|                                          |
|  APPROVAL WORKFLOW                       |
|  +------------------------------------+  |
|  | Role          | Status    | Date      |
|  |--------------+----------+-----------|  |
|  | Dept Head     | Pending   | -         |  |
|  | Biomed Eng    | Pending   | -         |  |
|  | Auth Officer  | Pending   | -         |  |
|  +------------------------------------+  |
|                                          |
|  [Approve]  [Reject]                     |
|                                          |
+------------------------------------------+
```

## Approval/Rejection Dialog

```
+------------------------------------------+
|                                          |
|  APPROVE CERTIFICATE                     |
|                                          |
|  Certificate #: C001                     |
|  Instrument: Scalpel #10 (SC001)         |
|                                          |
|  Comments:                               |
|  +----------------------------------+    |
|  |                                  |    |
|  |                                  |    |
|  +----------------------------------+    |
|                                          |
|  [Cancel]  [Confirm Approval]            |
|                                          |
+------------------------------------------+
```

## Reports Dashboard

```
+------------------------------------------+
| LOGO  Condemnation Certificate System    |
+------------------------------------------+
| [User: John Doe] [Role: Technician] [Logout]
+------------------------------------------+
| Dashboard | Instruments | Certificates | Reports
+------------------------------------------+
|                                          |
|  REPORTS                                 |
|                                          |
|  +----------------+ +----------------+   |
|  | Condemned      | | Pending        |   |
|  | Instruments    | | Approvals      |   |
|  | Report         | | Report         |   |
|  |                | |                |   |
|  | [Generate]     | | [Generate]     |   |
|  +----------------+ +----------------+   |
|  +----------------+ +----------------+   |
|  | Department     | | Condemnation   |   |
|  | Summary        | | Reasons        |   |
|  | Report         | | Report         |   |
|  |                | |                |   |
|  | [Generate]     | | [Generate]     |   |
|  +----------------+ +----------------+   |
|                                          |
|  CUSTOM REPORT                           |
|                                          |
|  Report Type: [Select Report Type ▼]     |
|  Date Range: [__/__/____] to [__/__/____]|
|  Department: [All Departments ▼]         |
|  Format: [PDF ▼]                         |
|                                          |
|  [Generate Custom Report]                |
|                                          |
+------------------------------------------+
```

## Mobile View - Dashboard

```
+---------------------------+
| Condemnation Certificates |
+---------------------------+
| [≡ Menu]      [User ▼]   |
+---------------------------+
|                           |
|  SUMMARY                  |
|  +----------+ +--------+ |
|  | Pending  | | Approved| |
|  |    12    | |   45    | |
|  +----------+ +--------+ |
|  +----------+ +--------+ |
|  | Rejected | |Completed| |
|  |     3    | |   78    | |
|  +----------+ +--------+ |
|                           |
|  RECENT ACTIVITY          |
|  +---------------------+  |
|  | 2025-04-05 | Created |  |
|  | 2025-04-04 | Approved|  |
|  | 2025-04-03 |Completed|  |
|  +---------------------+  |
|                           |
|  [View All]               |
|                           |
+---------------------------+
```

## Mobile View - Navigation Menu

```
+---------------------------+
| [X] Menu                  |
+---------------------------+
|                           |
|  [User: John Doe]         |
|  [Role: Technician]       |
|                           |
|  [Dashboard]              |
|  [Instruments]            |
|  [Certificates]           |
|  [Reports]                |
|                           |
|  [Settings]               |
|  [Help]                   |
|  [Logout]                 |
|                           |
+---------------------------+
```

## Mobile View - Certificate Form

```
+---------------------------+
| New Certificate           |
+---------------------------+
| [< Back]                  |
+---------------------------+
|                           |
|  Instrument:              |
|  Scalpel #10 (SC001)      |
|                           |
|  Decontamination Method:  |
|  [___________________]    |
|                           |
|  Decontamination Date:    |
|  [__/__/____]             |
|                           |
|  Reason:                  |
|  [Select Reason ▼]        |
|                           |
|  Details:                 |
|  [___________________]    |
|  [___________________]    |
|  [___________________]    |
|                           |
|  Notes:                   |
|  [___________________]    |
|  [___________________]    |
|                           |
|  [Cancel] [Submit]        |
|                           |
+---------------------------+
```

These wireframes provide a comprehensive view of the user interface for the Surgical Instrument Condemnation Certificate application, covering all major screens and user interactions. The design is responsive and will adapt to both desktop and mobile views.
