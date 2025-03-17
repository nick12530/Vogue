import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Define proper types for our data
type Product = {
  id: string;
  name: string;
  price: string;
  image: any; // Changed to any to accept require() images
};

type CategoryName = 'men' | 'women' | 'children' | 'sneakers';
type MenSubcategories = 'official' | 'casual';
type WomenSubcategories = 'official' | 'casual';
type ChildrenSubcategories = 'indoors' | 'outdoors';
type SneakersSubcategories = 'casual' | 'sport';

type SubcategoryMap = Record<CategoryName, string[]>;
type AllSubcategories = MenSubcategories | WomenSubcategories | ChildrenSubcategories | SneakersSubcategories;
type ProductsMap = {
  men: Record<MenSubcategories, Product[]>;
  women: Record<WomenSubcategories, Product[]>;
  children: Record<ChildrenSubcategories, Product[]>;
  sneakers: Record<SneakersSubcategories, Product[]>;
};

const CategoryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]); // State to manage cart items

  // Navigation items (updated to include all categories)
  const navItems = ['home', 'men', 'women', 'children', 'sneakers', 'cart'];

  // Category data with updated categories
  const categories = [
    { id: 1, name: 'Men', path: 'men' as CategoryName, image: require('../../assets/Men.jpg'), color: '#3498db' },
    { id: 2, name: 'Women', path: 'women' as CategoryName, image: require('../../assets/Women.jpg'), color: '#e84393' },
    { id: 3, name: 'Children', path: 'children' as CategoryName, image: require('../../assets/Kids.jpg'), color: '#f39c12' },
    { id: 4, name: 'Sneakers', path: 'sneakers' as CategoryName, image: require('../../assets/Shoes.jpg'), color: '#2ecc71' },
  ];

  // Subcategories for each main category with your specified categories
  const subcategories: SubcategoryMap = {
    men: ['Official', 'Casual'],
    women: ['Official', 'Casual'],
    children: ['Indoors', 'Outdoors'],
    sneakers: ['Casual', 'Sport'],
  };

  const assets: ProductsMap = {
    men: {
      official: [
        { id: 'm1', name: 'Business Suit', price: '$199.99', image: require('../../assets/suit.jpg') },
        { id: 'm2', name: 'Dress Shirt', price: '$59.99', image: require('../../assets/dressshirt.jpg') },
        { id: 'm3', name: 'Formal Pants', price: '$79.99', image: require('../../assets/pants.jpg') },
        { id: 'm4', name: 'Tie Collection', price: '$29.99', image: require('../../assets/tie.jpg') },
      ],
      casual: [
        { id: 'm5', name: 'Jeans', price: '$49.99', image: require('../../assets/jeans.jpg') },
        { id: 'm6', name: 'T-Shirt', price: '$19.99', image: require('../../assets/tshirt.jpg') },
        { id: 'm7', name: 'Polo Shirt', price: '$24.99', image: require('../../assets/polo.jpg') },
        { id: 'm8', name: 'Casual Jacket', price: '$89.99', image: require('../../assets/jacketcasual.jpg') },
      ],
    },
    women: {
      official: [
        { id: 'w1', name: 'Blazer Set', price: '$189.99', image: require('../../assets/blazerset.jpg') },
        { id: 'w2', name: 'Formal Blouse', price: '$69.99', image: require('../../assets/blouse.jpg') },
        { id: 'w3', name: 'Pencil Skirt', price: '$59.99', image: require('../../assets/skirt.jpg') },
        { id: 'w4', name: 'Office Dress', price: '$99.99', image: require('../../assets/officedress.jpg') },
      ],
      casual: [
        { id: 'w5', name: 'Summer Dress', price: '$39.99', image: require('../../assets/summer.jpg') },
        { id: 'w6', name: 'Casual Top', price: '$29.99', image: require('../../assets/casualtee.jpg') },
        { id: 'w7', name: 'Denim Jeans', price: '$44.99', image: require('../../assets/denimwomen.jpg') },
        { id: 'w8', name: 'Cardigan', price: '$34.99', image: require('../../assets/cardigan.jpg') },
      ],
    },
    children: {
      indoors: [
        { id: 'c1', name: 'Pajama Set', price: '$19.99', image: require('../../assets/pajama.jpg') },
        { id: 'c2', name: 'House Slippers', price: '$14.99', image: require('../../assets/slippers.jpg') },
        { id: 'c3', name: 'Play Clothes', price: '$24.99', image: require('../../assets/play.jpg') },
        { id: 'c4', name: 'Onesies', price: '$17.99', image: require('../../assets/Onesies.jpg') },
      ],
      outdoors: [
        { id: 'c5', name: 'Kids Jacket', price: '$39.99', image: require('../../assets/jacketkid.jpg') },
        { id: 'c6', name: 'School Uniform', price: '$49.99', image: require('../../assets/uniform.jpg') },
        { id: 'c7', name: 'Sports Outfit', price: '$29.99', image: require('../../assets/sport.jpg') },
        { id: 'c8', name: 'Winter Coat', price: '$59.99', image: require('../../assets/winter.jpg') },
      ],
    },
    sneakers: {
      casual: [
        { id: 's1', name: 'Urban Sneakers', price: '$79.99', image: require('../../assets/urban.jpg') },
        { id: 's2', name: 'Canvas Shoes', price: '$49.99', image: require('../../assets/canvas.jpg') },
        { id: 's3', name: 'Slip-on Sneakers', price: '$39.99', image: require('../../assets/slip.jpg') },
        { id: 's4', name: 'Fashion Trainers', price: '$69.99', image: require('../../assets/fashion.jpg') },
      ],
      sport: [
        { id: 's5', name: 'Running Shoes', price: '$89.99', image: require('../../assets/running.jpg') },
        { id: 's6', name: 'Basketball Sneakers', price: '$99.99', image: require('../../assets/basketball.jpg') },
        { id: 's7', name: 'Training Shoes', price: '$84.99', image: require('../../assets/training.jpg') },
        { id: 's8', name: 'Tennis Shoes', price: '$74.99', image: require('../../assets/tennis.jpg') },
      ],
    },
  };

  // Handler for subcategory selection
  const handleSubcategorySelect = (subcat: string) => {
    setSelectedSubcategory(subcat.toLowerCase());
  };

  // Function to get products for the selected category and subcategory
  const getSelectedProducts = (): Product[] => {
    if (selectedCategory && selectedSubcategory) {
      const category = assets[selectedCategory];
      if (category && selectedSubcategory in category) {
        switch (selectedCategory) {
          case 'men':
            return (category as Record<MenSubcategories, Product[]>)[selectedSubcategory as MenSubcategories];
          case 'women':
            return (category as Record<WomenSubcategories, Product[]>)[selectedSubcategory as WomenSubcategories];
          case 'children':
            return (category as Record<ChildrenSubcategories, Product[]>)[selectedSubcategory as ChildrenSubcategories];
          case 'sneakers':
            return (category as Record<SneakersSubcategories, Product[]>)[selectedSubcategory as SneakersSubcategories];
        }
      }
    }
    return [];
  };

  // Add to cart functionality
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  // Render product item
  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen', { cart })}>
          <AntDesign name="shoppingcart" size={24} color="#000" />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="Search clothes..."
          style={styles.searchInput}
        />
      </View>

      {/* Promotional Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>The most popular clothes today</Text>
        <Text style={styles.bannerSubtitle}>50%OFF</Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.path && styles.selectedCategoryTab,
            ]}
            onPress={() => setSelectedCategory(category.path)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.path && styles.selectedCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Subcategories */}
      {selectedCategory && (
        <View style={styles.subcategoriesContainer}>
          <View style={styles.subcategoryTabs}>
            {subcategories[selectedCategory].map((subcat) => (
              <TouchableOpacity
                key={subcat}
                style={[
                  styles.subcategoryTab,
                  selectedSubcategory === subcat.toLowerCase() && styles.selectedSubcategoryTab,
                ]}
                onPress={() => handleSubcategorySelect(subcat)}
              >
                <Text
                  style={[
                    styles.subcategoryText,
                    selectedSubcategory === subcat.toLowerCase() && styles.selectedSubcategoryText,
                  ]}
                >
                  {subcat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Products for selected subcategory */}
          {selectedSubcategory && (
            <FlatList
              data={getSelectedProducts()}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={styles.productGrid}
              style={styles.productList} // Added style for scrolling
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    margin: 15,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  banner: {
    padding: 20,
    backgroundColor: '#3498db',
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#fff',
  },
  categoryTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  categoryTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectedCategoryTab: {
    backgroundColor: '#3498db',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  subcategoriesContainer: {
    flex: 1, // Ensure it takes up remaining space
    paddingHorizontal: 15,
  },
  subcategoryTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  subcategoryTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectedSubcategoryTab: {
    backgroundColor: '#3498db',
  },
  subcategoryText: {
    fontSize: 16,
    color: '#333',
  },
  selectedSubcategoryText: {
    color: '#fff',
  },
  productGrid: {
    paddingHorizontal: 15,
  },
  productList: {
    flex: 1, // Ensure it takes up remaining space
  },
  productCard: {
    width: width / 2 - 20,
    marginBottom: 20, // Increased spacing between products
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  addToCartButton: {
    backgroundColor: '#3498db',
    padding: 6, // Smaller button
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 12, // Smaller text
  },
});

export default CategoryScreen;