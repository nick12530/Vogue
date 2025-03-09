import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  ScrollView,
  Image,
  SafeAreaView,
  FlatList
} from 'react-native';
import { Feather, AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';

// Define proper types for our data
type Product = {
  id: string;
  name: string;
  price: string;
  image: string | null;
};

type CategoryName = 'men' | 'women' | 'children' | 'sneakers';
type SubcategoryMap = Record<CategoryName, string[]>;
type ProductsMap = Record<CategoryName, Record<string, Product[]>>;

const Categories: React.FC = () => {
  // State to track selected category and selected subcategory
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  
  // Navigation items
  const navItems = ['home', 'men', 'women', 'cart'];

  // Category data with updated categories
  const categories = [
    { id: 1, name: 'Men', path: 'men' as CategoryName, image: null, color: '#3498db' },
    { id: 2, name: 'Women', path: 'women' as CategoryName, image: null, color: '#e84393' },
    { id: 3, name: 'Children', path: 'children' as CategoryName, image: null, color: '#f39c12' },
    { id: 4, name: 'Sneakers', path: 'sneakers' as CategoryName, image: null, color: '#2ecc71' },
  ];

  // Subcategories for each main category with your specified categories
  const subcategories: SubcategoryMap = {
    men: ['Official', 'Casual'],
    women: ['Official', 'Casual'],
    children: ['Indoors', 'Outdoors'],
    sneakers: ['Casual', 'Sport']
  };

  // Mock products data for each category and subcategory
  const products: ProductsMap = {
    men: {
      official: [
        { id: 'm1', name: 'Business Suit', price: '$199.99', image: null },
        { id: 'm2', name: 'Dress Shirt', price: '$59.99', image: null },
        { id: 'm3', name: 'Formal Pants', price: '$79.99', image: null },
        { id: 'm4', name: 'Tie Collection', price: '$29.99', image: null },
      ],
      casual: [
        { id: 'm5', name: 'Jeans', price: '$49.99', image: null },
        { id: 'm6', name: 'T-Shirt', price: '$19.99', image: null },
        { id: 'm7', name: 'Polo Shirt', price: '$24.99', image: null },
        { id: 'm8', name: 'Casual Jacket', price: '$89.99', image: null },
      ]
    },
    women: {
      official: [
        { id: 'w1', name: 'Blazer Set', price: '$189.99', image: null },
        { id: 'w2', name: 'Formal Blouse', price: '$69.99', image: null },
        { id: 'w3', name: 'Pencil Skirt', price: '$59.99', image: null },
        { id: 'w4', name: 'Office Dress', price: '$99.99', image: null },
      ],
      casual: [
        { id: 'w5', name: 'Summer Dress', price: '$39.99', image: null },
        { id: 'w6', name: 'Casual Top', price: '$29.99', image: null },
        { id: 'w7', name: 'Denim Jeans', price: '$44.99', image: null },
        { id: 'w8', name: 'Cardigan', price: '$34.99', image: null },
      ]
    },
    children: {
      indoors: [
        { id: 'c1', name: 'Pajama Set', price: '$19.99', image: null },
        { id: 'c2', name: 'House Slippers', price: '$14.99', image: null },
        { id: 'c3', name: 'Play Clothes', price: '$24.99', image: null },
        { id: 'c4', name: 'Onesies', price: '$17.99', image: null },
      ],
      outdoors: [
        { id: 'c5', name: 'Kids Jacket', price: '$39.99', image: null },
        { id: 'c6', name: 'School Uniform', price: '$49.99', image: null },
        { id: 'c7', name: 'Sports Outfit', price: '$29.99', image: null },
        { id: 'c8', name: 'Winter Coat', price: '$59.99', image: null },
      ]
    },
    sneakers: {
      casual: [
        { id: 's1', name: 'Urban Sneakers', price: '$79.99', image: null },
        { id: 's2', name: 'Canvas Shoes', price: '$49.99', image: null },
        { id: 's3', name: 'Slip-on Sneakers', price: '$39.99', image: null },
        { id: 's4', name: 'Fashion Trainers', price: '$69.99', image: null },
      ],
      sport: [
        { id: 's5', name: 'Running Shoes', price: '$89.99', image: null },
        { id: 's6', name: 'Basketball Sneakers', price: '$99.99', image: null },
        { id: 's7', name: 'Training Shoes', price: '$84.99', image: null },
        { id: 's8', name: 'Tennis Shoes', price: '$74.99', image: null },
      ]
    }
  };

  // Handler for navigation 
  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    // Reset subcategory selection when navigating away
    setSelectedSubcategory(null);
    
    // If path is a main category, select it
    if (categories.some(cat => cat.path === path)) {
      setSelectedCategory(path as CategoryName);
    }
  };

  // Handler for subcategory selection
  const handleSubcategorySelect = (subcat: string) => {
    setSelectedSubcategory(subcat.toLowerCase());
  };

  // Function to get products for the selected category and subcategory
  const getSelectedProducts = (): Product[] => {
    if (selectedCategory && selectedSubcategory) {
      const subcatKey = selectedSubcategory.toLowerCase();
      // Check if the subcategory exists for the selected category
      if (products[selectedCategory] && products[selectedCategory][subcatKey]) {
        return products[selectedCategory][subcatKey];
      }
    }
    return [];
  };

  // Get the color for the selected category
  const getSelectedCategoryColor = (): string => {
    const selectedCat = categories.find(cat => cat.path === selectedCategory);
    return selectedCat ? selectedCat.color : '#000';
  };

  // The rest of your component implementation
  // ...

  // Modified product display with TypeScript fixes
  const renderProductItem = (product: Product) => (
    <TouchableOpacity 
      key={product.id} 
      style={styles.productCard}
    >
      <View 
        style={[
          styles.productImageContainer, 
          { backgroundColor: getSelectedCategoryColor() + '20' }
        ]}
      >
        {product.image ? (
          <Image 
            source={{uri: product.image}} 
            style={styles.productImage} 
          />
        ) : (
          <View style={styles.productImagePlaceholder}>
            <Text style={[styles.productPlaceholderText, { color: getSelectedCategoryColor() }]}>
              {product.name}
            </Text>
          </View>
        )}
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => console.log(`Added ${product.name} to favorites`)}
        >
          <AntDesign name="hearto" size={16} color={getSelectedCategoryColor()} />
        </TouchableOpacity>
      </View>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={[styles.productPrice, { color: getSelectedCategoryColor() }]}>
        {product.price}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Navigation */}
        <View style={styles.navContainer}>
          {navItems.map((item) => (
            <TouchableOpacity 
              key={item} 
              onPress={() => handleNavigation(item)}
              style={styles.navItem}
            >
              <Text 
                style={[
                  styles.navText, 
                  selectedCategory === item && { color: getSelectedCategoryColor(), fontWeight: '600' }
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={16} color="#999" style={styles.searchIcon} />
          <TextInput
            placeholder="Search items..."
            style={styles.searchInput}
          />
        </View>

        {/* Featured section */}
        <View style={[styles.featuredContainer, { backgroundColor: selectedCategory ? getSelectedCategoryColor() + '20' : '#f0f0f0' }]}>
          <Text style={styles.featuredSubtitle}>The most popular</Text>
          <Text style={styles.featuredTitle}>clothes today</Text>
          <View style={[styles.discountBadge, { backgroundColor: selectedCategory ? getSelectedCategoryColor() : '#000' }]}>
            <Text style={styles.discountText}>50% OFF</Text>
          </View>
        </View>

        {/* Circular category tabs */}
        <View style={styles.circularCatsContainer}>
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              onPress={() => handleNavigation(category.path)}
              style={styles.circularCatItem}
            >
              <View 
                style={[
                  styles.circularCatImageContainer, 
                  { 
                    backgroundColor: category.color + '30',
                    borderWidth: selectedCategory === category.path ? 3 : 0,
                    borderColor: category.color
                  }
                ]}
              >
                {category.image ? (
                  <Image 
                    source={{uri: category.image}} 
                    style={styles.circularCatImage} 
                  />
                ) : (
                  <View style={styles.circularCatPlaceholder}>
                    <Text style={[styles.placeholderText, { color: category.color }]}>
                      {category.name[0]}
                    </Text>
                  </View>
                )}
              </View>
              <Text 
                style={[
                  styles.circularCatName, 
                  selectedCategory === category.path && { color: category.color, fontWeight: '700' }
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Show subcategories when a category is selected */}
        {selectedCategory && (
          <View style={styles.selectedSubcategories}>
            <Text style={[styles.selectedCategoryTitle, { color: getSelectedCategoryColor() }]}>
              {categories.find(cat => cat.path === selectedCategory)?.name} Categories
            </Text>
            <View style={styles.subcatButtons}>
              {subcategories[selectedCategory].map((subcat, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => handleSubcategorySelect(subcat)}
                  style={[
                    styles.subcatButton, 
                    { borderColor: getSelectedCategoryColor() },
                    selectedSubcategory === subcat.toLowerCase() && { 
                      backgroundColor: getSelectedCategoryColor(),
                    }
                  ]}
                >
                  <Text 
                    style={[
                      styles.subcatButtonText,
                      selectedSubcategory === subcat.toLowerCase() && { color: '#fff' }
                    ]}
                  >
                    {subcat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Display products when both category and subcategory are selected */}
        {selectedCategory && selectedSubcategory && (
          <View style={styles.productsContainer}>
            <Text style={styles.productsTitle}>
              Available Items
            </Text>

            <View style={styles.productsGrid}>
              {getSelectedProducts().map(product => renderProductItem(product))}
            </View>
          </View>
        )}

        {/* Show main categories grid if no specific category is selected */}
        {!selectedCategory && (
          <>
            {/* Filters */}
            <View style={styles.filterContainer}>
              <TouchableOpacity style={styles.filterButtonActive}>
                <Text style={styles.filterTextActive}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>New</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Featured</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Sale</Text>
              </TouchableOpacity>
            </View>

            {/* Popular Categories section (shown only when no category is selected) */}
            <View style={styles.subcatsContainer}>
              <Text style={styles.sectionTitle}>Popular Categories</Text>
              <View style={styles.subcatsGrid}>
                {categories.map((category) => (
                  <View key={category.id} style={styles.subcatColumn}>
                    <Text style={[styles.subcatTitle, { color: category.color }]}>{category.name}</Text>
                    <View style={styles.subcatList}>
                      {subcategories[category.path].map((subcat, index) => (
                        <TouchableOpacity 
                          key={index} 
                          onPress={() => {
                            setSelectedCategory(category.path);
                            handleSubcategorySelect(subcat);
                          }}
                          style={styles.subcatItem}
                        >
                          <Text style={[styles.subcatText, { color: '#666' }]}>
                            {subcat}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Products Grid when no category is selected */}
            <View style={styles.productsGrid}>
              {categories.map((category) => (
                <TouchableOpacity 
                  key={category.id} 
                  onPress={() => handleNavigation(category.path)}
                  style={styles.productCard}
                >
                  <View 
                    style={[
                      styles.productImageContainer, 
                      { backgroundColor: category.color + '20' }
                    ]}
                  >
                    {category.image ? (
                      <Image 
                        source={{uri: category.image}} 
                        style={styles.productImage} 
                      />
                    ) : (
                      <View style={styles.productImagePlaceholder}>
                        <Text style={[styles.productPlaceholderText, { color: category.color }]}>
                          {category.name}
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity 
                      style={styles.favoriteButton}
                      onPress={() => console.log(`Added ${category.name} to favorites`)}
                    >
                      <AntDesign name="hearto" size={16} color={category.color} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.productName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
        
        {/* Bottom spacing to clear the tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom tab navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          onPress={() => {
            setSelectedCategory(null);
            setSelectedSubcategory(null);
            handleNavigation('home');
          }}
        >
          <Feather name="home" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('favorites')}>
          <AntDesign name="hearto" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('cart')}>
          <Feather name="shopping-bag" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('account')}>
          <Ionicons name="time-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  navItem: {
    paddingVertical: 4,
  },
  navText: {
    color: '#999',
    fontWeight: '300',
    textTransform: 'capitalize',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
  featuredContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  featuredSubtitle: {
    fontSize: 12,
    marginBottom: 2,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  discountBadge: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 10,
    color: '#333',
  },
  filterTextActive: {
    fontSize: 10,
    color: '#fff',
  },
  circularCatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  circularCatItem: {
    alignItems: 'center',
  },
  circularCatImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularCatImage: {
    width: '100%',
    height: '100%',
  },
  circularCatPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  circularCatName: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  subcatsContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
  },
  subcatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subcatColumn: {
    width: '50%',
    marginBottom: 16,
  },
  subcatTitle: {
    fontWeight: '500',
    marginBottom: 8,
  },
  subcatList: {
    marginBottom: 4,
  },
  subcatItem: {
    marginBottom: 4,
  },
  subcatText: {
    fontSize: 12,
    color: '#666',
  },
  selectedSubcategories: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  selectedCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  subcatButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subcatButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  subcatButtonText: {
    fontSize: 12,
  },
  productsContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 16,
  },
  productImageContainer: {
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productImagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  productPlaceholderText: {
    color: '#999',
    textAlign: 'center',
    fontSize: 14,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  productName: {
    fontWeight: '500',
    fontSize: 12,
    marginBottom: 4,
  },
  productPrice: {
    fontWeight: '600',
    fontSize: 12,
  },
  bottomSpacing: {
    height: 60,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 12,
  },
});

export default Categories;