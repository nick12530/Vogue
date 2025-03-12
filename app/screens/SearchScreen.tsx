import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView
} from 'react-native';

// Define TypeScript interfaces for the product data
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('All');

  // Categories based on the specified groups
  const categories = ['All', 'Men', 'Women', 'Children', 'Sneakers', 'Jewelry', 'Hats', 'Caps'];

  // Mock product data with the specified categories
  useEffect(() => {
    // Simulate fetching products from an API
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Simulating API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock product data with the specified categories
        const mockProducts: Product[] = [
          { id: '1', name: 'Men\'s T-shirt', price: 24.99, category: 'Men' },
          { id: '2', name: 'Men\'s Jeans', price: 59.99, category: 'Men' },
          { id: '3', name: 'Men\'s Polo Shirt', price: 34.99, category: 'Men' },
          { id: '4', name: 'Women\'s Blouse', price: 29.99, category: 'Women' },
          { id: '5', name: 'Women\'s Dress', price: 49.99, category: 'Women' },
          { id: '6', name: 'Women\'s Skirt', price: 39.99, category: 'Women' },
          { id: '7', name: 'Children\'s Shirt', price: 19.99, category: 'Children' },
          { id: '8', name: 'Children\'s Pants', price: 24.99, category: 'Children' },
          { id: '9', name: 'Nike Air Max', price: 129.99, category: 'Sneakers' },
          { id: '10', name: 'Adidas Ultraboost', price: 149.99, category: 'Sneakers' },
          { id: '11', name: 'Puma RS-X', price: 99.99, category: 'Sneakers' },
          { id: '12', name: 'Gold Necklace', price: 249.99, category: 'Jewelry' },
          { id: '13', name: 'Silver Bracelet', price: 89.99, category: 'Jewelry' },
          { id: '14', name: 'Diamond Earrings', price: 399.99, category: 'Jewelry' },
          { id: '15', name: 'Fedora Hat', price: 45.99, category: 'Hats' },
          { id: '16', name: 'Sun Hat', price: 29.99, category: 'Hats' },
          { id: '17', name: 'Baseball Cap', price: 19.99, category: 'Caps' },
          { id: '18', name: 'Snapback Cap', price: 24.99, category: 'Caps' },
          { id: '19', name: 'Trucker Cap', price: 22.99, category: 'Caps' },
        ];
        
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search query changes
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    filterProducts(text, selectedCategory);
  };

  // Filter products based on search query and selected category
  const filterProducts = (query: string, category: string | null) => {
    let filtered: Product[] = [...products];
    
    // Filter by search query
    if (query.trim() !== '') {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Filter by category
    if (category && category !== 'All') {
      filtered = filtered.filter(product => 
        product.category === category
      );
    }
    
    setFilteredProducts(filtered);
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery('');
    filterProducts('', selectedCategory);
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    const newCategory = category === selectedCategory ? 'All' : category;
    setSelectedCategory(newCategory);
    filterProducts(searchQuery, newCategory);
  };

  // Render each product item
  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productItem}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
        />
        {searchQuery !== '' && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Category filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton
            ]}
            onPress={() => handleCategorySelect(category)}
          >
            <Text 
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.selectedCategoryButtonText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <>
          <Text style={styles.resultsText}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </Text>
          
          {filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts}
              keyExtractor={(item) => item.id}
              renderItem={renderProductItem}
              contentContainerStyle={styles.productList}
            />
          ) : (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No products found matching "{searchQuery}"</Text>
              {selectedCategory !== 'All' && (
                <Text style={styles.noResultsSubText}>
                  Try removing the category filter or changing your search term
                </Text>
              )}
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  clearButton: {
    position: 'absolute',
    right: 16,
    height: 50,
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#888',
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryContent: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedCategoryButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  resultsText: {
    marginBottom: 16,
    fontSize: 14,
    color: '#666',
  },
  productList: {
    paddingBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  loader: {
    marginTop: 50,
  },
});

export default SearchScreen;