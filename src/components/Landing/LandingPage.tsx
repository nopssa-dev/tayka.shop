import { Users, Store, Truck, ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import { AnimatePresence, motion, } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useState, useEffect, useCallback } from "react";

interface LandingPageProps {
  onGetStarted: () => void;
}

interface FeaturedStore {
  name: string;
  description: string;
  image: string;
}

interface KPI {
  label: string;
  value: string;
}

interface Testimonial {
  name: string;
  place: string;
  text: string;
  avatar: string;
}

interface CommunityData {
  name: string;
  Vendedores: number;
  Compradores: number;
  Distribuidores: number;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const featuredStores: FeaturedStore[] = [
    {
      name: 'Textiles Quispe',
      description: 'Productos tradicionales elaborados a mano por artesanos locales.',
      image: './Tejedora.png',
    },
    {
      name: 'Artesanías Andean',
      description: 'Hermosas piezas de cerámica inspiradas en la cultura incaica.',
      image: './Taller.png',
    },
    {
      name: 'Joyas del Sur',
      description: 'Joyería artesanal con piedras preciosas de los Andes.',
      image: './Joyas.png',
    },
  ];

  const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};


  const [currentStore, setCurrentStore] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  const nextStore = () => {
    setSlideDirection(1);
    setCurrentStore((prev) => (prev + 1) % featuredStores!.length);
  };

  const prevStore = () => {
    setSlideDirection(-1);
    setCurrentStore((prev) =>
      prev === 0 ? featuredStores!.length - 1 : prev - 1
    );
  };

  // Autoplay
  useEffect(() => {
    const id = setInterval(() => {
      setSlideDirection(1);
      setCurrentStore((prev) => (prev + 1) % featuredStores!.length);
    }, 7000);

    return () => clearInterval(id);
  }, [featuredStores!.length]);


  const communityData: CommunityData[] = [
    { name: 'Ene', Vendedores: 120, Compradores: 200, Distribuidores: 80 },
    { name: 'Feb', Vendedores: 150, Compradores: 260, Distribuidores: 90 },
    { name: 'Mar', Vendedores: 180, Compradores: 300, Distribuidores: 120 },
    { name: 'Abr', Vendedores: 220, Compradores: 360, Distribuidores: 140 },
    { name: 'May', Vendedores: 240, Compradores: 380, Distribuidores: 150 },
    { name: 'Jun', Vendedores: 270, Compradores: 410, Distribuidores: 170 },
  ];

  const KPIs: KPI[] = [
    { label: 'Tiendas activas', value: '1.2k' },
    { label: 'Transacciones / mes', value: '4.5k' },
    { label: 'Calificación promedio', value: '4.8' },
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'María Quispe',
      place: 'Piedecuesta',
      text: 'Tayka me permitió llevar mis textiles aymaras a clientes de todo el mundo.',
      avatar: 'https://images.unsplash.com/photo-1545996124-1f1e4b31b1c4?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
    },
    {
      name: 'Carlos Mamani',
      place: 'Ciudad Teyuna',
      text: 'Como distribuidor, Tayka me ayuda a optimizar rutas y conectar con vendedores.',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
    },
    {
      name: 'Ana Condori',
      place: 'La Mesa de los Santos',
      text: 'Encontré productos únicos que preservan nuestra cultura.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-orange-100 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-lg">
              <img className="h-24 w-full text-amber-600" src="./taykalogo.png" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Madre Tierra • Mercado tradicional</div>
            </div>
          </div>

            <div className="flex items-center gap-3">
            <nav className="hidden md:flex gap-6 text-gray-700">
              <a href="#estadisticas" className="hover:text-amber-600 transition">
                Estadísticas
              </a>
              <a href="#caracteristicas" className="hover:text-amber-600 transition">
                Características
              </a>
              <a href="#historias" className="hover:text-amber-600 transition">
                Historias
              </a>
            </nav>



            <div className="flex items-center gap-2">
              <button
                onClick={onGetStarted}
                className="hidden sm:inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2 rounded-lg shadow hover:bg-amber-700 transition p-5x-7 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.03] transition"
              >
                Comenzar
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Texto lado izquierdo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, delay: 0.2 }}
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Bienvenido a <span className="text-amber-600">Tayka</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-xl">
            Conectamos vendedores, compradores y distribuidores celebrando la
            cultura andina y apoyando a las comunidades locales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-3 bg-amber-600 text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.03] transition"
            >
              Empezar
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                const section = document.getElementById("estadisticas");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 border border-gray-200 px-7 py-3 rounded-xl bg-white hover:shadow-md transition"
            >
              Ver estadísticas
            </button>

          </div>
        </motion.div>

        {/* Slider lado derecho */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="relative rounded-3xl shadow-2xl overflow-hidden aspect-[16/10]">
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={currentStore}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.5, ease: "easeInOut" }} // ⬅️ más lento
                className="absolute inset-0"
              >
                <img
                  src={featuredStores[currentStore].image}
                  alt={featuredStores[currentStore].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 via-black/30 to-transparent backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-full bg-amber-500/90 p-2 shadow">
                      <Store className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-200 uppercase tracking-wide">
                        Tienda destacada
                      </div>
                      <div className="font-bold text-white text-lg">
                        {featuredStores[currentStore].name}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-100">
                    {featuredStores[currentStore].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Botones navegacion */}
            <button
              onClick={prevStore}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-black/60 to-black/20 text-white p-3 rounded-full hover:scale-110 transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextStore}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-black/60 to-black/20 text-white p-3 rounded-full hover:scale-110 transition"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Indicadores (dots) */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {featuredStores.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2 w-2 rounded-full transition-all ${
                    idx === currentStore ? "bg-amber-500 w-4" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>


      {/* Stats / Charts */}
      <section id="estadisticas" className="py-20 bg-white scroll-mt-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 bg-amber-50 p-6 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Crecimiento de la comunidad (6 meses)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={communityData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVendedores" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorCompradores" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="Vendedores" stroke="#f59e0b" fillOpacity={1} fill="url(#colorVendedores)" />
                    <Area type="monotone" dataKey="Compradores" stroke="#10b981" fillOpacity={1} fill="url(#colorCompradores)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:w-1/2 bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Distribuidores vs Transacciones</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={communityData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Distribuidores" radius={[8, 8, 0, 0]} fill="#3b82f6" />
                    <Bar dataKey="Vendedores" radius={[8, 8, 0, 0]} fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="caracteristicas" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 scroll-mt-30">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Una plataforma para todos</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">Herramientas pensadas para vendedores, compradores y distribuidores con respeto por la tradición.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <motion.div whileHover={{ scale: 1.03 }} className="p-6 rounded-2xl bg-white shadow">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Store className="h-8 w-8 text-amber-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Vendedores</h3>
            <p className="text-gray-600">Crea y personaliza tu tienda, administra inventario y llega a nuevos mercados.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="p-6 rounded-2xl bg-white shadow">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Compradores</h3>
            <p className="text-gray-600">Encuentra piezas únicas, apoya a artesanos y compra con seguridad.</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="p-6 rounded-2xl bg-white shadow">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-cyan-50 rounded-lg">
                <Truck className="h-8 w-8 text-cyan-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Distribuidores</h3>
            <p className="text-gray-600">Optima rutas, organiza envíos y colabora con tiendas locales.</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="historias" className="py-20 bg-white scroll-mt-30">
        <div className="max-w-7xl mx-auto px-4 text-center mb-8">
          <h2 className="text-3xl font-bold">Historias de nuestra comunidad</h2>
          <p className="text-gray-600 mt-2">Voces reales que comparten el impacto de Tayka.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.div key={t.name} whileHover={{ y: -6 }} className="bg-amber-50 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.place}</div>
                </div>
              </div>
              <p className="text-gray-700">"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h3 className="text-3xl font-bold mb-3">Únete a Tayka hoy</h3>
          <p className="mb-6 text-amber-100">Crear una cuenta es gratis — empieza a compartir y vender productos auténticos.</p>
          <div className="flex justify-center gap-4">
            <button onClick={onGetStarted} className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold shadow">Crear cuenta</button>
            <button onClick={() => alert('Nuestro Contato: +57 123 4567 8910')} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/30 bg-white/10">Contacto <Mail className="h-4 w-4" /></button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-1 rounded-md">
                <img src="./taykalogo.png" alt="" className="h-24 w-full"/>
              </div>
              <div>
                <div className="font-bold text-lg">Tayka</div>
                <div className="text-xs text-gray-400">Mercado tradicional • Conexión cultural</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Tayka. Todos los derechos reservados.</p>
          </div>

          <div className="text-gray-300">
            <div className="font-semibold mb-2">Nuestras Redes Sociales</div>
            <ul className="space-y-1 text-sm">
              <li className="hover:text-white transition">Instagram</li>
              <li className="hover:text-white transition">TikTok</li>
              <li className="hover:text-white transition">Facebook</li>
            </ul>
          </div>

          <div className="text-gray-300">
            <div className="font-semibold mb-2">Contacto</div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4" /> <span>TaykaShop@gmail.com</span>
            </div>
            <div className="mt-3 text-sm text-gray-400">Síguenos en redes para conocer eventos y ventas especiales.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}