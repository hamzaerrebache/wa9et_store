import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { products as productsData } from '../data/products';
import { Watch } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  currency: string;
  images: string[];
  mainImage: string;
  description: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // États pour gérer l'affichage du header au scroll
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll vers le bas et plus de 100px, cacher header
        setShowHeader(false);
      } else {
        // Scroll vers le haut, afficher header
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec animation */}
      <header
        className={`bg-white/90 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 shadow-sm transition-transform duration-300 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-2 rounded-lg">
              <Watch className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              <span className="text-yellow-600">Wa9et</span> Store
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2">
            Collection exclusive de montres de prestige
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
        }}
      >
        <div className="bg-black/50 py-16">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-5xl font-bold mb-6">Découvrez Notre Collection</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Des montres d'exception à prix accessible. Chaque pièce raconte une histoire de précision et d'élégance.
            </p>
            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-400">15+</div>
                <div>Modèles disponibles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">199 DH</div>
                <div>Prix unique</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">3</div>
                <div>Marques premium</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nos <span className="text-yellow-600">Montres</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-2 rounded-lg">
              <Watch className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              <span className="text-yellow-600">Wa9et</span> Store
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            Votre destination pour les montres de luxe à prix abordable
          </p>
          <p className="text-gray-500 text-sm">© 2025 Luxury Watches. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
