import { Outlet, NavLink } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  ShoppingBag, 
  Dumbbell, 
  Settings, 
  LogOut, 
  MessageSquare,
  Search,
  Bell
} from "lucide-react";
import { useState } from "react";
import { Chatbot } from "../components/Chatbot";

export function Root() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Users, label: "Alunos", href: "/students" },
    { icon: Wallet, label: "Financeiro", href: "/financial" },
    { icon: ShoppingBag, label: "Loja", href: "/store" },
    { icon: Dumbbell, label: "Treinos", href: "/workouts" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className={`bg-[#111111] border-r border-orange-500/20 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-lg">
            <Dumbbell className="text-black h-6 w-6" />
          </div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tighter">GYM<span className="text-orange-500">MAX</span></span>}
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${isActive 
                  ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'}
              `}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-500 transition-colors">
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-[#111111]/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Buscar alunos, produtos ou treinos..." 
              className="w-full bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-[#111111]"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-white/10 pl-6 text-sm">
              <div className="text-right hidden sm:block">
                <p className="font-medium">Admin</p>
                <p className="text-gray-500 text-xs">Administrador</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-orange-300 border-2 border-orange-500/20" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8 bg-black">
          <Outlet />
        </div>
      </main>

      <Chatbot />
    </div>
  );
}
