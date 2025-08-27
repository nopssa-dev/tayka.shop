import React from 'react';
import { ShoppingBag, Heart, Star, Search, Filter } from 'lucide-react';

const BuyerDashboard: React.FC = () => {
  const featuredProducts = [
    {
      id: '1',
      name: 'Poncho Andino Tradicional',
      price: 120,
      rating: 4.8,
      reviews: 24,
      image: './public/Poncho Andino.png',
      store: 'Artesanías de la Pachamama'
    },
    {
      id: '2',
      name: 'Chullo de Alpaca Premium',
      price: 45,
      rating: 4.9,
      reviews: 18,
      image: './public/Alpaca Premium.jpg',
      store: 'Textiles Andinos'
    },
    {
      id: '3',
      name: 'Manta Boliviana Colorida',
      price: 89,
      rating: 4.7,
      reviews: 31,
      image: './public/Manta Boliviana.jpg',
      store: 'Tradiciones del Altiplano'
    },
    {
      id: '4',
      name: 'Artesanía en Cerámica',
      price: 65,
      rating: 4.6,
      reviews: 12,
      image: 'https://images.pexels.com/photos/6069117/pexels-photo-6069117.jpeg?auto=compress&cs=tinysrgb&w=400',
      store: 'Cerámicas Ancestrales'
    }
  ];

  const categories = [
    { name: 'Textiles', count: 156, color: 'bg-red-100 text-red-800' },
    { name: 'Cerámica', count: 89, color: 'bg-blue-100 text-blue-800' },
    { name: 'Joyería', count: 67, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Artesanías', count: 134, color: 'bg-green-100 text-green-800' },
  ];

  return (
    <div className="space-y-6">
      <div className='ml-4 mt-5'>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Marketplace Tayka</h2>
        <p className="text-gray-600">Descubre productos auténticos de la cultura andina</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos, tiendas o categorías..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </button>
          <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
            Buscar
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorías Populares</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              className="text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">{category.name}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${category.color}`}>
                  {category.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Productos Destacados</h3>
          <button className="text-amber-600 hover:text-amber-700 font-medium">
            Ver todos
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-amber-700 transition-colors">
                  {product.name}
                </h4>
                
                <p className="text-xs text-gray-600">{product.store}</p>
                
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-amber-600 transition-colors">
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mis Pedidos Recientes</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div>
                <p className="font-medium text-gray-900">Poncho Andino Tradicional</p>
                <p className="text-sm text-gray-600">Pedido #TAY-2024-001</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">$120</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Entregado
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div>
                <p className="font-medium text-gray-900">Chullo de Alpaca Premium</p>
                <p className="text-sm text-gray-600">Pedido #TAY-2024-002</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">$45</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                En tránsito
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;