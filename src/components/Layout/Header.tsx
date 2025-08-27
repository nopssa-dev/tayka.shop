import React from 'react';
import { LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

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
    <header className="bg-white shadow-sm border-b border-amber-100 relative z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-amber-800">Tayka</h1>
            <span className="ml-2 text-sm text-amber-600 hidden sm:inline">
              Madre Tierra
            </span>
          </div>

          {user && (
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="items-center space-x-2 hidden sm:flex">
                <User className="h-5 w-5 text-amber-700" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{getRoleDisplay(user.roles)}</p>
                </div>
              </div>
              
              <div className="flex items-center sm:hidden">
                <User className="h-5 w-5 text-amber-700" />
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors hidden sm:block">
                <Settings className="h-5 w-5" />
              </button>
              
              <button
                onClick={logout}
                className="p-1 sm:p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;