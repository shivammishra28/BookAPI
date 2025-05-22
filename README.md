# 📚 Book Review Management API

A RESTful API built with Node.js and Express.js for managing books, reviews, and users. It includes JWT-based authentication and supports CRUD operations for books and reviews.

## 🚀 Features

- JWT Authentication (`/signup`, `/login`)
- Book management (CRUD)
- Review system (one review per user per book)
- Search books by title or author
- Pagination for books and reviews
- Protected routes for authenticated users


## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for Authentication


## 📦 Installation

```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api
npm install

## Create a .env file in the root:
 
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

##Running the App
npm start

🧪 API Testing

🔑 Authentication Endpoints
POST /signup – Register new user

POST /login – Authenticate and get token

📚 Book Routes
POST /books – Add new book (Authenticated)

GET /books – List all books (pagination & filters)

GET /books/:id – Get book by ID (with average rating, reviews)

GET /search?query=title_or_author

✍️ Review Routes
POST /books/:id/reviews – Add review (one per user)

PUT /reviews/:id – Update own review

DELETE /reviews/:id – Delete own review


