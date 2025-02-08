# Cookie Clicker Game

## 🚀 Getting Started

Follow the steps below to set up and run the project locally.

### 📥 Clone the Repository

```sh
git clone https://github.com/anndy25/cookie-clicker.git
cd cookie-clicker
```

### 📦 Install Dependencies

```sh
npm install
```

### 🏃‍♂️ Run the Project

1. Open a **new terminal tab** and start the frontend:

   ```sh
   npm run frontend
   ```

2. Open another **new terminal tab** and start the backend:
   ```sh
   npm run backend
   ```

### 🎉 Enjoy the Game!

Once both frontend and backend are running, open your browser and start playing the **Cookie Clicker Game**!

---

## 🔧 Tech Stack

- **Frontend:** React + TypeScript + TailwindCSS
- **Backend:** Node.js + Express + MongoDB

## 📂 Folder Structure

```
📦 project-folder
├── 📁 frontend
│   ├── 📁 src
│   ├── 📄 package.json
│   └── ...
├── 📁 backend
│   ├── 📁 src
│   ├── 📄 package.json
│   └── ...
└── 📄 README.md
```

## 🔗 API Endpoints

| Method | Endpoint       | Description                                     |
| ------ | -------------- | ----------------------------------------------- |
| POST   | `/create-user` | Creates a user if not exists, returns user info |
| GET    | `/user/:id`    | Fetches user data                               |
| POST   | `/increment`   | Increments counter and manages rewards          |
