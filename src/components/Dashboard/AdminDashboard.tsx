import React from 'react';
import { Users, Store, Package, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Usuarios Totales', value: '1,247', icon: Users, color: 'bg-blue-500' },
    { label: 'Tiendas Activas', value: '89', icon: Store, color: 'bg-green-500' },
    { label: 'Productos', value: '3,456', icon: Package, color: 'bg-purple-500' },
    { label: 'Ventas del Mes', value: '$12,450', icon: TrendingUp, color: 'bg-amber-500' },
  ];

  const recentActivity = [
    { type: 'success', message: 'Nueva tienda "Artesanías Andinas" registrada', time: '2 min' },
    { type: 'warning', message: 'Producto reportado por contenido inapropiado', time: '15 min' },
    { type: 'success', message: 'Usuario "María Condori" verificado como vendedor', time: '1 hora' },
    { type: 'warning', message: 'Tienda "Textiles Bolivianos" requiere verificación', time: '2 horas' },
  ];

  return (
    <div className="space-y-6">
      <div className='ml-4 mt-5'>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Panel de Administración</h2>
        <p className="text-gray-600">Gestiona la plataforma Tayka</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                {activity.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">hace {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">Gestionar Usuarios</p>
                  <p className="text-sm text-gray-600">Ver y moderar cuentas de usuario</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Store className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">Verificar Tiendas</p>
                  <p className="text-sm text-gray-600">Revisar solicitudes de tiendas</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="font-medium text-gray-900">Moderar Productos</p>
                  <p className="text-sm text-gray-600">Revisar productos reportados</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;