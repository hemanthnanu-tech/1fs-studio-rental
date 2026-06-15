# 1FS Studio & Rental

Welcome to the **1FS Studio & Rental** platform! This is a modern, premium web application built for a photography studio and camera rental business. It features a beautiful UI, smooth animations, and a functional booking & admin system.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Hooks + LocalStorage
- **Language:** TypeScript

## 📸 Key Features

- **Dynamic Theme:** Beautifully crafted Light and Dark modes with specialized color palettes (Orinoco flow design system).
- **Immersive UX:** High-end 3D tilt effects, smooth scrolling, and micro-animations throughout the user journey.
- **Photoshoot Packages:** A stunning cinematic gallery to browse and book 4 premium shoot categories (Baby, Automotive, Traditional, Pre-Wedding).
- **Camera Rentals:** An inventory system for daily camera gear leasing with search and filtering.
- **Admin Gateway:** A hidden secure panel (default login: `hemi` / `hemi`) to manage bookings, track revenue, block calendar dates, copy formatted receipts, and update gear availability.
- **Live Calendar System:** Bookings automatically block dates on the integrated calendar so customers cannot double-book.

## 💻 How to Run Locally

1. **Install Dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *Note: If you are on Windows and encounter path errors, the scripts in `package.json` have been configured to use the `node` execution path to bypass `&` symbol parsing issues.*

3. **Open the App:**
   Open your browser to the local URL provided in the terminal (usually `http://localhost:3000` or `http://localhost:5173`).

## 🌐 How to Publish to GitHub Pages

1. **Initialize Git & Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git push -u origin main
   ```

2. **Enable GitHub Actions:**
   - Go to your repository settings on GitHub.
   - Select **Pages** from the sidebar.
   - Under **Build and deployment**, set the **Source** to **GitHub Actions**.
   - The pre-configured `.github/workflows/deploy.yml` will automatically build and publish your site!

---
*Designed and Developed for Darshan B — 1FS Photography.*
