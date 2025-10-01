
# 📘 LearnHub Backend

LearnHub Backend is a Node.js + Express server that powers the LearnHub platform, enabling role-based authentication, secure media uploads, course management, and MongoDB integration.  
Teachers can manage courses and lessons, while students can track their learning progress.

---

## 🚀 Features

- **Role-Based Authentication:** Teachers and Students with JWT-based login & bcrypt password hashing  
- **Secure File Uploads:** Multer + Cloudinary integration  
- **Course & User Management:** MongoDB + Mongoose models  
- **Cookies & Tokens:** Authentication handled with JWT stored in cookies  
- **Environment Configurations:** dotenv for secure setup  
- **Cross-Origin Access:** CORS enabled for frontend communication  
- **Scalable Folder Structure:** Organized routes, controllers, and models  

---

## 📂 Folder Structure

```

learnhubBackend/
│── src/
│   ├── index.js          # Entry point
│   ├── config/           # DB & Cloudinary configs
│   ├── controllers/      # Request handling logic
│   ├── middlewares/      # Auth, error handling, etc.
│   ├── models/           # Mongoose models (User, Course, etc.)
│   ├── routes/           # Express routes (auth, course, uploads)
│   └── utils/            # Utility functions
│
│── .env                  # Environment variables
│── package.json          # Project metadata & dependencies
│── README.md             # Documentation

````

---

## ⚙️ Installation & Setup

1️⃣ **Clone the repository**
```bash
git clone https://github.com/AnkurYadav26/LearnHub_Backend
cd learnhubBackend
````

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Create a `.env` file** with your configuration:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4️⃣ **Run the server (development)**

```bash
npm run dev
```

Server runs by default on:
👉 [http://localhost:5000](http://localhost:5000)

---

## 🔑 API Endpoints (Sample)

**Authentication**

* `POST /api/auth/register` → Register new user
* `POST /api/auth/login` → Login user & return JWT
* `POST /api/auth/logout` → Logout user

**Courses**

* `GET /api/courses` → Get all courses
* `POST /api/courses` → Create new course (Teacher/Admin)
* `GET /api/courses/:id` → Get course by ID

**Uploads**

* `POST /api/upload` → Upload files to Cloudinary

---

## 🛠️ Tech Stack

* **Backend Framework:** Express.js
* **Database:** MongoDB + Mongoose
* **Authentication:** JWT + bcrypt
* **File Storage:** Multer + Cloudinary
* **Environment Management:** dotenv
* **Other:** CORS, Cookie-parser

---

## 🤝 Contribution

1. Fork the repo
2. Create a branch (`feature-xyz`)
3. Commit changes
4. Push & create a PR

---

## 📜 License

This project is licensed under the ISC License.

---

## 🐦 Tweet-Style Summary

🚀 LearnHub Backend – a secure Node.js + Express backend for managing users, courses, authentication, and file uploads with MongoDB & Cloudinary.



