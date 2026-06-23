# 🚀 TaskTracker

A full-stack task management application that helps users organize, prioritize, and track their daily work efficiently. TaskTracker provides secure authentication, task management, filtering, and profile management through a modern and responsive user interface.

---

## 📖 Overview

TaskTracker is a MERN-based productivity application designed to help users manage their tasks effectively. Users can create, update, delete, and track tasks while maintaining secure authentication through JWT-based cookie authentication.

The application follows a client-server architecture:

* **Frontend:** React + Vite
* **Backend:** Node.js + Express.js
* **Database:** MongoDB
* **Authentication:** JWT + HTTP Only Cookies

---

## ✨ Features

### Authentication

* User Registration
* User Login
* Secure Logout
* Protected Routes
* JWT Authentication
* Cookie-Based Authentication

### Task Management

* Create Tasks
* Update Tasks
* Delete Tasks
* Mark Tasks as Complete
* Mark Tasks as Incomplete
* Filter Tasks
* Priority Management
* Due Date Tracking

### User Experience

* Responsive Design
* Loading States
* Error Handling
* Toast Notifications
* User Profile Management

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* TanStack Query
* Axios
* Tailwind CSS
* Shadcn UI
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

---

## 📂 Project Structure

```text
TaskTracker/
│
├── client/
│
└── server/
```

### Client Structure

```text
client/
│
├── public/
├── src/
│   ├── components/
│   │   ├── dashboard-components/
│   │   ├── tasks/
│   │   ├── ui/
│   │   └── user-components/
│   │
│   ├── lib/
│   │   ├── api.js
│   │   ├── tasks.axios.js
│   │   ├── user.axios.js
│   │   ├── ProtectedRoutes.jsx
│   │   ├── PublicRoutes.jsx
│   │   └── utils.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
└── vite.config.js
```

### Server Structure

```text
server/
│
├── controllers/
│   ├── tasks.controller.js
│   └── user.controller.js
│
├── middleware/
│   └── auth.middleware.js
│
├── models/
│   ├── tasks.model.js
│   └── user.model.js
│
├── routes/
│   ├── tasks.routes.js
│   └── user.routes.js
│
├── utils/
│   ├── jwt_token.js
│   └── mongoConnect.js
│
├── .env
├── package.json
└── server.js
```

---

## ⚙️ Environment Variables

### Client

Create a `.env` file inside the client directory.

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Server

Create a `.env` file inside the server directory.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

## 🚀 Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd TaskTracker
```

---

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

---

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
cd server
npm run dev
```

### Backend runs on:

http://localhost:3000

---

### Start Frontend

```bash
cd client
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔐 Authentication Flow

1. User registers an account.
2. User logs in.
3. Server validates credentials.
4. JWT token is generated.
5. JWT is stored in an HTTP-only cookie.
6. Protected routes verify authentication through middleware.
7. Authenticated users can access task management features.

---

## 📡 REST API Endpoints

### User Routes

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | /api/users        | Register User    |
| POST   | /api/users/login  | Login User       |
| GET    | /api/users/me     | Get Current User |
| POST   | /api/users/logout | Logout User      |

### Task Routes

| Method | Endpoint                  | Description     |
| ------ | ------------------------- | --------------- |
| GET    | /api/tasks                | Get All Tasks   |
| POST   | /api/tasks                | Create Task     |
| GET    | /api/tasks/:id            | Get Task By ID  |
| PUT    | /api/tasks/:id            | Update Task     |
| DELETE | /api/tasks/:id            | Delete Task     |
| PATCH  | /api/tasks/:id/complete   | Mark Complete   |
| PATCH  | /api/tasks/:id/incomplete | Mark Incomplete |


---

## 🔮 Future Improvements

* Task Categories
* Dark Mode
* Drag and Drop Task Management
* Email Notifications
* Task Analytics Dashboard
* Team Collaboration Features

------------------------------------------------------------------------------------------------------

## 📚 Libraries & External Resources

### Frontend Libraries

| Library        | Purpose                                   |
| -------------- | ----------------------------------------- |
| React          | Building the user interface               |
| React Router   | Client-side routing                       |
| TanStack Query | Server state management and data fetching |
| Axios          | API communication                         |
| Tailwind CSS   | Utility-first styling                     |
| Shadcn UI      | Reusable and accessible UI components     |

### UI Inspiration & Components

* **21st.dev** — UI inspiration, component ideas, and modern design patterns.
* **Shadcn UI** — Pre-built accessible UI components used throughout the application.

### Backend Libraries

| Library              | Purpose                 |
| -------------------- | ----------------------- |
| Node.js              | Runtime environment     |
| Express.js           | Backend framework       |
| MongoDB              | Database                |
| Mongoose             | MongoDB object modeling |
| JSON Web Token (JWT) | Authentication          |
| bcrypt               | Password hashing        |

### Learning Resources & References

The following resources were used during development for research, troubleshooting, and implementation guidance:

* Stack Overflow
* MDN Web Docs
* React Documentation
* TanStack Query Documentation
* Tailwind CSS Documentation
* Shadcn UI Documentation
* MongoDB Documentation
* Mongoose Documentation
* Express.js Documentation
* JWT Documentation

### Acknowledgements

Special thanks to the open-source community and documentation maintainers whose resources helped during the development of this project.

--------------------------------------------------------------------------------------------------------

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request



**Gaurav Rajput**

Built with React, Express, MongoDB, and Node.js.
