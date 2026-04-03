import { ArrowDownIcon, ArrowUpIcon, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SummaryCards({ transactions }) {
  // Simple insight calculations
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card 
        title="Total Balance" 
        amount={totalBalance} 
        icon={<DollarSign className="size-5 text-indigo-400" />} 
        trend="+12% from last month"
        trendUp={true}
        bg="bg-slate-900/40"
      />
      <Card 
        title="Total Income" 
        amount={totalIncome} 
        icon={<ArrowUpIcon className="size-5 text-emerald-400" />} 
        trend="+4.2% from last month"
        trendUp={true}
        bg="bg-emerald-950/20 border-emerald-900/30"
      />
      <Card 
        title="Total Expenses" 
        amount={totalExpense} 
        icon={<ArrowDownIcon className="size-5 text-rose-400" />} 
        trend="+1.8% from last month"
        trendUp={false}
        bg="bg-rose-950/20 border-rose-900/30"
      />
    </div>
  );
}

function Card({ title, amount, icon, trend, trendUp, bg }) {
  return (
    <div className={cn(
      "p-6 rounded-2xl border border-white/5 backdrop-blur-sm transition-all hover:border-white/10 relative overflow-hidden group",
      bg || "bg-slate-900/40"
    )}>
      <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
        {React.cloneElement(icon, { className: "size-24" })}
      </div>
      
      <div className="flex flex-col relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-slate-950/50 border border-white/5">
            {icon}
          </div>
          <h3 className="font-medium text-slate-400">{title}</h3>
        </div>
        
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">${amount.toLocaleString()}</span>
        </div>
        
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium">
          <span className={cn("px-2 py-0.5 rounded-md", trendUp ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400")}>
            {trend}
          </span>
        </div>
      </div>
    </div>
  );
}
