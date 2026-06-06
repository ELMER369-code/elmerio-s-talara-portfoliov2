# Elmerio S. Talara - Computer Engineer Portfolio

[![Live Site](https://img.shields.io/badge/Live-Demo-cyan?style=for-the-badge)](https://elmer369-code.github.io/elmerio-s-talara-portfoliov2/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-silver?style=for-the-badge&logo=github)](https://github.com/ELMER369-code/elmerio-s-talara-portfoliov2)

Building the bridge between hardware and software. A dynamic, database-driven portfolio showcasing expertise in Embedded Systems, Robotics, Software Development, and Hardware-Software Integration.

## 🚀 Live Demo
**[View Website](https://elmer369-code.github.io/elmerio-s-talara-portfoliov2/)**

---

## ✨ Key Features

- **Dynamic Content Management**: Fully integrated with **Supabase** to manage projects, descriptions, and tech stacks in real-time.
- **Secure Admin Dashboard**: A protected route (`/admin`) for adding, editing, and deleting projects directly from the browser.
- **Image Upload Integration**: Seamlessly upload project images to Supabase Storage with instant previews.
- **Professional Analytics**: (Coming soon) Contact form logging and visitor tracking.
- **Modern Responsive UI**: Built with a sleek "Navy & Cyan" aesthetic, optimized for all devices.
- **Smart Contact Modal**: Integrated "Say Hello" popup with one-click Messenger and Gmail pre-filled messages.

## 🛠 Tech Stack

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/)
- **Backend/Database**: [Supabase](https://supabase.com/) (Auth, Database, Storage)
- **Deployment**: [GitHub Pages](https://pages.github.com/)

## 📦 Project Structure (MVC Architecture)

- `src/models/`: `ProjectModel.ts` handles Supabase CRUD operations.
- `src/controllers/`: Custom React hooks (`useProjects.ts`, `useAdminProjects.ts`) managing business logic.
- `src/views/`: UI components and pages (Home, AdminDashboard, Login).

---

## 🛠 Installation & Setup

Want to run this project locally? Follow these steps:

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- A **Supabase** account and project.

### 2. Clone the Repository
```bash
git clone https://github.com/ELMER369-code/elmerio-s-talara-portfoliov2.git
cd elmerio-s-talara-portfoliov2
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Variables
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the Application
```bash
npm run dev
```
Your app should now be running at `http://localhost:5173`.

---

## 📷 Screenshots

<div align="center">
  <p><i>The sleek, modern portfolio landing page.</i></p>
  <!-- Replace these with actual image paths once they are available in your repo -->
  <img src="public/assets/preview-landing.png" width="800" alt="Portfolio Landing Page" />
  <p><i>The Secure Admin Dashboard for Project Management.</i></p>
  <img src="public/assets/preview-admin.png" width="800" alt="Admin Dashboard" />
</div>

---

## 📄 License
Designed and Built by **Elmerio S. Talara**.

---

*Designed to bridge the gap between abstract code and physical hardware.*
