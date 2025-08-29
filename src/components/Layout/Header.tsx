import React, { useState } from 'react';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const getRoleDisplay = (roles: string[]) => {
    const roleNames = {
      admin: 'Administrador',
      seller: 'Vendedor',
      buyer: 'Comprador',
      distributor: 'Distribuidor',
    };
    return roles.map(role => roleNames[role as keyof typeof roleNames]).join(', ');
  };

  return (
    <header className="bg-white shadow-md border-b border-amber-100 relative z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-amber-800">Tayka</h1>
            <span className="ml-2 text-sm text-amber-600 hidden sm:inline mt-2">
              Madre Tierra
            </span>
          </div>

          {/* User section */}
          {user && (
            <div className="relative">
              {/* Avatar + nombre */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-amber-50 transition"
              >
                <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold">
                  {user?.name?.[0] || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{getRoleDisplay(user.roles)}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-amber-700 hidden sm:block" />
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">
                      <User className="h-4 w-4 mr-2 text-amber-600" /> Perfil
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">
                      <Settings className="h-4 w-4 mr-2 text-amber-600" /> Configuración
                    </button>
                    <button
                      onClick={logout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Cerrar sesión
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
