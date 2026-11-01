# EventSphere — Frontend Client
### OJUS Student Festival 2026 Operations Platform

A modern, responsive, role-based festival operations web platform built with **React 19**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Key Features

- **Role-Based Access Control (RBAC)**:
  - **Administrator Portal** (`/portal/admin`): Event Management Head dashboard for master festival schedule CRUD, 11-team quota tracking, and real-time user role & team reassignments.
  - **Event Head Portal** (`/portal/lead`): Department dashboard for team leads to manage team rosters and assign operational duties.
  - **Volunteer Operations Portal** (`/portal/volunteer`): Digital festival pass, assigned duty checklist with progress tracking, and shift details.
- **11 Distinct Operational Divisions**:
  - Event Management, Design Team, Creative, Anchoring, Hosting, Literature, Photography, Cinematography, Security, Technical, PR & Sponsorship.
- **Minimalist Design System**:
  - Flat design canvas (`#FAFBF9`) with olive green accents (`#485E36`, `#3D4F2F`) and crisp typography.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The application will be accessible at `http://127.0.0.1:5173`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/       # Navbar, Footer, ProtectedRoute
├── context/          # AuthContext (JWT & RBAC), FestivalContext (Schedule & Teams)
├── pages/
│   ├── HomePage.jsx
│   ├── TeamsDirectoryPage.jsx
│   ├── AuthPage.jsx
│   └── portals/
│       ├── AdminPortal.jsx
│       ├── EventHeadPortal.jsx
│       └── VolunteerPortal.jsx
├── services/         # Axios API clients & team constants
├── App.jsx           # Route definitions
└── index.css         # Tailwind & theme styling
```
