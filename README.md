# Zorvyn Finance Dashboard

A clean, interactive, and responsive finance dashboard built with Next.js, evaluating frontend architecture, state management, and aesthetic UI implementation.

This assignment was completed using the **Next.js App Router** and integrates with a live **MongoDB backend** to provide real-time transaction data simulation.

---

## 🚀 Setup Instructions

1. **Clone the repository** (or download the source):
   ```bash
   git clone https://github.com/itsSopno/ZorvynN.git
   cd ZorvynN/zorvyn
   ```

2. **Install Dependencies**:
   This project relies on React, TailwindCSS, Recharts, and Lucide Icons.
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Ensure your `.env` file is present in the root directory (or simply copy the cluster URL into `lib/db.js`) to allow MongoDB connections.
   ```env
   MONGODB_URI=mongodb+srv://<user>:<pwd>@cluster...
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **View Dashboard**:
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## ✨ Overview of Approach

My approach prioritized a **premium, "fintech" styling** using deep indigo palettes, glassmorphism (`backdrop-blur`), and tailored icons, ensuring the dashboard feels professional rather than purely academic.

### Architecture & Modularity
Instead of a monolithic page, the UI is split into reusable components inside `/components/`:
- **`DashboardLayout.js`**: Controls the overarching shell, Sidebar navigation, and sticky Header.
- **`SummaryCards.js`**: Calculates and presents the top-level financial metrics from the passed transaction data.
- **`Charts.js`**: Wraps `recharts` to render the interactive Cashflow (Area) and Category (Donut) metrics.
- **`TransactionList.js`**: Handles the tabular layout, including built-in filtering, search, and conditional Admin rendering.

### State Management Approach
Instead of reaching for a complex global store like Redux or Zustand immediately, I utilized **React Local State (`useState`, `useEffect`)** effectively within the root `app/page.js` controller.
- The parent (`page.js`) fetches the data, handles the loading/error state, and maintains the simulated `role`.
- Data is then trickled down to presentational components via props.
- If an Admin deletes a transaction from deeper within the tree, it triggers a `refreshData()` callback to keep the single source of truth updated perfectly.

---

## 🎯 Features

- **Dashboard Overview**: Automatically aggregates and visualizes Total Balance, Income, and Expenses based on raw data.
- **Interactive Visualizations**: 
  - Dynamic Time-based area charts plotting Cashflow.
  - Categorical Donut pie chart representing expense ratios.
- **Transaction Filtering**: Real-time filtering by text (Title/Category) or Transaction Type (Income/Expense).
- **Simulated Role-Based Access (RBAC)**: Includes an interactive toggle in the sidebar. Switching from `Viewer` to `Admin` unlocks the "Delete" UI functionalities on individual transactions.
- **Live Database Connection**: Pulls straight from a live MongoDB deployment, responding to actual backend mutations via dynamic DELETE fetches.
- **Fully Responsive**: Adapts seamlessly from Desktop to Mobile using Tailwind scaling constraints.
- **Dark Fintech Aesthetic**: Styled beautifully with subtle animations and focus states.
