// Rolex (7 images)
import rolex1 from '../imgs/rolex/1.jpg';
import rolex2 from '../imgs/rolex/2.jpg';
import rolex3 from '../imgs/rolex/3.jpg';
import rolex4 from '../imgs/rolex/4.jpg';
import rolex5 from '../imgs/rolex/5.jpg';
import rolex6 from '../imgs/rolex/6.jpg';
import rolex7 from '../imgs/rolex/7.jpg';

// Tissot (4 images)
import tissot1 from '../imgs/tissot/1.jpg';
import tissot2 from '../imgs/tissot/2.jpg';
import tissot3 from '../imgs/tissot/3.jpg';
import tissot4 from '../imgs/tissot/4.jpg';

// Patek (4 images)
import patek1 from '../imgs/patek/1.jpg';
import patek2 from '../imgs/patek/2.jpg';
import patek3 from '../imgs/patek/3.jpg';
import patek4 from '../imgs/patek/4.jpg';

export const products = [
  {
    id: "patek-philippe-1",
    name: "Patek Philippe Nautilus",
    brand: "Patek Philippe",
    price: 199,
    currency: "DH",
    description: "Une montre d'exception alliant tradition horlogère suisse et design contemporain. Le Patek Philippe Nautilus est reconnu pour son boîtier octogonal distinctif et son bracelet intégré, offrant un confort exceptionnel au poignet.",
    images: [patek1, patek2, patek3, patek4],
    mainImage: patek1
  },
  {
    id: "rolex-submariner-1",
    name: "Rolex Submariner",
    brand: "Rolex",
    price: 199,
    currency: "DH",
    description: "L'iconique Rolex Submariner, référence mondiale des montres de plongée. Étanche jusqu'à 300 mètres, elle allie robustesse et élégance avec son boîtier en acier inoxydable et sa lunette rotative unidirectionnelle.",
    images: [rolex1, rolex2, rolex3, rolex4, rolex5, rolex6, rolex7],
    mainImage: rolex1
  },
  {
    id: "tissot-seastar-1",
    name: "Tissot Seastar",
    brand: "Tissot",
    price: 199,
    currency: "DH",
    description: "La Tissot Seastar combine sport et élégance avec son design moderne et sa résistance à l'eau. Parfaite pour les amateurs de montres sportives qui ne veulent pas compromettre le style.",
    images: [tissot1, tissot2, tissot3, tissot4],
    mainImage: tissot1
  }
];
