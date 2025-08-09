import React from 'react';
    import { motion } from 'framer-motion';
    import { useNavigate } from 'react-router-dom';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Utensils as SpicesIcon, Leaf, Star, Gift } from 'lucide-react';

    const CategoryCard = ({ title, icon, description, delay, onCategorySelect }) => {
      const navigate = useNavigate();

      const handleClick = () => {
        if (title === "Spices") {
          navigate('/spices');
        } else if (title === "Dry Fruits") {
          navigate('/dry-fruits');
        } else if (title === "Taste Rider Specials") {
          navigate('/taste-rider-specials');
        } else if (title === "Chocolates") {
          navigate('/chocolates');
        } else {
          onCategorySelect(title);
          navigate('/products');
        }
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay }}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(139, 69, 19, 0.2)" }}
          className="cursor-pointer"
          onClick={handleClick}
        >
          <Card className="bg-amber-50/70 backdrop-blur-md shadow-xl border-amber-600/30 h-full flex flex-col overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-amber-600/10 p-6">
              <CardTitle className="text-2xl font-bold text-amber-800">{title}</CardTitle>
              {icon}
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <p className="text-stone-700" style={{ fontFamily: "'Lato', sans-serif"}}>{description}</p>
            </CardContent>
            <div className="p-6 pt-0">
                <span className="text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors">
                  View Products &rarr;
                </span>
            </div>
          </Card>
        </motion.div>
      );
    };

    const ProductCategoriesPage = ({ onCategorySelect }) => {
      const categories = [
        {
          title: "Spices",
          icon: <SpicesIcon className="h-10 w-10 text-amber-700" />,
          description: "Explore our aromatic range of handcrafted spices, perfect for adding authentic flavor to your culinary creations.",
        },
        {
          title: "Dry Fruits",
          icon: <Leaf className="h-10 w-10 text-green-700" />,
          description: "Discover premium quality dry fruits, packed with nutrition and taste for a healthy lifestyle.",
        },
        {
          title: "Taste Rider Specials",
          icon: <Star className="h-10 w-10 text-yellow-500" />,
          description: "Indulge in our exclusive Taste Rider Special blends, crafted for unique and unforgettable flavors.",
        },
        {
          title: "Chocolates",
          icon: <Gift className="h-10 w-10 text-black" />,
          description: "Delicious and decadent chocolates for every occasion.",
        },
      ];

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-12 md:py-20 min-h-[calc(100vh-280px)]"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-stone-800 text-shadow-md"
          >
            Discover Our <span className="text-amber-700">Categories</span>
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {categories.map((category, index) => (
              <CategoryCard 
                key={category.title}
                title={category.title}
                icon={category.icon}
                description={category.description}
                delay={0.2 + index * 0.1}
                onCategorySelect={onCategorySelect}
              />
            ))}
          </div>
        </motion.div>
      );
    };

    export default ProductCategoriesPage;
