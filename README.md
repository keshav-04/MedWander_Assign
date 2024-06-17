# Dynamic Forms Application

## Overview

A web application built using SQL, Express, React, and Node.js. Features dynamic forms, form validation, SQL database operations, and external data synchronization.

## Features

- **Dynamic Forms**: Two buttons ("Form A" and "Form B") lead to different forms with the same input fields.
- **Form Validation**: Ensures valid name, country code, and phone number input.
- **Database Integration**: Stores form data in an SQL database.
- **Data Synchronization**: "Refresh" button updates an online Excel sheet with new data.
- **Responsive Design**: UI adapts for mobile and desktop views.
- **Local Storage**: Saves form data locally for persistent entries.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/keshav-04/MedWander_Assign.git
    cd MedWander_Assign
    ```

2. **Backend Setup**:
    ```bash
    cd server
    npm install
    ```
    - Create a `.env` file with:
        ```plaintext
        type=
        project_id=
        private_key_id=
        private_key=
        client_email=
        client_id=
        auth_uri=
        token_uri=
        auth_provider_x509_cert_url=
        client_x509_cert_url=
        universe_domain=
        ```
    - Start the server:
        ```bash
        npm run dev
        ```

3. **Frontend Setup**:
    ```bash
    cd client
    npm install
    npm run dev
    ```

## Usage

1. Open `http://localhost:5173`.
2. Click "Form A" or "Form B" to open the respective form.
3. Fill in and submit the form.
4. Click "Refresh" to sync data with the Excel sheet.
