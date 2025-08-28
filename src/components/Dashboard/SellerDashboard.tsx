import React, { useState } from 'react';
import { Store, Package, TrendingUp, Plus, Eye, Edit, Star, MapPin } from 'lucide-react';
import CreateStoreModal from '../Store/CreateStoreModal';
import CreateProductModal from '../Products/CreateProductModal';

const SellerDashboard: React.FC = () => {
  const [showCreateStore, setShowCreateStore] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [hasStore, setHasStore] = useState(false);
  const [storeData, setStoreData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  const stats = [
    { label: 'Productos Activos', value: '24', icon: Package, color: 'bg-blue-500' },
    { label: 'Ventas del Mes', value: '$2,340', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Visitas a la Tienda', value: '1,456', icon: Eye, color: 'bg-purple-500' },
  ];

  const handleCreateStore = (newStoreData: any) => {
    setStoreData(newStoreData);
    setHasStore(true);
    setShowCreateStore(false);
  };

  const handleCreateProduct = (productData: any) => {
    const newProduct = {
      id: Date.now().toString(),
      ...productData,
      sales: 0,
      createdAt: new Date()
    };
    setProducts(prev => [...prev, newProduct]);
    setShowCreateProduct(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 ml-4 mt-5">Mi Tienda</h2>
          <p className="text-gray-600 ml-4 mt-5">Gestiona tu tienda y productos</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          {!hasStore && (
            <button
              onClick={() => setShowCreateStore(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-3 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 transition-all flex items-center justify-center space-x-2 mr-5 mt-5"
            >
              <Plus className="h-4 w-4" />
              <span>Crear Tienda</span>
            </button>
          )}
          {hasStore && (
            <button
              onClick={() => setShowCreateProduct(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Agregar Producto</span>
            </button>
          )}
        </div>
      </div>

      <CreateStoreModal
        isOpen={showCreateStore}
        onClose={() => setShowCreateStore(false)}
        onSubmit={handleCreateStore}
      />

      <CreateProductModal
        isOpen={showCreateProduct}
        onClose={() => setShowCreateProduct(false)}
        onSubmit={handleCreateProduct}
      />

      {!hasStore ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Store className="h-8 w-8 text-amber-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              ¡Crea tu primera tienda!
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Comienza tu viaje como vendedor en Tayka. Crea tu tienda virtual y 
              comparte tus productos artesanales con el mundo.
            </p>
            <button
              onClick={() => setShowCreateStore(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 transition-all flex items-center justify-center space-x-2 mx-auto"
            >
              <Plus className="h-5 w-5" />
              <span>Crear mi tienda</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className={`${stat.color} p-2 sm:p-3 rounded-lg`}>
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Store Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <h3 className="text-lg font-semibold text-gray-900">{storeData?.name || 'Mi Tienda'}</h3>
              <button className="text-amber-600 hover:text-amber-700 flex items-center space-x-1 self-start sm:self-auto">
                <Edit className="h-4 w-4" />
                <span>Editar</span>
              </button>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {storeData?.description || 'Productos artesanales auténticos de la cultura andina.'}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {storeData?.location || 'La Paz, Bolivia'}
              </span>
              <span className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                4.8 (156 reseñas)
              </span>
              <span>🎯 Miembro desde 2023</span>
            </div>
          </div>

          {/* Products Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-900">Mis Productos</h3>
                <button
                  onClick={() => setShowCreateProduct(true)}
                  className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Agregar Producto</span>
                </button>
              </div>
            </div>
            
            {products.length === 0 ? (
              <div className="p-6 sm:p-8 text-center">
                <div className="max-w-sm mx-auto">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="h-8 w-8 text-green-700" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Agrega tu primer producto
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Comienza a vender agregando productos a tu tienda.
                  </p>
                  <button
                    onClick={() => setShowCreateProduct(true)}
                    className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Agregar producto</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="hidden sm:block">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Producto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Precio
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ventas
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {product.images && product.images[0] && (
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="h-10 w-10 rounded-lg object-cover mr-3"
                                />
                              )}
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">Bs. {product.price}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.stock}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.sales}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-amber-600 hover:text-amber-900 mr-3">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Mobile view */}
                <div className="sm:hidden divide-y divide-gray-200">
                  {products.map((product) => (
                    <div key={product.id} className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        {product.images && product.images[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-600">Bs. {product.price}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Stock:</span>
                          <span className="ml-1 font-medium">{product.stock}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Ventas:</span>
                          <span className="ml-1 font-medium">{product.sales}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <button className="flex-1 px-3 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors text-sm">
                          Editar
                        </button>
                        <button className="flex-1 px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                          Ver
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SellerDashboard;