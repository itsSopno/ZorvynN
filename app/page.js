"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SummaryCards from "@/components/SummaryCards";
import Charts from "@/components/Charts";
import TransactionList from "@/components/TransactionList";
import { Loader2 } from "lucide-react";

export default function FinanceDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("viewer"); // "admin" or "viewer"

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/transactions");
      const json = await res.json();
      if (json.success) {
        setTransactions(json.data);
      } else {
        setError(json.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <DashboardLayout role={role} setRole={setRole}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Finance Dashboard</h2>
          <p className="text-slate-400 mt-1">Track your spending, income, and overall growth.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
          <Loader2 className="size-8 animate-spin text-indigo-500 mb-4" />
          <p>Loading financial data...</p>
        </div>
      ) : error ? (
        <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-xl text-rose-400">
          <h3 className="font-bold flex items-center gap-2">Error loading data</h3>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <SummaryCards transactions={transactions} />

          <Charts transactions={transactions} />

          <div className="mt-8">
            <TransactionList
              transactions={transactions}
              role={role}
              refreshData={fetchTransactions}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
