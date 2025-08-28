import React, { useState } from 'react';
import { X, Package, Plus, Minus } from 'lucide-react';

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: any) => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    materials: '',
    dimensions: '',
    weight: '',
    origin: '',
    craftingTime: ''
  });

  const [images, setImages] = useState<string[]>([]);

  const categories = [
    'Textiles y Tejidos',
    'Cerámica y Alfarería',
    'Joyería Artesanal',
    'Instrumentos Musicales',
    'Artesanías en Madera',
    'Productos Alimentarios',
    'Decoración del Hogar',
    'Ropa Tradicional'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, images });
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
      materials: '',
      dimensions: '',
      weight: '',
      origin: '',
      craftingTime: ''
    });
    setImages([]);
  };

  const addImagePlaceholder = () => {
    setImages(prev => [...prev, `https://images.pexels.com/photos/6069113/pexels-photo-6069113.jpeg?auto=compress&cs=tinysrgb&w=400`]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Package className="h-6 w-6 text-green-700" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Agregar Nuevo Producto</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del producto *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Ej: Poncho Andino Tradicional"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe el producto, su historia, técnicas utilizadas, significado cultural..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio (Bs.) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock disponible *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Materiales utilizados
              </label>
              <input
                type="text"
                value={formData.materials}
                onChange={(e) => setFormData(prev => ({ ...prev, materials: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Ej: Lana de alpaca, algodón orgánico"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimensiones
              </label>
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Ej: 150cm x 120cm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso (gramos)
              </label>
              <input
                type="number"
                min="0"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lugar de origen
              </label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Ej: Comunidad de Tarabuco, Chuquisaca"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiempo de elaboración
              </label>
              <input
                type="text"
                value={formData.craftingTime}
                onChange={(e) => setFormData(prev => ({ ...prev, craftingTime: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Ej: 2 semanas"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Imágenes del producto
            </label>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Producto ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              {images.length < 6 && (
                <button
                  type="button"
                  onClick={addImagePlaceholder}
                  className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-amber-400 transition-colors"
                >
                  <Plus className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Agregar imagen</span>
                </button>
              )}
            </div>
            
            <p className="text-sm text-gray-500">
              Puedes agregar hasta 6 imágenes. La primera imagen será la principal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-medium"
            >
              Agregar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;