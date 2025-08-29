import React from 'react';
import {
  Home,
  Store,
  Package,
  Users,
  Truck,
  ShoppingBag,
  BarChart3,
  Settings,
  Crown,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'seller', 'buyer', 'distributor'], section: 'General' },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, roles: ['buyer'], section: 'General' },
    { id: 'stores', label: 'Mi Tienda', icon: Store, roles: ['seller'], section: 'Gestión' },
    { id: 'products', label: 'Productos', icon: Package, roles: ['seller'], section: 'Gestión' },
    { id: 'distribution', label: 'Distribución', icon: Truck, roles: ['distributor'], section: 'Gestión' },
    { id: 'analytics', label: 'Análisis', icon: BarChart3, roles: ['seller', 'admin'], section: 'Gestión' },
    { id: 'admin', label: 'Administración', icon: Crown, roles: ['admin'], section: 'Administración' },
    { id: 'users', label: 'Usuarios', icon: Users, roles: ['admin'], section: 'Administración' },
    { id: 'settings', label: 'Configuración', icon: Settings, roles: ['admin', 'seller', 'buyer', 'distributor'], section: 'Configuración' },
  ];

  const visibleItems = menuItems.filter((item) =>
    user?.roles.some((role) => item.roles.includes(role))
  );

  // Agrupar por sección
  const groupedItems = visibleItems.reduce<Record<string, typeof visibleItems>>((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <aside className="bg-gradient-to-b from-amber-50 to-orange-50 w-64 shadow-sm border-r border-amber-100 hidden lg:flex flex-col">

      {/* Menú con scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.keys(groupedItems).map((section) => (
          <div key={section}>
            <p className="px-4 mb-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
              {section}
            </p>
            <nav className="space-y-2">
              {groupedItems[section].map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    whileHover={{ scale: 1.02 }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left relative transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-200 text-amber-900 shadow-sm'
                        : 'text-amber-700 hover:bg-amber-100 hover:text-amber-900'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-amber-600 rounded-r"
                      />
                    )}
                    <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
                    <span className="font-medium text-sm lg:text-base">{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 gap-1 p-2">
          {visibleItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
