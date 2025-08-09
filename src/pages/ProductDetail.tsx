import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Star, Shield, Truck, User, Phone, MapPin, Package } from 'lucide-react';
import { products as productsData } from '../data/products'; // ✅ Correct import

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

interface FormData {
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  quantite: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    quantite: 1
  });

useEffect(() => {
  const foundProduct = productsData.find((p) => p.id === id);
  if (foundProduct) {
    setProduct(foundProduct);
  }
}, [id]);

  useEffect(() => {
    if (product && location.hash) {
      const sectionId = location.hash.replace("#", "");
      // Wait until DOM is ready before scrolling
      setTimeout(() => {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }
  }, [product, location.hash]);


  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-900 text-center">
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantite' ? parseInt(value) || 1 : value
    }));
  };

const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const selectedImagePath = product.images[selectedImageIndex];

  const message = `🕐 *NOUVELLE RÉSERVATION*

*Produit:* ${product.brand} ${product.name}
*Image sélectionnée:* ${selectedImagePath}
*Prix unitaire:* ${product.price} ${product.currency}
*Quantité:* ${formData.quantite}
*Total:* ${product.price * formData.quantite} ${product.currency}

👤 *Informations client:*
*Nom:* ${formData.nom}
*Prénom:* ${formData.prenom}
*Téléphone:* ${formData.telephone}
*Adresse:* ${formData.adresse}

Merci de confirmer cette réservation.`;

  const whatsappUrl = `https://wa.me/212689585941?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div         
                id="reserve-section"
                className="aspect-square rounded-xl overflow-hidden bg-white border border-gray-200 shadow-lg">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all shadow-md ${
                    selectedImageIndex === index
                      ? 'border-yellow-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-xl text-yellow-600 font-semibold">{product.brand}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <span className="text-gray-600">(4.9/5)</span>
            </div>

            <div className="text-4xl font-bold text-yellow-600">
              {product.price} {product.currency}
            </div>

            {/* <div className="prose">
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>
            </div> */}

          

            {/* Reservation Form */}
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition-colors duration-200"
              >
                Réserver cette montre
              </button>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Formulaire de Réservation
                </h3>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="06 XX XX XX XX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Adresse *
                    </label>
                    <textarea
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Votre adresse complète"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Package className="w-4 h-4 inline mr-2" />
                      Quantité
                    </label>
                    <input
                      type="number"
                      name="quantite"
                      value={formData.quantite}
                      onChange={handleInputChange}
                      min="1"
                      max="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span className="text-gray-700">Total:</span>
                      <span className="text-yellow-600">
                        {product.price * formData.quantite} {product.currency}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Envoyer via WhatsApp</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="text-center text-gray-500 text-sm">
                Contactez-nous au: +212 689 585 941
            </div>
          </div>
        </div>

          {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-md">
                <Shield className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-gray-900 font-semibold">Garantie</div>
                <div className="text-gray-600 text-sm">2 ans</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-md">
                <Truck className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-gray-900 font-semibold">Livraison</div>
                <div className="text-gray-600 text-sm">Gratuite</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-md">
                <MessageCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-gray-900 font-semibold">Support</div>
                <div className="text-gray-600 text-sm">24/7</div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default ProductDetail;