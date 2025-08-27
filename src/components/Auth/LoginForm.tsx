import React, { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    }
  };

  const demoAccounts = [
    { email: 'admin@tayka.com', label: 'Administrador' },
    { email: 'vendedor@tayka.com', label: 'Vendedor' },
    { email: 'comprador@tayka.com', label: 'Comprador' },
    { email: 'distribuidor@tayka.com', label: 'Distribuidor' },
  ];

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <LogIn className="h-5 w-5" />
          <span>{isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}</span>
        </button>
      </form>

      <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h3 className="text-sm font-medium text-amber-800 mb-3">Cuentas de demostración:</h3>
        <div className="space-y-2">
          {demoAccounts.map((account) => (
            <button
              key={account.email}
              onClick={() => {
                setEmail(account.email);
                setPassword('123456');
              }}
              className="block w-full text-left text-sm text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-2 py-1 rounded transition-colors"
            >
              <span className="font-medium">{account.label}:</span> {account.email}
            </button>
          ))}
        </div>
        <p className="text-xs text-amber-600 mt-2">Contraseña para todas: 123456</p>
      </div>
    </div>
  );
};

export default LoginForm;