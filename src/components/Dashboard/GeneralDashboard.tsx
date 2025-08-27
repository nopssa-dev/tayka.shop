import React from 'react';
import { Store, Package, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const GeneralDashboard: React.FC = () => {
  const { user } = useAuth();

  const welcomeMessages = {
    admin: 'Bienvenido al panel de administración',
    seller: 'Gestiona tu tienda y productos',
    buyer: 'Explora productos auténticos',
    distributor: 'Coordina entregas eficientemente'
  };

  const getWelcomeMessage = () => {
    if (!user?.roles.length) return 'Bienvenido a Tayka';
    
    const primaryRole = user.roles[0];
    return welcomeMessages[primaryRole] || 'Bienvenido a Tayka';
  };

  const quickActions = [
    {
      title: 'Explorar Marketplace',
      description: 'Descubre productos únicos de artesanos locales',
      icon: Store,
      color: 'bg-blue-500',
      available: user?.roles.includes('buyer')
    },
    {
      title: 'Gestionar Tienda',
      description: 'Administra tu tienda y productos',
      icon: Package,
      color: 'bg-green-500',
      available: user?.roles.includes('seller')
    },
    {
      title: 'Panel Admin',
      description: 'Administrar usuarios y contenido',
      icon: Users,
      color: 'bg-purple-500',
      available: user?.roles.includes('admin')
    },
    {
      title: 'Distribución',
      description: 'Gestionar entregas y logística',
      icon: TrendingUp,
      color: 'bg-orange-500',
      available: user?.roles.includes('distributor')
    }
  ].filter(action => action.available);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          ¡Bienvenido, {user?.name}!
        </h1>
        <p className="text-amber-100 text-lg mb-4">
          {getWelcomeMessage()}
        </p>
        <p className="text-amber-200 text-sm">
          Te damos la bienvenida a nuestra comunidad
        </p>
      </div>

      {/* Role Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tus Roles en Tayka</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {user?.roles.map((role) => {
            const roleInfo = {
              admin: { name: 'Administrador', color: 'bg-purple-100 text-purple-800', icon: '👑' },
              seller: { name: 'Vendedor', color: 'bg-green-100 text-green-800', icon: '🏪' },
              buyer: { name: 'Comprador', color: 'bg-blue-100 text-blue-800', icon: '🛍️' },
              distributor: { name: 'Distribuidor', color: 'bg-orange-100 text-orange-800', icon: '🚚' }
            };

            const info = roleInfo[role as keyof typeof roleInfo];
            
            return (
              <div key={role} className="text-center p-4 rounded-lg border border-gray-200">
                <div className="text-2xl mb-2">{info.icon}</div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${info.color}`}>
                  {info.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Acceso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  <div className={`${action.color} p-3 rounded-lg group-hover:scale-105 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 group-hover:text-gray-700">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* About Tayka */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre Tayka</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>Tayka</strong> significa "Madre Tierra" en aymara, reflejando nuestro compromiso 
              con preservar y promover la rica cultura andina.
            </p>
            <p>
              Conectamos artesanos locales con compradores de todo el mundo, manteniendo vivas 
              las tradiciones ancestrales mientras creamos oportunidades económicas sostenibles.
            </p>
            <p>
              Cada producto en nuestra plataforma cuenta una historia de tradición, 
              artesanía y respeto por la Pachamama.
            </p>
          </div>
        </div>

        {/* Community Stats */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Nuestra Comunidad</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Artesanos registrados</span>
              <span className="font-medium text-gray-900">247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Productos únicos</span>
              <span className="font-medium text-gray-900">1,456</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Comunidades representadas</span>
              <span className="font-medium text-gray-900">23</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Países alcanzados</span>
              <span className="font-medium text-gray-900">12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDashboard;