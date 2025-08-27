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
  Crown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'seller', 'buyer', 'distributor'] },
    { id: 'admin', label: 'Administración', icon: Crown, roles: ['admin'] },
    { id: 'stores', label: 'Mi Tienda', icon: Store, roles: ['seller'] },
    { id: 'products', label: 'Productos', icon: Package, roles: ['seller'] },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, roles: ['buyer'] },
    { id: 'distribution', label: 'Distribución', icon: Truck, roles: ['distributor'] },
    { id: 'analytics', label: 'Análisis', icon: BarChart3, roles: ['seller', 'admin'] },
    { id: 'users', label: 'Usuarios', icon: Users, roles: ['admin'] },
    { id: 'settings', label: 'Configuración', icon: Settings, roles: ['admin', 'seller', 'buyer', 'distributor'] },
  ];

  const visibleItems = menuItems.filter(item => 
    user?.roles.some(role => item.roles.includes(role))
  );

  return (
    <aside className="bg-gradient-to-b from-amber-50 to-orange-50 w-64 shadow-sm border-r border-amber-100 hidden lg:block">
      <div className="p-4 lg:p-6">
        <nav className="space-y-2">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-200 text-amber-900 shadow-sm'
                    : 'text-amber-700 hover:bg-amber-100 hover:text-amber-900'
                }`}
              >
                <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
                <span className="font-medium text-sm lg:text-base">{item.label}</span>
              </button>
            );
          })}
        </nav>
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