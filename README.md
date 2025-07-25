# Highlight Ventures

A modern, full-stack web application for Highlight Ventures, providing professional waterproofing and flooring solutions.

## Features
- Responsive React frontend (Vite + Tailwind CSS)
- Node.js/Express backend with MongoDB (Mongoose)
- Contact form with instant success feedback and background email notification
- Admin dashboard with JWT login, lead management, delete, and Excel export
- WhatsApp floating widget
- SEO-friendly meta tags and Open Graph
- CORS configured for secure frontend-backend communication
- Deployment-ready for Vercel (frontend) and Render (backend)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas or local MongoDB instance

### 1. Clone the repository
```bash
# Clone the repo
git clone <your-repo-url>
cd highlightventures
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Variables
Create a `.env` file in the `server/` directory with:
```
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
NOTIFY_EMAIL=your-gmail@gmail.com
NOTIFY_EMAIL_PASS=your-gmail-app-password
```

### 4. Run the Backend
```bash
cd server
npm install
npm start
```

### 5. Run the Frontend
```bash
npm run dev
```

### 6. Deployment
- **Frontend:** Deploy to Vercel or Netlify
- **Backend:** Deploy only the `server/` folder to Render

## Admin Dashboard
- Visit `/admin` to login and manage leads
- Delete leads and export to Excel

## Email Notifications
- Uses Nodemailer with Gmail App Password for instant lead notifications
- See `/server/index.js` for setup instructions

## Contact
For support or business inquiries, email: [Highlightventures0317@gmail.com](mailto:Highlightventures0317@gmail.com)

---
© {new Date().getFullYear()} Highlight Ventures. All rights reserved.