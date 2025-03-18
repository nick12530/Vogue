import React, { useState, createContext, useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Define the navigation param list types
type RootStackParamList = {
  Category: { categoryId: string; categoryName: string };
  Search: undefined;
  Sale: undefined;
  Categories: undefined;
  Featured: undefined;
  Promotion: undefined;
};

// Create a custom navigation type without StackNavigationProp
type NavigationProp = {
  navigate: <RouteName extends keyof RootStackParamList>(
    routeName: RouteName,
    params?: RootStackParamList[RouteName]
  ) => void;
};

// Create a Theme Context
const ThemeContext = createContext({
  theme: 'light', // Default theme
  toggleTheme: () => {}, // Function to toggle theme
});

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation() as NavigationProp;
  const { theme, toggleTheme } = useContext(ThemeContext); // Use theme context

  const navigateToCategory = (categoryId: string, categoryName: string) => {
    navigation.navigate('Category', { 
      categoryId,
      categoryName 
    });
  };

  const categories = [
    {
      id: 'men',
      name: 'Men',
      description: 'Explore latest men\'s fashion',
      image: require('../../assets/Men.jpg')
    },
    {
      id: 'women',
      name: 'Women',
      description: 'Discover trendy women\'s clothing',
      image: require('../../assets/Women.jpg')
    },
    {
      id: 'children',
      name: 'Children',
      description: 'Cute and comfortable kids\' wear',
      image: require('../../assets/Kids.jpg')
    },
    {
      id: 'shoes',
      name: 'Shoes',
      description: 'Footwear for every occasion',
      image: require('../../assets/Shoes.jpg')
    }
  ];

  const featuredCollections = [
    {
      id: 'featured1',
      name: 'Summer Collection',
      tagline: 'Fresh styles for the season',
      image: require('../../assets/summerfit.jpg')
    },
    {
      id: 'featured2',
      name: 'Winter Essentials',
      tagline: 'Stay warm in style',
      image: require('../../assets/winterfit.jpg')
    },
    {
      id: 'featured3',
      name: 'Casual Footwear',
      tagline: 'Comfort meets fashion',
      image: require('../../assets/Shoes.jpg')
    }
  ];

  // Define theme-based styles
  const themeStyles = theme === 'light' ? lightStyles : darkStyles;

  return (
    <>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={themeStyles.scrollView.backgroundColor} />
      <ScrollView style={[styles.scrollView, themeStyles.scrollView]} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, themeStyles.header]}>
          <Text style={[styles.logoText, themeStyles.logoText]}>VOGUE OUTFITS</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.searchButton}
              onPress={() => navigation.navigate('Search')}
            >
              <Text style={[styles.searchIcon, themeStyles.searchIcon]}>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.themeToggleButton}
              onPress={toggleTheme}
            >
              <Text style={[styles.themeToggleIcon, themeStyles.themeToggleIcon]}>
                {theme === 'light' ? '🌙' : '☀️'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image 
            source={require('../../assets/newarrivals.jpg')} 
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>NEW ARRIVALS</Text>
            <Text style={styles.heroSubtitle}>Discover the latest fashion trends</Text>
            <TouchableOpacity 
              style={styles.shopNowButton}
              onPress={() => navigation.navigate('Sale')}
            >
              <Text style={styles.shopNowText}>SHOP NOW</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, themeStyles.sectionTitle]}>Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
              <Text style={[styles.seeAllText, themeStyles.seeAllText]}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollView}
          >
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.categoryCard}
                onPress={() => navigateToCategory(category.id, category.name)}
              >
                <View style={styles.categoryImageContainer}>
                  <Image
                    source={category.image}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={[styles.categoryName, themeStyles.categoryName]}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Collections Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, themeStyles.sectionTitle]}>Featured Collections</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Featured')}>
              <Text style={[styles.seeAllText, themeStyles.seeAllText]}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featuredGrid}>
            {featuredCollections.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.collectionCard}
                onPress={() => navigation.navigate('Featured')}
              >
                <Image
                  source={item.image}
                  style={styles.collectionImage}
                  resizeMode="cover"
                />
                <View style={styles.collectionOverlay}>
                  <Text style={styles.collectionName}>{item.name}</Text>
                  <Text style={styles.collectionTagline}>{item.tagline}</Text>
                  <View style={styles.viewCollectionButton}>
                    <Text style={styles.viewCollectionText}>View</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Categories Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, themeStyles.sectionTitle]}>Shop by Category</Text>
          {categories.slice(0, 2).map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={styles.popularCategoryCard}
              onPress={() => navigateToCategory(category.id, category.name)}
            >
              <Image
                source={category.image}
                style={styles.popularCategoryImage}
                resizeMode="cover"
              />
              <View style={styles.popularCategoryOverlay}>
                <Text style={styles.popularCategoryName}>{category.name}</Text>
                <Text style={styles.popularCategoryDescription}>{category.description}</Text>
                <TouchableOpacity 
                  style={styles.exploreCategoryButton}
                  onPress={() => navigateToCategory(category.id, category.name)}
                >
                  <Text style={styles.exploreCategoryText}>Explore</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Special Promotions Banner */}
        <View style={styles.promotionBanner}>
          <Image 
            source={require('../../assets/special.jpg')} 
            style={styles.promotionImage}
            resizeMode="cover"
          />
          <View style={styles.promotionOverlay}>
            <Text style={styles.promotionTitle}>SPECIAL OFFER</Text>
            <Text style={styles.promotionDescription}>Get up to 50% off on selected items</Text>
            <TouchableOpacity 
              style={styles.promotionButton}
              onPress={() => navigation.navigate('Promotion')}
            >
              <Text style={styles.promotionButtonText}>SHOP NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

// Light theme styles
const lightStyles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomColor: '#f0f0f0',
  },
  logoText: {
    color: '#000',
  },
  searchIcon: {
    color: '#000',
  },
  themeToggleIcon: {
    color: '#000',
  },
  sectionTitle: {
    color: '#333',
  },
  seeAllText: {
    color: '#666',
  },
  categoryName: {
    color: '#333',
  },
});

// Dark theme styles
const darkStyles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#121212',
  },
  header: {
    backgroundColor: '#1e1e1e',
    borderBottomColor: '#333',
  },
  logoText: {
    color: '#fff',
  },
  searchIcon: {
    color: '#fff',
  },
  themeToggleIcon: {
    color: '#fff',
  },
  sectionTitle: {
    color: '#fff',
  },
  seeAllText: {
    color: '#ccc',
  },
  categoryName: {
    color: '#fff',
  },
});

// Base styles (shared between themes)
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
  },
  themeToggleButton: {
    marginLeft: 10,
  },
  themeToggleIcon: {
    fontSize: 20,
  },
  heroBanner: {
    width: '100%',
    height: 220,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  shopNowButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopNowText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 14,
  },
  sectionContainer: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesScrollView: {
    paddingBottom: 10,
  },
  categoryCard: {
    marginRight: 20,
    alignItems: 'center',
    width: 100,
  },
  categoryImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  collectionCard: {
    width: (width - 50) / 2,
    height: 180,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  collectionImage: {
    width: '100%',
    height: '100%',
  },
  collectionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  collectionName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  collectionTagline: {
    color: '#f0f0f0',
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  viewCollectionButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  viewCollectionText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  popularCategoryCard: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
  },
  popularCategoryImage: {
    width: '100%',
    height: '100%',
  },
  popularCategoryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 15,
    justifyContent: 'center',
  },
  popularCategoryName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  popularCategoryDescription: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  exploreCategoryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  exploreCategoryText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 12,
  },
  promotionBanner: {
    width: '100%',
    height: 180,
    position: 'relative',
    marginBottom: 20,
  },
  promotionImage: {
    width: '100%',
    height: '100%',
  },
  promotionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  promotionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  promotionDescription: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  promotionButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  promotionButtonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 14,
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
      <HomeScreen />
    </ThemeContext.Provider>
  );
};

export default App;