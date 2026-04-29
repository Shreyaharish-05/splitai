# SplitAI — Generative AI Expense Sharing System

A full-featured, AI-powered expense sharing and bill splitting React application.

## Features

- **Dashboard** — Real-time stats: total spent, balances, net position, category charts
- **Expense Tracking** — Add, filter, search and sort all group expenses
- **Smart Balances** — Visual balance breakdown with pie charts and per-member analytics
- **AI-Optimized Settlements** — Minimizes transactions needed to clear all debts
- **AI Insights** — Budget tracking, spending patterns, forecasts, and recommendations
- **Member Management** — Add/remove members, track participation
- **AI Chat Assistant** — Natural language expense entry and querying
- **Add Expense Modal** — Full form with split types: Equal, Custom, Exact, By Shares

## Quick Start

### Prerequisites
- Node.js 16+ installed ([nodejs.org](https://nodejs.org))

### Install & Run

```bash
# 1. Extract the zip and open terminal in the project folder
cd splitai-expense-sharing

# 2. Install dependencies (takes 1-2 minutes)
npm install

# 3. Start the development server
npm start
```

The app opens automatically at **http://localhost:3000**

### Build for Production
```bash
npm run build
```
This creates an optimized build in the `build/` folder ready to deploy.

---

## How to Use

### Adding Expenses
**Option 1 — Form:** Click `+ Add Expense` in the top bar to fill in a full expense form.

**Option 2 — AI Chat:** Use the chat assistant on the Dashboard. Type things like:
- `"₹1200 dinner paid by Priya split equally"`
- `"Add ₹500 taxi, Rahul paid"`
- `"₹8000 hotel stay"`

### AI Chat Commands
| What you type | What happens |
|---|---|
| `"₹800 breakfast"` | Adds expense to Food category |
| `"Who owes the most?"` | Shows balance summary |
| `"Summarize spending"` | Weekly overview |
| `"Budget status"` | Budget vs actual |
| `"Optimize settlements"` | Settlement plan |

### Navigation
- **Dashboard** — Overview with charts and AI chat
- **Expenses** — Full searchable/filterable list
- **Balances** — Per-member balances with radar chart
- **Settlements** — AI-optimized payment plan
- **AI Insights** — Smart recommendations and forecasts
- **Members** — Manage group participants

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Charts | Recharts |
| Styling | CSS-in-JS with CSS variables |
| Fonts | Sora + JetBrains Mono (Google Fonts) |
| Build Tool | Create React App |

---

## Project Structure

```
splitai/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   ├── Dashboard.jsx      # Main dashboard with stats + charts
│   │   ├── Expenses.jsx       # Expense list with search/filter
│   │   ├── Balances.jsx       # Balance analytics
│   │   ├── Settlements.jsx    # AI-optimized settlements
│   │   ├── Insights.jsx       # AI insights + budget tracking
│   │   ├── Members.jsx        # Member management
│   │   ├── AIChat.jsx         # NLP chat assistant
│   │   ├── AddExpenseModal.jsx # Add expense form
│   │   └── UI.jsx             # Shared UI components
│   ├── data/
│   │   └── initialData.js     # Sample data + constants
│   ├── App.jsx                # Root component + routing
│   ├── index.js               # Entry point
│   └── index.css              # Global styles + animations
├── package.json
└── README.md
```

---

Built with ❤️ using React + AI
