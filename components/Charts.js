"use client";

import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, parseISO } from 'date-fns';

const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#3b82f6', '#8b5cf6'];

export default function Charts({ transactions }) {
  const chartData = useMemo(() => {
    const grouped = {};

    // Sort transactions chronologically
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    sorted.forEach(t => {
      const day = format(new Date(t.date), 'MMM dd');
      if (!grouped[day]) {
        grouped[day] = { date: day, income: 0, expense: 0 };
      }
      if (t.type === 'income') grouped[day].income += t.amount;
      if (t.type === 'expense') grouped[day].expense += t.amount;
    });

    return Object.values(grouped);
  }, [transactions]);

  // Prepare data for pie chart
  const categoryData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const grouped = {};
    expenses.forEach(t => {
      if (!grouped[t.category]) grouped[t.category] = 0;
      grouped[t.category] += t.amount;
    });

    return Object.keys(grouped).map(key => ({
      name: key,
      value: grouped[key]
    })).sort((a, b) => b.value - a.value); // Sort by highest
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl relative z-50">
          <p className="text-slate-300 font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-semibold">
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 lg:h-96">

      {/* Area Chart: Income vs Expense Trend */}
      <div className="col-span-1 lg:col-span-2 bg-slate-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm flex flex-col relative z-0 min-h-[300px] lg:min-h-0">
        <h3 className="font-semibold text-slate-200 mb-6 flex items-center gap-2">
          Cashflow Trend
          <span className="px-2 py-0.5 rounded bg-slate-800 text-xs text-slate-400 font-medium">Last 30 Days</span>
        </h3>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="date" stroke="#ffffff40" fontSize={12} tickMargin={10} axisLine={false} />
              <YAxis stroke="#ffffff40" fontSize={12} tickFormatter={(val) => `$${val}`} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" name="Income" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
              <Area type="monotone" dataKey="expense" name="Expense" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart: Categories */}
      <div className="col-span-1 bg-slate-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm flex flex-col relative z-0">
        <h3 className="font-semibold text-slate-200 mb-2">Spending Breakdown</h3>
        <p className="text-sm text-slate-400 mb-6">Where is your money going?</p>

        <div className="flex-1 w-full flex items-center justify-center relative min-h-0">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  stroke="none"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-slate-500 text-sm">No expenses to track</div>
          )}

          {/* Custom Center Text */}
          {categoryData.length > 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-sm text-slate-400">Largest</span>
              <span className="text-lg font-bold text-white max-w-[100px] truncate">{categoryData[0]?.name}</span>
            </div>
          )}
        </div>

        {/* Legend */}
        {categoryData.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2 overflow-y-auto max-h-24 pb-2">
            {categoryData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-xs">
                <span className="size-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-slate-300 truncate">{entry.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
