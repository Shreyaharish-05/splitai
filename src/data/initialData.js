// src/data/initialData.js

export const MEMBERS = [
  { id: 1, name: "You", avatar: "YO", color: "#7c6ff7" },
  { id: 2, name: "Priya", avatar: "PR", color: "#22c98a" },
  { id: 3, name: "Rahul", avatar: "RA", color: "#3b9eff" },
  { id: 4, name: "Neha", avatar: "NE", color: "#f45c5c" },
  { id: 5, name: "Arjun", avatar: "AR", color: "#f5a623" },
];

export const CATEGORIES = ["Food", "Stay", "Travel", "Fun", "Shopping", "Other"];

export const CAT_ICONS = {
  Food: "🍽️", Stay: "🏨", Travel: "🚗", Fun: "🏄", Shopping: "🛍️", Other: "📦",
};

export const CAT_COLORS = {
  Food: "#f45c5c", Stay: "#7c6ff7", Travel: "#3b9eff",
  Fun: "#22c98a", Shopping: "#f5a623", Other: "#8b92b0",
};

export const INITIAL_EXPENSES = [
  { id: 1, desc: "Baga Beach Dinner", amount: 4800, cat: "Food", payer: "Priya", split: "equal", date: "2025-05-18", participants: ["You", "Priya", "Rahul", "Neha", "Arjun"] },
  { id: 2, desc: "Villa Booking", amount: 32000, cat: "Stay", payer: "You", split: "equal", date: "2025-05-17", participants: ["You", "Priya", "Rahul", "Neha", "Arjun"] },
  { id: 3, desc: "Taxi from Airport", amount: 1800, cat: "Travel", payer: "Rahul", split: "equal", date: "2025-05-17", participants: ["You", "Priya", "Rahul", "Neha", "Arjun"] },
  { id: 4, desc: "Scuba Diving", amount: 9500, cat: "Fun", payer: "You", split: "equal", date: "2025-05-18", participants: ["You", "Priya", "Rahul", "Neha", "Arjun"] },
  { id: 5, desc: "Breakfast x3 Days", amount: 2200, cat: "Food", payer: "Neha", split: "equal", date: "2025-05-19", participants: ["You", "Priya", "Rahul", "Neha", "Arjun"] },
  { id: 6, desc: "Waterfall Trek", amount: 3600, cat: "Fun", payer: "Arjun", split: "equal", date: "2025-05-19", participants: ["You", "Priya", "Rahul", "Neha", "Arjun"] },
  { id: 7, desc: "Supermarket Groceries", amount: 4200, cat: "Shopping", payer: "Priya", split: "equal", date: "2025-05-20", participants: ["You", "Priya", "Rahul", "Neha", "Arjun"] },
  { id: 8, desc: "Speedboat Ride", amount: 8000, cat: "Fun", payer: "Rahul", split: "equal", date: "2025-05-20", participants: ["You", "Priya", "Rahul", "Neha", "Arjun"] },
  { id: 9, desc: "Night Club Entry", amount: 5600, cat: "Fun", payer: "You", split: "equal", date: "2025-05-21", participants: ["You", "Priya", "Rahul", "Neha", "Arjun"] },
  { id: 10, desc: "Final Gala Dinner", amount: 6200, cat: "Food", payer: "Neha", split: "equal", date: "2025-05-21", participants: ["You", "Priya", "Rahul", "Neha", "Arjun"] },
  { id: 11, desc: "Parasailing", amount: 7200, cat: "Fun", payer: "Priya", split: "equal", date: "2025-05-22", participants: ["You", "Priya", "Rahul", "Neha", "Arjun"] },
  { id: 12, desc: "Ferry Tickets", amount: 2400, cat: "Travel", payer: "You", split: "equal", date: "2025-05-22", participants: ["You", "Priya", "Rahul", "Neha", "Arjun"] },
];

export const INITIAL_BALANCES = {
  You: 4940, Priya: -2260, Rahul: -1120, Neha: 640, Arjun: -2200,
};

export const BUDGETS = {
  Food: 15000, Stay: 30000, Travel: 6000, Fun: 20000, Shopping: 5000,
};

export const AI_RESPONSES = {
  greeting: "Hi! I'm your SplitAI assistant. Try: \"Add ₹800 dinner paid by Priya\", \"Who owes the most?\", \"Summarize this week's spending\", or \"Show budget status\".",
  balances: "Current balances: **You** are owed ₹4,940 total. Priya owes ₹2,260, Arjun owes ₹2,200, and Rahul owes ₹1,120. Neha is owed ₹640.",
  summary: "This week the group spent ₹84,620. Top categories: Accommodation 38%, Fun 32%, Food 16%. You've fronted the most (₹19,700) and are owed the most back.",
  budget: "You've used ₹84,620 of a ₹1,00,000 budget. Fun is 34% over budget. Stay and Travel are on track. You have ₹15,380 left — about ₹3,076 per person for remaining days.",
  settle: "Optimal settlement plan: Priya pays You ₹2,260 · Arjun pays You ₹1,940 · Rahul pays Neha ₹480 · Arjun pays Neha ₹260. That's just 4 transactions to clear all debts!",
  added: "Done! Expense added and split equally among all members. Balances updated automatically.",
  default: "I can help you track expenses, check balances, optimize settlements, or give AI insights. What would you like to know?",
};
