# CoFound Backend

Production-ready Node.js + Express API for the CoFound startup co-founder matching platform.

## Install Commands

```bash
cd backend
npm install
```

Dependencies included in `package.json`:

```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken cloudinary multer multer-storage-cloudinary express-validator morgan helmet
npm install -D nodemon
```

## Folder Structure

```text
backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── idea.controller.js
│   │   └── connection.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── idea.routes.js
│   │   └── connection.routes.js
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Idea.model.js
│   │   └── Connection.model.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── upload.middleware.js
│   │   └── validate.middleware.js
│   ├── utils/
│   │   ├── ApiResponse.js
│   │   ├── ApiError.js
│   │   ├── asyncHandler.js
│   │   ├── generateToken.js
│   │   └── parseList.js
│   └── app.js
├── server.js
├── package.json
├── .env
└── README.md
```

## Startup

Update `backend/.env` with real MongoDB, JWT, and Cloudinary values.

```bash
cd backend
npm run dev
```

Or:

```bash
node server.js
```

## API Response Contract

Success:

```json
{ "success": true, "message": "Success", "data": {} }
```

Error:

```json
{ "success": false, "message": "Error message", "errors": [] }
```

Protected routes require:

```text
Authorization: Bearer <jwt_token>
```

## Postman Examples

### Register

`POST http://localhost:5000/api/auth/register`

Body: `form-data`

```text
name: Ashok
email: ashok@example.com
password: secret123
role: Founder
avatar: optional file
```

### Login

`POST http://localhost:5000/api/auth/login`

Body: `raw JSON`

```json
{
  "email": "ashok@example.com",
  "password": "secret123"
}
```

### Health Check

`GET http://localhost:5000/api/health`

### Get Users

`GET http://localhost:5000/api/users?role=Developer&skills=React,Node&page=1&limit=12`

### Get Me

`GET http://localhost:5000/api/users/me`

Headers:

```text
Authorization: Bearer <jwt_token>
```

### Update Me

`PATCH http://localhost:5000/api/users/me`

Headers:

```text
Authorization: Bearer <jwt_token>
```

Body: `form-data`

```text
name: Ashok Badoni
bio: Building CoFound
skills: React,Node,MongoDB
location: India
avatar: optional file
```

### Get User By ID

`GET http://localhost:5000/api/users/<user_id>`

### Create Idea

`POST http://localhost:5000/api/ideas`

Headers:

```text
Authorization: Bearer <jwt_token>
```

Body: `form-data`

```text
title: AI Founder Match
description: Matching founders using skills and startup interests.
stage: Idea
skillsNeeded: React,ML,Sales
lookingFor: Developer,Marketing
equityOffered: 20
coverImage: optional file
```

### Get Ideas

`GET http://localhost:5000/api/ideas?stage=Idea&skillsNeeded=React&page=1&limit=10`

### Get Idea By ID

`GET http://localhost:5000/api/ideas/<idea_id>`

### Update Idea

`PATCH http://localhost:5000/api/ideas/<idea_id>`

Headers:

```text
Authorization: Bearer <jwt_token>
```

Body: `form-data`

```text
title: Updated idea title
stage: MVP
coverImage: optional file
```

### Delete Idea

`DELETE http://localhost:5000/api/ideas/<idea_id>`

Headers:

```text
Authorization: Bearer <jwt_token>
```

### Send Connection Request

`POST http://localhost:5000/api/connections`

Headers:

```text
Authorization: Bearer <jwt_token>
```

Body: `raw JSON`

```json
{
  "receiverId": "<receiver_user_id>"
}
```

### Get My Connections

`GET http://localhost:5000/api/connections`

Headers:

```text
Authorization: Bearer <jwt_token>
```

### Update Connection Status

`PATCH http://localhost:5000/api/connections/<connection_id>`

Headers:

```text
Authorization: Bearer <jwt_token>
```

Body: `raw JSON`

```json
{
  "status": "accepted"
}
```
