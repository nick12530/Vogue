import React, { useState, createContext, useContext } from 'react';
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

// Define types
type Product = {
  id: string;
  name: string;
  price: string;
  image: any; // Use `any` for require() images
};

type CategoryName = 'men' | 'women' | 'children' | 'sneakers';
type SubcategoryMap = Record<CategoryName, string[]>;
type ProductsMap = Record<CategoryName, Record<string, Product[]>>;

// Create a Theme Context
const ThemeContext = createContext({
  theme: 'light', // Default theme
  toggleTheme: () => {}, // Function to toggle theme
});

const CategoryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Use theme context
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]); // State to manage cart items

  // Category data
  const categories = [
    { id: 1, name: 'Men', path: 'men' as CategoryName, image: require('../../assets/Men.jpg') },
    { id: 2, name: 'Women', path: 'women' as CategoryName, image: require('../../assets/Women.jpg') },
    { id: 3, name: 'Children', path: 'children' as CategoryName, image: require('../../assets/Kids.jpg') },
    { id: 4, name: 'Sneakers', path: 'sneakers' as CategoryName, image: require('../../assets/Shoes.jpg') },
  ];

  // Subcategories for each main category
  const subcategories: SubcategoryMap = {
    men: ['Official', 'Casual'],
    women: ['Official', 'Casual'],
    children: ['Indoors', 'Outdoors'],
    sneakers: ['Casual', 'Sport'],
  };

  // Products for each category and subcategory
  const products: ProductsMap = {
    men: {
      Official: [
        { id: 'm1', name: 'Business Suit', price: '$199.99', image: require('../../assets/suit.jpg') },
        { id: 'm2', name: 'Dress Shirt', price: '$59.99', image: require('../../assets/dressshirt.jpg') },
        { id: 'm3', name: 'Formal Pants', price: '$79.99', image: require('../../assets/pants.jpg') },
        { id: 'm4', name: 'Tie Collection', price: '$29.99', image: require('../../assets/tie.jpg') },
      ],
      Casual: [
        { id: 'm5', name: 'Jeans', price: '$49.99', image: require('../../assets/jeans.jpg') },
        { id: 'm6', name: 'T-Shirt', price: '$19.99', image: require('../../assets/tshirt.jpg') },
        { id: 'm7', name: 'Polo Shirt', price: '$24.99', image: require('../../assets/polo.jpg') },
        { id: 'm8', name: 'Casual Jacket', price: '$89.99', image: require('../../assets/jacketcasual.jpg') },
      ],
    },
    women: {
      Official: [
        { id: 'w1', name: 'Blazer Set', price: '$189.99', image: require('../../assets/blazerset.jpg') },
        { id: 'w2', name: 'Formal Blouse', price: '$69.99', image: require('../../assets/blouse.jpg') },
        { id: 'w3', name: 'Pencil Skirt', price: '$59.99', image: require('../../assets/skirt.jpg') },
        { id: 'w4', name: 'Office Dress', price: '$99.99', image: require('../../assets/officedress.jpg') },
      ],
      Casual: [
        { id: 'w5', name: 'Summer Dress', price: '$39.99', image: require('../../assets/summer.jpg') },
        { id: 'w6', name: 'Casual Top', price: '$29.99', image: require('../../assets/casualtee.jpg') },
        { id: 'w7', name: 'Denim Jeans', price: '$44.99', image: require('../../assets/denimwomen.jpg') },
        { id: 'w8', name: 'Cardigan', price: '$34.99', image: require('../../assets/cardigan.jpg') },
      ],
    },
    children: {
      Indoors: [
        { id: 'c1', name: 'Pajama Set', price: '$19.99', image: require('../../assets/pajama.jpg') },
        { id: 'c2', name: 'House Slippers', price: '$14.99', image: require('../../assets/slippers.jpg') },
        { id: 'c3', name: 'Play Clothes', price: '$24.99', image: require('../../assets/play.jpg') },
        { id: 'c4', name: 'Onesies', price: '$17.99', image: require('../../assets/Onesies.jpg') },
      ],
      Outdoors: [
        { id: 'c5', name: 'Kids Jacket', price: '$39.99', image: require('../../assets/jacketkid.jpg') },
        { id: 'c6', name: 'School Uniform', price: '$49.99', image: require('../../assets/uniform.jpg') },
        { id: 'c7', name: 'Sports Outfit', price: '$29.99', image: require('../../assets/sport.jpg') },
        { id: 'c8', name: 'Winter Coat', price: '$59.99', image: require('../../assets/winter.jpg') },
      ],
    },
    sneakers: {
      Casual: [
        { id: 's1', name: 'Urban Sneakers', price: '$79.99', image: require('../../assets/urban.jpg') },
        { id: 's2', name: 'Canvas Shoes', price: '$49.99', image: require('../../assets/canvas.jpg') },
        { id: 's3', name: 'Slip-on Sneakers', price: '$39.99', image: require('../../assets/slip.jpg') },
        { id: 's4', name: 'Fashion Trainers', price: '$69.99', image: require('../../assets/fashion.jpg') },
      ],
      Sport: [
        { id: 's5', name: 'Running Shoes', price: '$89.99', image: require('../../assets/running.jpg') },
        { id: 's6', name: 'Basketball Sneakers', price: '$99.99', image: require('../../assets/basketball.jpg') },
        { id: 's7', name: 'Training Shoes', price: '$84.99', image: require('../../assets/training.jpg') },
        { id: 's8', name: 'Tennis Shoes', price: '$74.99', image: require('../../assets/tennis.jpg') },
      ],
    },
  };

  // Get products for the selected category and subcategory
  const getSelectedProducts = (): Product[] => {
    if (selectedCategory && selectedSubcategory) {
      return products[selectedCategory][selectedSubcategory] || [];
    }
    return [];
  };

  // Add to cart functionality
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  // Render product item
  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={[styles.productCard, themeStyles.productCard]}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={[styles.productName, themeStyles.productName]}>{item.name}</Text>
      <Text style={[styles.productPrice, themeStyles.productPrice]}>{item.price}</Text>
      <TouchableOpacity style={[styles.addToCartButton, themeStyles.addToCartButton]} onPress={() => addToCart(item)}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  // Theme-based styles
  const themeStyles = theme === 'light' ? lightStyles : darkStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      {/* Header */}
      <View style={[styles.header, themeStyles.header]}>
        <Text style={[styles.headerText, themeStyles.headerText]}>Home</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen', { cart })}>
            <AntDesign name="shoppingcart" size={24} color={theme === 'light' ? '#000' : '#fff'} />
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleButton}>
            <Text style={styles.themeToggleIcon}>
              {theme === 'light' ? '🌙' : '☀️'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, themeStyles.searchContainer]}>
        <Feather name="search" size={20} color={theme === 'light' ? '#999' : '#ccc'} style={styles.searchIcon} />
        <TextInput
          placeholder="Search clothes..."
          placeholderTextColor={theme === 'light' ? '#999' : '#ccc'}
          style={[styles.searchInput, themeStyles.searchInput]}
        />
      </View>

      {/* Promotional Banner */}
      <View style={[styles.banner, themeStyles.banner]}>
        <Text style={styles.bannerTitle}>The most popular clothes today</Text>
        <Text style={styles.bannerSubtitle}>50% OFF</Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.path && styles.selectedCategoryTab,
              themeStyles.categoryTab,
            ]}
            onPress={() => setSelectedCategory(category.path)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.path && styles.selectedCategoryText,
                themeStyles.categoryText,
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
                  selectedSubcategory === subcat && styles.selectedSubcategoryTab,
                  themeStyles.subcategoryTab,
                ]}
                onPress={() => setSelectedSubcategory(subcat)}
              >
                <Text
                  style={[
                    styles.subcategoryText,
                    selectedSubcategory === subcat && styles.selectedSubcategoryText,
                    themeStyles.subcategoryText,
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
              style={styles.productList} // Ensure scrolling
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

// Light theme styles
const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    borderBottomColor: '#eee',
  },
  headerText: {
    color: '#000',
  },
  searchContainer: {
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    color: '#000',
  },
  banner: {
    backgroundColor: '#3498db',
  },
  categoryTab: {
    backgroundColor: '#f5f5f5',
  },
  categoryText: {
    color: '#333',
  },
  subcategoryTab: {
    backgroundColor: '#f5f5f5',
  },
  subcategoryText: {
    color: '#333',
  },
  productCard: {
    backgroundColor: '#f9f9f9',
  },
  productName: {
    color: '#333',
  },
  productPrice: {
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#3498db',
  },
});

// Dark theme styles
const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
  },
  header: {
    borderBottomColor: '#333',
  },
  headerText: {
    color: '#fff',
  },
  searchContainer: {
    backgroundColor: '#333',
  },
  searchInput: {
    color: '#fff',
  },
  banner: {
    backgroundColor: '#1e1e1e',
  },
  categoryTab: {
    backgroundColor: '#333',
  },
  categoryText: {
    color: '#fff',
  },
  subcategoryTab: {
    backgroundColor: '#333',
  },
  subcategoryText: {
    color: '#fff',
  },
  productCard: {
    backgroundColor: '#1e1e1e',
  },
  productName: {
    color: '#fff',
  },
  productPrice: {
    color: '#fff',
  },
  addToCartButton: {
    backgroundColor: '#3498db',
  },
});

// Base styles (shared between themes)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
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
  themeToggleButton: {
    marginLeft: 15,
  },
  themeToggleIcon: {
    fontSize: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
  },
  selectedCategoryText: {
    color: '#fff',
  },
  subcategoriesContainer: {
    flex: 1,
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
  },
  selectedSubcategoryText: {
    color: '#fff',
  },
  productGrid: {
    paddingHorizontal: 15,
  },
  productList: {
    flex: 1, // Ensure scrolling
  },
  productCard: {
    width: width / 2 - 20,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
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
    padding: 6,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 12,
  },
});

// Wrap the app with ThemeProvider
const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CategoryScreen navigation={{ navigate: () => {} }} />
    </ThemeContext.Provider>
  );
};

export default App;