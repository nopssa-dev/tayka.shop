import React from 'react';
import { Truck, Package, MapPin, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const DistributorDashboard: React.FC = () => {
  const stats = [
    { label: 'Entregas Pendientes', value: '23', icon: Truck, color: 'bg-orange-500' },
    { label: 'Entregas del Mes', value: '156', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Rutas Activas', value: '8', icon: MapPin, color: 'bg-blue-500' },
    { label: 'Tiempo Promedio', value: '2.4h', icon: Clock, color: 'bg-purple-500' },
  ];

  const deliveries = [
    {
      id: 'TAY-DEL-001',
      customer: 'María González',
      address: 'Av. 16 de Julio, La Paz',
      products: 'Poncho Andino, Chullo de Alpaca',
      status: 'pending',
      priority: 'high',
      estimatedTime: '2 horas'
    },
    {
      id: 'TAY-DEL-002',
      customer: 'Carlos Mamani',
      address: 'Zona Sur, La Paz',
      products: 'Manta Boliviana',
      status: 'in-transit',
      priority: 'medium',
      estimatedTime: '1.5 horas'
    },
    {
      id: 'TAY-DEL-003',
      customer: 'Ana Quispe',
      address: 'El Alto, La Paz',
      products: 'Artesanía en Cerámica x2',
      status: 'delivered',
      priority: 'low',
      estimatedTime: 'Completado'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-transit': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'in-transit': return 'En tránsito';
      case 'delivered': return 'Entregado';
      default: return 'Desconocido';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 ml-4 mt-4">Panel de Distribución</h2>
        <p className="text-gray-600 ml-4">Gestiona entregas y logística</p>
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

      {/* Map Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mapa de Rutas</h3>
        <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Mapa interactivo de rutas de entrega</p>
            <p className="text-sm text-gray-500 mt-2">
              Integración con Google Maps próximamente
            </p>
          </div>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Entregas de Hoy</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {deliveries.map((delivery) => (
            <div key={delivery.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">#{delivery.id}</span>
                    {getPriorityIcon(delivery.priority)}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                      {getStatusText(delivery.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{delivery.customer}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {delivery.address}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-900">Productos</p>
                      <p className="text-sm text-gray-600">{delivery.products}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tiempo Estimado</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {delivery.estimatedTime}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4 flex space-x-2">
                  {delivery.status === 'pending' && (
                    <button className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      Iniciar Entrega
                    </button>
                  )}
                  {delivery.status === 'in-transit' && (
                    <button className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                      Marcar Entregado
                    </button>
                  )}
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">Crear Nueva Ruta</p>
                  <p className="text-sm text-gray-600">Optimizar entregas por zona</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">Gestionar Inventario</p>
                  <p className="text-sm text-gray-600">Ver productos en almacén</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas del Día</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Entregas completadas</span>
              <span className="font-medium text-gray-900">8/12</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '67%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tiempo promedio</span>
              <span className="font-medium text-gray-900">2.4 horas</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Satisfacción cliente</span>
              <span className="font-medium text-gray-900">4.8⭐</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorDashboard;