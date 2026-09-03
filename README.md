# 🎁 VELOOP Rewards — Full-Stack Giveaway & Prize Management Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://veloop-giveaway.onrender.com/giveaway)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express 5](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)

A full-stack giveaway, reward distribution, and prize-claiming platform built for high engagement, complete transparency, and fraud-resistant sweepstakes. Features real-time countdowns, multi-currency entry models, winner podium announcements, cryptographic audit trails, and dynamic self-service prize claiming for both physical and digital rewards.

---

## 🌐 Live Application

- **Live Giveaway Portal:** [https://veloop-giveaway.onrender.com/giveaway](https://veloop-giveaway.onrender.com/giveaway)
- **Live API Base URL:** `https://veloop-giveaway.onrender.com/api`


---

## ✨ Key Features

### 🎯 Giveaway Landing & Discovery
- **Dynamic Countdown Timers:** Real-time event countdowns synchronized with server timestamps.
- **Hero & Engagement Showcase:** Interactive banners displaying total participants, prize pools, and eligibility rules.
- **Curated Prize Tiers:** Support for tiered reward structures (1st Place, 2nd Place, 3rd Place, and Runner-ups).
- **Multi-Prize Catalog:** Supports physical high-value gadgets (e.g., iPhone 15 Pro, Apple Watch Series 9, AirPods Pro) and instant digital vouchers (Amazon Gift Cards).

### 🪙 Multi-Currency Participation Model
- **Flexible Entry Fees:** Join giveaways using internal platform currencies (`VEs`, `SVEs`, or `Tokens`).
- **Real-Time Balance Verification:** Automated wallet balance checks and entry transaction logging before entry confirmation.
- **Anti-Duplication Enforcement:** Enforces strict participation limits per user per campaign.

### 🏆 Winner Announcements & Fairness Audits
- **Interactive 3D-Style Podium:** Visually engaging 1st, 2nd, and 3rd place winner celebration layout.
- **Provable Fairness & Audit Logs:** Every giveaway draw generates immutable audit hashes and logs to verify random selection integrity.
- **Historical Winners Archive:** Browse previous giveaway outcomes, past winners, and awarded prizes.

### 📦 Streamlined Prize Claiming System
- **Physical Prize Workflow:** Comprehensive delivery form collecting shipping address, contact details, city, state, and postal codes.
- **Digital Gift Card Workflow:** Automated code distribution with verification safeguards.
- **Claim Status Tracking:** Winners can inspect real-time claim status (`SUBMITTED`, `PROCESSING`, `FULFILLED`).

### 🛡️ Security, Reliability & Anti-Fraud
- **JWT Authentication:** Robust token-based authentication with request interceptors and token refresh handling.
- **Fraud Detection Engine:** Automated risk scoring and suspicious activity flagging for entry anomalies.
- **Rate Limiting & Headers:** Express Rate Limit and Helmet protection against DDoS, brute force, and XSS attacks.

---

## 🛠️ Technology Stack

### Frontend
| Technology | Description |
| :--- | :--- |
| **React 19** | Modern UI library utilizing modern hooks and component patterns |
| **Redux Toolkit** | Centralized global state management (Auth, Giveaways, Claims, Winners) |
| **React Router v7** | Declarative client-side routing with protected route guards |
| **Tailwind CSS v4** | Utility-first, responsive modern styling |
| **Framer Motion** | Micro-interactions, animated transitions, and modal physics |
| **Axios** | HTTP client with automatic auth token injection and error interceptors |
| **Vite** | Blazing-fast frontend build tooling and development server |

### Backend
| Technology | Description |
| :--- | :--- |
| **Node.js & Express 5** | Scalable, event-driven RESTful API backend |
| **MongoDB & Mongoose** | Schema-driven NoSQL database for users, giveaways, entries, and audits |
| **JSON Web Tokens (JWT)** | Stateless, secure user session management |
| **bcryptjs** | Salted cryptographic password hashing |
| **Helmet & CORS** | HTTP header hardening and cross-origin resource sharing policies |
| **Express Rate Limit** | Request throttling to mitigate abuse and denial-of-service attempts |
| **Morgan** | Structured HTTP request logging |

---

## 📁 Architecture & Directory Structure

```
veloop-fullstack/
├── README.md                      # Primary project documentation (Root)
├── .gitignore                     # Root gitignore rules
│
├── Backend/                       # Express REST API & Database
│   ├── server.js                  # Application entry point & DB connection
│   ├── package.json               # Backend dependencies & scripts
│   ├── public/                    # Production static build served by Express
│   │   ├── assets/                # Compiled JS & CSS bundles
│   │   ├── index.html             # Client HTML entry point
│   │   └── *.png                  # Prize and marketing assets
│   └── src/
│       ├── app.js                 # Express application & middleware configuration
│       ├── config/                # Environment config & MongoDB connection
│       ├── controllers/           # Request handlers (auth, giveaway, winner, claim)
│       ├── middleware/            # Auth guards, error handlers, rate limiters, fraud checks
│       ├── models/                # Mongoose schemas (User, Giveaway, Winner, Claim, etc.)
│       ├── routes/                # Express route declarations
│       ├── services/              # Business logic (balance, fraud, giveaway, participation)
│       └── validator/             # Request payload validation schemas
│
└── Frontend/                      # React 19 Single Page Application
    ├── index.html                 # Root HTML template
    ├── vite.config.js             # Vite configuration with API proxying
    ├── package.json               # Frontend dependencies & scripts
    ├── .env.production            # Production environment variables
    ├── public/                    # Static image assets
    └── src/
        ├── main.jsx               # React entry point with Redux Provider
        ├── app/                   # App root, Redux store, routes, and route guards
        ├── components/            # Shared components (Navbar, alerts, modals)
        └── features/
            ├── Giveaway/          # Giveaway hero, rules, stats, countdown, and tabs
            ├── auth/              # Login, register, token management, and auth API
            ├── claim/             # Physical & gift card claim forms, claim status cards
            └── winner/            # Winner banner, podium, winner list, audit cards
```

---

## 🚀 Getting Started Locally

Follow these steps to run the complete stack on your local development machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository
```bash
git clone https://github.com/DEEPANSHU-KUMAR96/Veloop-giveaway.git
cd Veloop-giveaway
```

---

### 2. Configure Backend

Navigate to the `Backend` directory and install dependencies:
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:
```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/veloop_db
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

Start the backend server in development mode:
```bash
npm run dev
```
> The API will be accessible at `http://localhost:3000`.

---

### 3. Configure Frontend

Open a new terminal window, navigate to the `Frontend` directory, and install dependencies:
```bash
cd Frontend
npm install
```

Create or verify the `.env` file in the `Frontend` directory:
```env
# Point to local backend:
VITE_API_URL=http://localhost:3000/api

# Or point directly to the live Render backend:
# VITE_API_URL=https://veloop-giveaway.onrender.com/api
```

Start the Vite development server:
```bash
npm run dev
```
> The frontend application will be live at `http://localhost:5173`.

---

## 🔌 API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user account | No |
| `POST` | `/login` | Authenticate user & receive JWT | No |
| `GET` | `/me` | Retrieve current logged-in user profile | Yes |

### 🎁 Giveaways (`/api/giveaways`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/current` | Fetch current active giveaway & prizes | No |
| `GET` | `/:slug` | Fetch giveaway details by unique slug | No |
| `GET` | `/previous` | List all past completed giveaways | No |
| `POST` | `/:id/join` | Enter giveaway with selected prize | Yes |
| `GET` | `/:id/my-status` | Check user participation & win status | Yes |

### 🏆 Winners & Claims (`/api/giveaways`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/:id/winners` | Fetch announced winners for a giveaway | No |
| `GET` | `/previous/winners` | Fetch previous winners across giveaways | No |
| `POST` | `/:id/claim` | Submit physical or digital prize claim | Yes |
| `GET` | `/:id/my-claim` | Check submitted claim status | Yes |

---

## 📦 Production Deployment

The project is configured for deployment on **Render**:

1. **Build Frontend:**
   ```bash
   cd Frontend
   npm run build
   ```
2. **Sync Assets to Backend Public:**
   The compiled distribution (`Frontend/dist`) is copied to `Backend/public`.
3. **Serve from Unified Express Server:**
   The Express server serves `Backend/public` statically, providing unified single-port hosting for both API and client.
4. **Deploy Command:**
   Deploy the `Backend` directory with start command:
   ```bash
   npm start
   ```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/DEEPANSHU-KUMAR96/Veloop-giveaway/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">
  Made with ❤️ for <b>VELOP Rewards</b> • <a href="https://veloop-giveaway.onrender.com/giveaway">Explore Live Giveaway</a>
</p>
