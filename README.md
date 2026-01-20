# Lost & Found Management System

## Project Description
The **Lost & Found Management System** is a backend API built using **Node.js, Express, and MongoDB**.  
It allows users to **register, login, and manage lost or found items**, including uploading images of items.  
Users can perform **CRUD operations**, search items by name, and update item status.  
Admins have special privileges to delete all items if needed.  

This project follows **RESTful API design**, uses **JWT authentication**, and stores passwords securely with **bcrypt hashing**.

---

## List of APIs

### 1. Authentication APIs

#### a) Register User
- **Method:** POST  
- **URL:** `http://localhost:5000/auth/register`  
- **Request Body (JSON):**
```json
{
  "name": "Test User",
  "email": "testuser@gmail.com",
  "password": "123456"
}
Response (201 Created):
{
  "_id": "696a9616c731df7fb1a39aa9",
  "name": "Test User",
  "email": "testuser@gmail.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NmE5NjE2YzczMWRmN2ZiMWEzOWFhOSIsImlhdCI6MTc2ODU5MzAzNSwiZXhwIjoxNzY5MTk3ODM1fQ.hmXKssqeCEn_phsDPVmScE1mgnix5fwxFkpIQB_PqAQ"
}
b) Login User
Method: POST
URL: http://localhost:5000/auth/login
Request Body (JSON):
{
  "email": "testuser@gmail.com",
  "password": "123456"
}
Response (200 OK):
{
  "_id": "696a9616c731df7fb1a39aa9",
  "name": "Test User",
  "email": "testuser@gmail.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NmE5NjE2YzczMWRmN2ZiMWEzOWFhOSIsImlhdCI6MTc2ODU5MzAzNSwiZXhwIjoxNzY5MTk3ODM1fQ.hmXKssqeCEn_phsDPVmScE1mgnix5fwxFkpIQB_PqAQ"
}

c) Get Profile
Method: GET
URL: http://localhost:5000/auth/profile
Headers: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NmE5NjE2YzczMWRmN2ZiMWEzOWFhOSIsImlhdCI6MTc2ODU5MzAzNSwiZXhwIjoxNzY5MTk3ODM1fQ.hmXKssqeCEn_phsDPVmScE1mgnix5fwxFkpIQB_PqAQ
Response (200 OK):
{
  "_id": "64f912ab123",
  "name": "Test User",
  "email": "testuser@gmail.com",
  "role": "user"
}

2. Item APIs
a) Create Item
Method: POST
URL: http://localhost:5000/api/items
Headers: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NmE5NjE2YzczMWRmN2ZiMWEzOWFhOSIsImlhdCI6MTc2ODU5MzAzNSwiZXhwIjoxNzY5MTk3ODM1fQ.hmXKssqeCEn_phsDPVmScE1mgnix5fwxFkpIQB_PqAQ

Body (form-data):
| Key | Type | Value |
|-----|------|-------|
| name | Text | Black Wallet |
| description | Text | Lost near library |
| location | Text | Campus |
| image | File | (choose an image) |

Response (201 Created):
{
  "_id": "696a9d9ac731df7fb1a39ac0",
  "name": "Black Wallet",
  "description": "Lost near library",
  "location": "Campus",
  "status": "lost",
  "image": "uploads\\1768594842656.jpg",
  "createdBy": "696a9616c731df7fb1a39aa9",
  "createdAt": "2026-01-16T20:20:42.664Z"
}

b) Get All Items
Method: GET
URL: http://localhost:5000/api/items
Response (200 OK):
[
  {
    "_id": "696a9843c731df7fb1a39aaf",
    "name": "Black Wallet",
    "description": "Lost near library",
    "location": "Campus",
    "status": "lost",
    "image": "uploads\\1768594842656.jpg",
    "createdBy": {
      "_id": "696a9616c731df7fb1a39aa9",
      "name": "Test User",
      "email": "testuser@gmail.com"
    }
  }
]

c) Get Item by ID
Method: GET
URL: http://localhost:5000/api/items/696a9843c731df7fb1a39aaf
Response (200 OK):
{
  "_id": "696a9843c731df7fb1a39aaf",
  "name": "Black Wallet",
  "description": "Lost near library",
  "location": "Campus",
  "status": "lost",
  "image": "uploads\\1768594842656.jpg",
  "createdBy": "696a9616c731df7fb1a39aa9"
}

d) Update Item (PUT)
Method: PUT
URL: http://localhost:5000/api/items/696a9843c731df7fb1a39aaf
Headers: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NmE5NjE2YzczMWRmN2ZiMWEzOWFhOSIsImlhdCI6MTc2ODU5MzAzNSwiZXhwIjoxNzY5MTk3ODM1fQ.hmXKssqeCEn_phsDPVmScE1mgnix5fwxFkpIQB_PqAQ
Request Body (JSON):
{
  "name": "Black Wallet",
  "description": "Lost near cafeteria",
  "location": "Main Cafeteria"
}

Response (200 OK):
{
  "_id": "65f912696a9843c731df7fb1a39aafab456",
  "name": "Black Wallet",
  "description": "Lost near cafeteria",
  "location": "Main Cafeteria",
  "status": "lost",
  "image": "uploads\\1768594842656.jpg",
  "createdBy": "696a9616c731df7fb1a39aa9"
}

e) Update Item Status (PATCH)
Method: PATCH
URL: http://localhost:5000/api/items/696a9843c731df7fb1a39aaf/status
Headers: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NmE5NjE2YzczMWRmN2ZiMWEzOWFhOSIsImlhdCI6MTc2ODU5MzAzNSwiZXhwIjoxNzY5MTk3ODM1fQ.hmXKssqeCEn_phsDPVmScE1mgnix5fwxFkpIQB_PqAQ
Request Body (JSON):
{
  "status": "found"
}

Response (200 OK):
{
  "message": "Status updated successfully",
  "item": {
    "_id": "696a9843c731df7fb1a39aaf",
    "name": "Black Wallet",
    "description": "Lost near cafeteria",
    "location": "Main Cafeteria",
    "status": "found",
    "image": "uploads\\1768594842656.jpg",
    "createdBy": "696a9616c731df7fb1a39aa9"
  }
}

f) Search Items
Method: GET
URL: http://localhost:5000/api/items/search?name=wallet
Response (200 OK):
[
  {
    "_id": "696a9843c731df7fb1a39aaf",
    "name": "Black Wallet",
    "description": "Lost near cafeteria",
    "location": "Main Cafeteria",
    "status": "found",
    "image": "uploads\\1768594842656.jpg",
    "createdBy": "696a9616c731df7fb1a39aa9"
  }
]

g) Delete Item by ID
Method: DELETE
URL: http://localhost:5000/api/items/696a9843c731df7fb1a39aaf
Headers: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NmE5NjE2YzczMWRmN2ZiMWEzOWFhOSIsImlhdCI6MTc2ODU5MzAzNSwiZXhwIjoxNzY5MTk3ODM1fQ.hmXKssqeCEn_phsDPVmScE1mgnix5fwxFkpIQB_PqAQ
Response (200 OK):
{
  "message": "Item deleted successfully"
}

h) Delete All Items (Admin Only)
Method: DELETE
URL: /api/items
Headers: Authorization: Bearer <JWT_TOKEN>
Response (200 OK):
{
  "message": "All items deleted successfully"

}
Steps to Run Project Locally
1. Clone the Repository
git clone <your-repo-url>
cd lost-found-api

2. Install Dependencies
npm install

3. Setup Environment Variables
Create a .env file in the project root:
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key

4. Start the Server
For development (auto-restart on changes):
npm run dev

For production:
npm start

Server runs at:
http://localhost:5000

5. Test APIs
Use Postman to test all endpoints
For protected routes, add header:
Authorization: Bearer <your-jwt-token>
For item creation with image, use form-data body