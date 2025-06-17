# NestJS Articles API

A simple RESTful API built with **NestJS**, **MongoDB**, and **JWT authentication**. It manages articles (`articulos`) with role-based access control (RBAC).

## 📦 Features

- JWT Authentication
- Role-based access (`ADMIN`, `MOD`, `USER`)
- Soft delete and restore for articles
- MongoDB via Mongoose
- Global error handling
- Docker support for local development

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-project-name>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Configure your `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/your-database
JWT_SECRET=your-jwt-secret-key
PORT=3000
```

4. Start the application:
```bash
npm run start:dev

## 🐳 Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up -d

# Stop containers
docker-compose down
```

## 🔐 Authentication & Usage

To use the API, you need to create a user and authenticate to receive a JWT token.

### Step 1: Create a User

Create a new user with one of the available roles: `ADMIN`, `MOD`, or `USER`.

**POST** `http://localhost:3000/user`

```json
{
  "username": "testAdmin",
  "password": "testpw",
  "role": "ADMIN"
}
```

### Step 2: Login

Authenticate with your credentials to receive a JWT token.

**POST** `http://localhost:3000/auth/login`

```json
{
  "username": "testAdmin",
  "password": "testpw"
}
```

**Response:**
```json
{
  "access_token": "ey..."
}
```

### Step 3: Access Protected Routes

Use the JWT token in the Authorization header for subsequent requests.

**GET** `http://localhost:3000/articulos`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔑 API Endpoints

### Authentication
- `POST /user` - Create a new user
- `POST /auth/login` - Login and receive JWT token

### Articles (Articulos)
- `GET /articulos` - Get all articles (requires authentication)
- `POST /articulos` - Create a new article (requires authentication)
- `GET /articulos/:id` - Get article by ID (requires authentication)
- `PUT /articulos/:id` - Update article (requires authentication)
- `DELETE /articulos/:id` - Soft delete article (requires authentication)
- `POST /articulos/:id/restore` - Restore soft-deleted article (requires authentication)

## 👥 Role-Based Access Control (RBAC)

The API implements role-based access control with three roles:

- **ADMIN**: Full access to all resources
- **MOD**: Moderate access (can manage articles)
- **USER**: Limited access (can view and create articles)

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Language**: TypeScript
- **Container**: Docker

## 📁 Project Structure

```
src/
├── auth/           # Authentication module
├── users/          # User management
├── articulos/      # Articles module
├── common/         # Shared utilities
├── guards/         # Authentication guards
└── main.ts         # Application entry point
```
---
