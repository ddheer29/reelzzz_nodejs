# Reelzzz Backend

Reelzzz is a backend service built using **Node.js**, **Express**, and **MongoDB** to support a short video-sharing application. It provides user authentication, feed management, file uploads, likes, comments, rewards, and sharing functionalities.

## Features
- **Authentication:** User signup, login, and token-based authentication using JWT.
- **User Management:** Stores user details and history.
- **Feed System:** Users can post reels, like, comment, and reply.
- **File Uploads:** Upload reels using **Multer** and store them in **Cloudinary**.
- **Reward System:** Users can earn rewards based on interactions.
- **Sharing Feature:** Share reels with others.

## Tech Stack
- **Node.js** with **Express.js** (Backend framework)
- **MongoDB** with **Mongoose** (Database)
- **Cloudinary** (File storage)
- **JWT (jsonwebtoken)** (Authentication)
- **Multer** (File upload)
- **Axios** (API calls)
- **Google Auth Library** (OAuth authentication)
- **HTTP Status Codes** (Standardized responses)

## Project Structure
```
📂 reelzzz_server/
 ├── 📂 config/              # Configuration files (Cloudinary, DB connection, Multer)
 ├── 📂 controllers/         # Business logic for different features
 │   ├── 📂 auth/            # Authentication-related controllers
 │   ├── 📂 feed/            # Feed-related controllers (comments, likes, replies, reels)
 │   ├── 📂 file/            # File upload handling
 │   ├── 📂 reward/          # Reward system
 │   ├── 📂 share/           # Sharing feature
 ├── 📂 errors/              # Custom error handlers
 ├── 📂 middleware/          # Middleware (auth, error handlers)
 ├── 📂 models/              # Mongoose models (User, Reel, Comment, etc.)
 ├── 📂 routes/              # API routes (auth, feed, likes, reels, etc.)
 ├── .env                    # Environment variables
 ├── .gitignore               # Git ignore file
 ├── app.js                   # Entry point of the server
 ├── package.json             # Dependencies and scripts
 ├── package-lock.json        # Lock file for dependencies
```

## Installation
### 1️⃣ Clone the repository
```sh
git clone https://github.com/yourusername/reelzzz_backend.git
cd reelzzz_backend
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Set up environment variables  
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4️⃣ Start the server
```sh
npm start
```
The server will start on **http://localhost:5000/**.

## API Endpoints
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login`    | Login user and return JWT |
| GET    | `/feed/reels`    | Get all reels |
| POST   | `/feed/reel`     | Upload a new reel |
| POST   | `/feed/like`     | Like a reel |
| POST   | `/feed/comment`  | Add a comment on a reel |
| POST   | `/feed/reply`    | Reply to a comment |
| GET    | `/reward`        | Get user rewards |
| POST   | `/share`         | Share a reel |

## Contributing
- Fork the repository
- Create a new branch (`git checkout -b feature-branch`)
- Commit changes (`git commit -m "Added a new feature"`)
- Push the branch (`git push origin feature-branch`)
- Open a pull request

## License
This project is licensed under the **ISC License**.

---
Made with ❤️ by **Divyang Dheer**

