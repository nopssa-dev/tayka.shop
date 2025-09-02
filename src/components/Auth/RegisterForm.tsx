import React, { useState } from 'react';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import type { UserRole } from '../../types';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roles: [] as UserRole[],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const roleOptions = [
    { value: 'buyer' as UserRole, label: 'Comprador', description: 'Buscar y comprar productos' },
    { value: 'seller' as UserRole, label: 'Vendedor', description: 'Crear tienda y vender productos' },
    { value: 'distributor' as UserRole, label: 'Distribuidor', description: 'Gestionar logística y entregas' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    if (formData.roles.length === 0) {
      setError('Selecciona al menos un tipo de usuario');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3000/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrarse');
      }

      setSuccess('¡Usuario registrado con éxito!');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        roles: [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse. Asegúrate de que el servidor está funcionando.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData(prev => {
      const isSelected = prev.roles.includes(role);
      const newRoles = isSelected
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles: newRoles };
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            placeholder="Tu nombre completo"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all pr-12"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tipo de usuario (puedes seleccionar varios)
          </label>
          <div className="space-y-3">
            {roleOptions.map((role) => (
              <label key={role.value} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.roles.includes(role.value)}
                  onChange={() => handleRoleChange(role.value)}
                  className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">{role.label}</span>
                  <p className="text-xs text-gray-600">{role.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <UserPlus className="h-5 w-5" />
          <span>{isLoading ? 'Registrando...' : 'Crear cuenta'}</span>
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;