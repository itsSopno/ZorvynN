"use client";

import { useState } from "react";
import { Search, Filter, ArrowUpRight, ArrowDownRight, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function TransactionList({ transactions, role, refreshData }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1);
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.category.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    if(confirm("Are you sure you want to delete this transaction?")) {
      try {
        await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
        if (refreshData) refreshData();
      } catch (e) {
        console.error("Failed to delete", e);
      }
    }
  };

  return (
    <div className="bg-slate-900/40 rounded-2xl border border-white/5 backdrop-blur-sm overflow-hidden flex flex-col relative z-0">
      
      {/* Header & Controls */}
      <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-200">Recent Transactions</h3>
          <p className="text-sm text-slate-400 mt-1">Showing {filteredTransactions.length} records</p>
        </div>

        <div className="flex items-center gap-3">
          {role === "admin" && (
            <button 
              onClick={() => alert("Add Transaction Modal would open here!")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
            >
              + Add Transaction
            </button>
          )}

          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
              className="bg-slate-950/50 border border-slate-800 text-sm rounded-lg pl-9 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200 placeholder:text-slate-600"
            />
          </div>

          <div className="relative">
            <select 
              value={filterType}
              onChange={handleFilterChange}
              className="appearance-none bg-slate-950/50 border border-slate-800 text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200 cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="income">Income Only</option>
              <option value="expense">Expense Only</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-xs uppercase tracking-wider font-semibold text-slate-500 bg-slate-950/20">
              <th className="px-6 py-4">Transaction</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {currentTransactions.length > 0 ? (
              currentTransactions.map((tx) => (
                <tr key={tx._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "size-10 rounded-full flex items-center justify-center border",
                        tx.type === "income" 
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                          : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                      )}>
                        {tx.type === "income" ? <ArrowUpRight className="size-5" /> : <ArrowDownRight className="size-5" />}
                      </div>
                      <div>
                        <div className="font-medium text-slate-200">{tx.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{tx.note || "No notes"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {format(new Date(tx.date), "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "font-semibold",
                      tx.type === "income" ? "text-emerald-400" : "text-slate-200"
                    )}>
                      {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {role === "admin" ? (
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-colors">
                          <Edit className="size-4" />
                        </button>
                        <button onClick={() => handleDelete(tx._id)} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ) : (
                      <button className="p-2 text-slate-600 hover:text-slate-400 transition-colors" title="View details (Admin only for editing)">
                        <MoreHorizontal className="size-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center">
                    <div className="size-12 rounded-full bg-slate-900 flex items-center justify-center mb-3">
                      <Search className="size-6 text-slate-600" />
                    </div>
                    <p>No transactions found matching your criteria</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination component */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-slate-400 bg-slate-950/20">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} entries
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-slate-200"
            >
              Previous
            </button>
            <button 
               onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
               disabled={currentPage === totalPages}
               className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-slate-200"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
