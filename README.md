# Portfolio Backend Platform

Production-ready MERN backend for high-end portfolio websites. Built with Clean Architecture, strict TypeScript, and modular design.

## Features

- **Modular Architecture**: Feature-based organization (Contact, Admin, Email).
- **Security**: RBAC, JWT Auth, Helmet, Rate Limiting, Sanitization.
- **Validation**: Zod schema validation for all inputs.
- **Observability**: Structured JSON logging (Winston) & Request logging (Morgan).
- **Scalability**: Interface-based service injection.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript (Strict)
- **Database**: MongoDB (Mongoose)
- **Validation**: Zod
- **Logging**: Winston

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment:
    Copy `.env.example` to `.env` and update values.
    ```bash
    cp .env.example .env
    ```

### Running the App

- **Development**:
  ```bash
  npm run dev
  ```
- **Production Build**:
  ```bash
  npm run build
  npm start
  ```

## API Documentation

### Admin Auth

- `POST /api/v1/admin/register` - Create new admin
- `POST /api/v1/admin/login` - Login to get JWT

### Contact

- `POST /api/v1/contact` - Submit contact form (Public)
- `GET /api/v1/contact/admin` - List messages (Admin Only)

## Project Structure

Standard Clean Architecture layers:

- `modules/`: Feature slices (Controller, Service, Repository, Model).
- `shared/`: Common base classes and utilities.
