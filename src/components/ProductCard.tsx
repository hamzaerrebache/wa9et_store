import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  currency: string;
  images: string[];
  mainImage: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleReserve = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${product.id}#reserve-section`);
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-2xl hover:shadow-yellow-600/20 transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200"
      onClick={() => navigate(`/product/${product.id}#reserve-section`)}
    >
      <div className="relative h-80 group">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <ChevronRight className="w-4 h-4 text-gray-800" />
            </button>
          </>
        )}
        
        {/* Image indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-yellow-600' : 'bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.brand}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.name}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-yellow-600">
            {product.price} {product.currency}
          </span>
          <button
            onClick={handleReserve}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;