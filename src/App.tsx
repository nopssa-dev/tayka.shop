import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/Landing/LandingPage';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import GeneralDashboard from './components/Dashboard/GeneralDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import SellerDashboard from './components/Dashboard/SellerDashboard';
import BuyerDashboard from './components/Dashboard/BuyerDashboard';
import DistributorDashboard from './components/Dashboard/DistributorDashboard';

interface AuthScreenProps {
  onBackToLanding: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onBackToLanding }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative">
      <button
        onClick={onBackToLanding}
        className="absolute top-4 left-4 z-10 text-amber-700 hover:text-amber-900 transition-colors"
      >
        ← Volver al inicio
      </button>
      
      <div className="flex items-center justify-center min-h-screen p-4 pt-16">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-amber-800 mb-4">Tayka</h1>
            <p className="text-xl text-amber-700 mb-2">Madre Tierra</p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conectando artesanos de la cultura andina con el mundo. 
              Descubre productos únicos que preservan tradiciones ancestrales.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              {/* Form Section */}
              <div className="p-6 sm:p-8 lg:p-12">
                <div className="mb-8">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setIsLogin(true)}
                      className={`flex-1 py-2 px-4 rounded-md text-center transition-all ${
                        isLogin 
                          ? 'bg-white text-amber-700 shadow-sm font-medium' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Iniciar Sesión
                    </button>
                    <button
                      onClick={() => setIsLogin(false)}
                      className={`flex-1 py-2 px-4 rounded-md text-center transition-all ${
                        !isLogin 
                          ? 'bg-white text-amber-700 shadow-sm font-medium' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Registrarse
                    </button>
                  </div>
                </div>

                {isLogin ? <LoginForm /> : <RegisterForm />}
              </div>

              {/* Hero Section */}
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-6 sm:p-8 lg:p-12 text-white flex flex-col justify-center">
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    {isLogin ? '¡Bienvenido a Tayka!' : 'Únete a Tayka'}
                  </h2>
                  <p className="text-amber-100 text-base sm:text-lg">
                    {isLogin 
                      ? 'Bienvenido de vuelta a nuestra comunidad de artesanos y compradores conscientes.'
                      : 'Forma parte de una comunidad que valora la artesanía tradicional y el comercio justo.'
                    }
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                      <span className="text-amber-100">Productos auténticos hechos a mano</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                      <span className="text-amber-100">Apoyo directo a artesanos locales</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                      <span className="text-amber-100">Preservación de tradiciones ancestrales</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                      <span className="text-amber-100">Comercio justo y sostenible</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainApp: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [showLanding, setShowLanding] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700">Cargando...</p>
        </div>
      </div>
    );
  }

  if (showLanding && !user) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  if (!user) {
    return <AuthScreen onBackToLanding={() => setShowLanding(true)} />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'admin':
        return <AdminDashboard />;
      case 'stores':
      case 'products':
        return <SellerDashboard />;
      case 'marketplace':
        return <BuyerDashboard />;
      case 'distribution':
        return <DistributorDashboard />;
      default:
        return <GeneralDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;