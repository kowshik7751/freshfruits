import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: 'f1',
    name: 'Alphonso Mangoes (Grade A)',
    category: 'Tropical',
    price: 18.99,
    unit: 'box (12 pcs)',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 128,
    badge: 'Seasonal King',
    description: 'The king of mangoes! Hand-picked at peak ripeness from certified orchards in Ratnagiri. Rich, creamy, saffron-hued pulp with an unforgettable sweet aroma.',
    origin: 'Ratnagiri, India',
    nutrition: {
      calories: '60 kcal per 100g',
      vitamins: ['Vitamin C', 'Vitamin A', 'Vitamin E', 'Potassium'],
      fiber: '1.6g',
      sugar: '13.7g'
    },
    inStock: true,
    reviews: [
      { id: 'r1', author: 'Priya Sharma', rating: 5, date: '2 days ago', comment: 'Absolute perfection! Sweet, fragrant, and zero fiber. Worth every penny.', verified: true },
      { id: 'r2', author: 'David Miller', rating: 5, date: '1 week ago', comment: 'Arrived in pristine condition. Best mangoes I have had outside of Asia.', verified: true }
    ]
  },
  {
    id: 'f2',
    name: 'Organic Chilean Blueberries',
    category: 'Berries',
    price: 6.99,
    unit: 'pack (250g)',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 94,
    badge: 'Superfood',
    description: 'Plump, crisp, and bursting with antioxidants. Grown in mineral-rich Andean soils under pristine mountain sunshine.',
    origin: 'Biobío, Chile',
    nutrition: {
      calories: '57 kcal per 100g',
      vitamins: ['Vitamin K', 'Vitamin C', 'Manganese'],
      fiber: '2.4g',
      sugar: '9.9g'
    },
    inStock: true,
    reviews: [
      { id: 'r3', author: 'Elena Rostova', rating: 5, date: 'Yesterday', comment: 'Super fresh and plump. Excellent for morning yogurt bowls.', verified: true }
    ]
  },
  {
    id: 'f3',
    name: 'Hass Avocados',
    category: 'Exotic',
    price: 5.49,
    unit: 'pack of 4',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 210,
    badge: 'Best Seller',
    description: 'Creamy texture and rich, nutty flavor. Perfect for avocado toast, salads, and fresh guacamole.',
    origin: 'Michoacán, Mexico',
    nutrition: {
      calories: '160 kcal per 100g',
      vitamins: ['Healthy Fats', 'Vitamin E', 'Vitamin B6', 'Folate'],
      fiber: '6.7g',
      sugar: '0.7g'
    },
    inStock: true,
    reviews: [
      { id: 'r4', author: 'Marcus Vance', rating: 4, date: '3 days ago', comment: 'Ripened evenly over 3 days. Creamy and delicious.', verified: true }
    ]
  },
  {
    id: 'f4',
    name: 'Red Dragon Fruit (Pitaya)',
    category: 'Exotic',
    price: 7.99,
    unit: 'piece (approx 400g)',
    image: 'https://images.unsplash.com/photo-1527324789755-a97bb5322499?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewCount: 65,
    badge: 'Exotic',
    description: 'Striking vibrant pink skin with magenta flesh and delicate sweet crunch. High in prebiotic fiber and iron.',
    origin: 'Nha Trang, Vietnam',
    nutrition: {
      calories: '60 kcal per 100g',
      vitamins: ['Iron', 'Magnesium', 'Vitamin C', 'Antioxidants'],
      fiber: '2.9g',
      sugar: '7.6g'
    },
    inStock: true,
    reviews: [
      { id: 'r5', author: 'Sarah Jenkins', rating: 5, date: '4 days ago', comment: 'Looks gorgeous in smoothies and tastes refreshing!', verified: true }
    ]
  },
  {
    id: 'f5',
    name: 'Valencia Sweet Oranges',
    category: 'Citrus',
    price: 4.99,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 142,
    badge: 'Juicy',
    description: 'Sun-kissed citrus bursting with Vitamin C and sweet, tangy juice. Ideal for fresh morning juice or snacking.',
    origin: 'Valencia, Spain',
    nutrition: {
      calories: '47 kcal per 100g',
      vitamins: ['Vitamin C', 'Thiamin', 'Folate', 'Calcium'],
      fiber: '2.4g',
      sugar: '9.4g'
    },
    inStock: true,
    reviews: [
      { id: 'r6', author: 'Liam O Connor', rating: 5, date: '5 days ago', comment: 'Extremely juicy and sweet. Make fresh juice every morning with these.', verified: true }
    ]
  },
  {
    id: 'f6',
    name: 'Fresh Organic Strawberries',
    category: 'Berries',
    price: 5.99,
    unit: 'basket (400g)',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 188,
    badge: 'Organic',
    description: 'Vibrant red, fragrant, and naturally sweet. Harvested daily without synthetic pesticides.',
    origin: 'California, USA',
    nutrition: {
      calories: '32 kcal per 100g',
      vitamins: ['Vitamin C', 'Manganese', 'Folate'],
      fiber: '2.0g',
      sugar: '4.9g'
    },
    inStock: true,
    reviews: [
      { id: 'r7', author: 'Amanda Lewis', rating: 5, date: '1 week ago', comment: 'Smells like actual farm strawberries, not supermarket cardboard!', verified: true }
    ]
  },
  {
    id: 'f7',
    name: 'Fuji Crisp Apples',
    category: 'Seasonal',
    price: 3.99,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 115,
    description: 'Exceptionally crisp, sweet, and juicy. Excellent for school snacks, baking pies, or slicing with cheddar.',
    origin: 'Washington, USA',
    nutrition: {
      calories: '52 kcal per 100g',
      vitamins: ['Vitamin C', 'Potassium', 'Vitamin K'],
      fiber: '2.4g',
      sugar: '10.3g'
    },
    inStock: true,
    reviews: [
      { id: 'r8', author: 'Brian K.', rating: 4, date: '2 weeks ago', comment: 'Very crunchy and stores well in the fridge.', verified: true }
    ]
  },
  {
    id: 'f8',
    name: 'Royal Organic Fruit Basket',
    category: 'Organic Baskets',
    price: 49.99,
    unit: 'basket (5kg assortment)',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 76,
    badge: 'Gift Favorite',
    description: 'A luxurious handcrafted bamboo hamper loaded with seasonal organic treats: apples, bananas, berries, kiwis, avocados, and exotic citrus.',
    origin: 'Mixed Global Farms',
    nutrition: {
      calories: 'Mixed assorted superfoods',
      vitamins: ['Complete Multi-Vitamin Spectrum', 'Fiber', 'Antioxidants'],
      fiber: 'High Fiber',
      sugar: 'Natural fruit sugars'
    },
    inStock: true,
    reviews: [
      { id: 'r9', author: 'Rachel Green', rating: 5, date: 'Yesterday', comment: 'Sent this to my parents for their anniversary. They were blown away by the presentation and freshness!', verified: true }
    ]
  },
  {
    id: 'f9',
    name: 'Golden Honeycrunch Kiwis',
    category: 'Tropical',
    price: 6.49,
    unit: 'pack of 6',
    image: 'https://images.unsplash.com/photo-1585059896655-b6d05eb531d9?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 52,
    badge: 'Vitamin C Bomb',
    description: 'Smooth bronze skin with vibrant emerald flesh. Tangy-sweet flavor loaded with more Vitamin C per serving than an orange.',
    origin: 'Bay of Plenty, New Zealand',
    nutrition: {
      calories: '61 kcal per 100g',
      vitamins: ['Vitamin C', 'Vitamin E', 'Vitamin K', 'Copper'],
      fiber: '3.0g',
      sugar: '9.0g'
    },
    inStock: true,
    reviews: [
      { id: 'r10', author: 'Kenji Sato', rating: 5, date: '3 days ago', comment: 'So sweet compared to green kiwis. Will buy again!', verified: true }
    ]
  },
  {
    id: 'f10',
    name: 'Fresh Cavendish Bananas',
    category: 'Tropical',
    price: 2.49,
    unit: 'bunch (approx 1.2kg)',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 304,
    description: 'Naturally ripened, potassium-rich energy boosters. Great for quick snacks, smoothies, and baking healthy banana bread.',
    origin: 'Costa Rica',
    nutrition: {
      calories: '89 kcal per 100g',
      vitamins: ['Potassium', 'Vitamin B6', 'Vitamin C', 'Magnesium'],
      fiber: '2.6g',
      sugar: '12.2g'
    },
    inStock: true,
    reviews: [
      { id: 'r11', author: 'Chloe Decker', rating: 5, date: '6 days ago', comment: 'Lasted a full week on the counter without spoiling too fast.', verified: true }
    ]
  }
];
