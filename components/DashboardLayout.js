"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Wallet, Settings, LayoutDashboard, User, Check, Menu, X } from "lucide-react";

export default function DashboardLayout({ children, role, setRole }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 shrink-0 flex flex-col border-r border-white/5 bg-slate-950/95 md:bg-slate-950/50 backdrop-blur-xl transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
              <Wallet className="size-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Zorvyn</span>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main</div>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">
            <LayoutDashboard className="size-5" />
            Dashboard
          </button>

          <div className="mt-8 px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Simulate Role</div>

          <button
            onClick={() => {
              setRole("admin");
              setIsMobileMenuOpen(false);
            }}
            className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors border border-transparent", role === "admin" ? "bg-slate-800 text-white border-white/10" : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200")}
          >
            <div className="flex items-center gap-3">
              <Settings className="size-5" />
              Admin
            </div>
            {role === "admin" && <Check className="size-4 text-indigo-400" />}
          </button>

          <button
            onClick={() => {
              setRole("viewer");
              setIsMobileMenuOpen(false);
            }}
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
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto bg-slate-950 relative z-10 w-full">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
            >
              <Menu className="size-5" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">Overview</h1>
              <p className="hidden md:block text-sm text-slate-400">Welcome back, {role === "admin" ? "Super Admin" : "Guest Viewer"}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Online Indicator Status Removed as per user previous manual edit */}
            <div className="size-9 md:size-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center cursor-pointer hover:ring-2 ring-indigo-500 transition-all">
              <User className="size-4 md:size-5 text-slate-300" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full relative">
          {/* Subtle gradient background mesh */}
          <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-indigo-500/10 to-transparent -z-10 blur-3xl pointer-events-none" />

          {children}
        </div>
      </main>
    </div>
  );
}
