import React, { useState } from 'react';
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
      store: 'Artesanías de la Pachamama',
      category: 'Textiles',
    },
    {
      id: '2',
      name: 'Chullo de Alpaca Premium',
      price: 45,
      rating: 4.9,
      reviews: 18,
      image: './public/Alpaca Premium.jpg',
      store: 'Textiles Andinos',
      category: 'Textiles',
    },
    {
      id: '3',
      name: 'Manta Boliviana Colorida',
      price: 89,
      rating: 4.7,
      reviews: 31,
      image: './public/Manta Boliviana.jpg',
      store: 'Tradiciones del Altiplano',
      category: 'Textiles',
    },
    {
      id: '4',
      name: 'Artesanía en Cerámica',
      price: 65,
      rating: 4.6,
      reviews: 12,
      image: 'https://images.pexels.com/photos/6069117/pexels-photo-6069117.jpeg?auto=compress&cs=tinysrgb&w=400',
      store: 'Cerámicas Ancestrales',
      category: 'Cerámica',
    }
  ];

  const categories = [
    { name: 'Todos', count: featuredProducts.length, color: 'bg-gray-100 text-gray-800' },
    { name: 'Textiles', count: 156, color: 'bg-red-100 text-red-800' },
    { name: 'Cerámica', count: 89, color: 'bg-blue-100 text-blue-800' },
    { name: 'Joyería', count: 67, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Artesanías', count: 134, color: 'bg-green-100 text-green-800' },
  ];

  // 👇 Estado para categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  // 👇 Filtrar productos según categoría
  const filteredProducts =
    selectedCategory === 'Todos'
      ? featuredProducts
      : featuredProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className='ml-4 mt-4'>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Marketplace Tayka</h2>
        <p className="text-gray-600">Descubre productos auténticos de la cultura andina</p>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorías Populares</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)} // 👈 aquí se selecciona la categoría
              className={`text-left p-4 rounded-lg border transition-colors 
                ${selectedCategory === category.name ? 'bg-amber-100 border-amber-400' : 'hover:bg-gray-50 border-gray-200'}`}
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
          <h3 className="text-lg font-semibold text-gray-900">
            Productos Destacados {selectedCategory !== 'Todos' && `- ${selectedCategory}`}
          </h3>
          <button className="text-amber-600 hover:text-amber-700 font-medium">
            Ver todos
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
    </div>
  );
};

export default BuyerDashboard;
