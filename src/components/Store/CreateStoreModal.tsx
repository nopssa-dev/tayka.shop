import React, { useState } from "react";
import { X, Upload, Store, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CreateStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (storeData: any) => void;
}

const CreateStoreModal: React.FC<CreateStoreModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    phone: "",
    email: "",
    logo: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const categories = [
    "Textiles y Tejidos",
    "Cerámica y Alfarería",
    "Joyería Artesanal",
    "Instrumentos Musicales",
    "Artesanías en Madera",
    "Productos Alimentarios",
    "Decoración del Hogar",
    "Ropa Tradicional",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.category || !formData.location) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }
    onSubmit(formData);
    setFormData({
      name: "",
      description: "",
      category: "",
      location: "",
      phone: "",
      email: "",
      logo: null,
    });
    setPreview(null);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Store className="h-6 w-6 text-amber-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Crear Nueva Tienda</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la tienda *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="Ej: Artesanías de la Pachamama"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 resize-none"
                placeholder="Describe tu tienda, productos y la historia..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría Principal *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
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
                Ubicación *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="Ciudad, Departamento"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="+591 XXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email de contacto
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="contacto@mitienda.com"
              />
            </div>
          </div>

          {/* Upload con preview */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-400 transition-colors">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mx-auto h-24 object-contain mb-4 rounded"
              />
            ) : (
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            )}
            <p className="text-gray-600 mb-2">Logo de la tienda (opcional)</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="cursor-pointer mt-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 inline-flex items-center gap-2"
            >
              <ImageIcon className="h-4 w-4" /> Seleccionar archivo
            </label>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 font-medium"
            >
              Crear Tienda
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateStoreModal;