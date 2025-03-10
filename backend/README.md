# Opinion Trading App (Backend)

## 📌 Overview
This is the backend for the Opinion Trading App, built using **Node.js (Express.js)**, **MongoDB**, and **WebSocket (Socket.io)**.

## 🚀 Features
- JWT-based authentication (User/Admin)
- Fetch live sports data & store in MongoDB
- WebSocket integration for real-time updates
- Admin panel APIs (Manage events & trades)
- Users can place trades on live events
- Auto-settlement of trades
- Logging & error handling (Winston)

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **WebSocket:** Socket.io
- **Auth:** JWT (JSON Web Tokens)
- **Logging:** Winston
- **Deployment:** Render (Backend), Vercel (Frontend)

## 📂 Folder Structure
`
 /backend ├── /src │ ├── /config (Database & env configs) │ ├── /controllers (Business logic) │ ├── /models (MongoDB schemas) │ ├── /routes (API endpoints) │ ├── /services (WebSocket & data fetch) │ ├── /middleware (Auth & error handling) │ ├── /utils (Logger & helpers) │ ├── app.js │ ├── server.js ├── .env.example ├── package.json ├── README.md`
 `

 
## 🔧 Setup & Run Locally
### **1️⃣ Clone the repository**
```sh
git clone https://github.com/your-repo.git
cd opinion-trading-app/backend
