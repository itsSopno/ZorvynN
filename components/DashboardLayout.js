"use client";

import { cn } from "@/lib/utils";
import { Wallet, Settings, LayoutDashboard, User, Check, LogOut, SunMoon } from "lucide-react";

export default function DashboardLayout({ children, role, setRole }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-slate-950/50 backdrop-blur-xl hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <div className="size-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
            <Wallet className="size-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">ZorvynFi</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main</div>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">
            <LayoutDashboard className="size-5" />
            Dashboard
          </button>
          
          <div className="mt-8 px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Simulate Role</div>
          
          <button 
            onClick={() => setRole("admin")}
            className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors border border-transparent", role === "admin" ? "bg-slate-800 text-white border-white/10" : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200")}
          >
            <div className="flex items-center gap-3">
              <Settings className="size-5" />
              Admin
            </div>
            {role === "admin" && <Check className="size-4 text-indigo-400" />}
          </button>
          
          <button 
            onClick={() => setRole("viewer")}
            className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors border border-transparent", role === "viewer" ? "bg-slate-800 text-white border-white/10" : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200")}
          >
            <div className="flex items-center gap-3">
              <User className="size-5" />
              Viewer
            </div>
            {role === "viewer" && <Check className="size-4 text-indigo-400" />}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Overview</h1>
            <p className="text-sm text-slate-400">Welcome back, {role === "admin" ? "Super Admin" : "Guest Viewer"}</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5 text-xs font-medium">
               <span className="relative flex size-2">
                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
               </span>
               System DB Online
             </div>
             
             <div className="size-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center cursor-pointer hover:ring-2 ring-indigo-500 transition-all">
               <User className="size-5 text-slate-300" />
             </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full relative">
          {/* Subtle gradient background mesh */}
          <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-indigo-500/10 to-transparent -z-10 blur-3xl pointer-events-none" />
          
          {children}
        </div>
      </main>
    </div>
  );
}
