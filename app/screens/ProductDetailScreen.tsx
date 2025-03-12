import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';

// Define product types
interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: any;
  description: string;
}

interface Category {
  id: string;
  name: string;
  image: any;
  productCount: number;
}

interface Props {
  goBack: () => void;
  navigateToProductDetail: (product: Product) => void;
  navigateToCategory: (category: Category) => void;
}

const ProductSummaryScreen = ({ goBack, navigateToProductDetail, navigateToCategory }: Props) => {
  const [activeTab, setActiveTab] = useState<'categories' | 'featured' | 'all'>('categories');

  // Mock categories
  const categories: Category[] = [
    { id: '1', name: 'Clothes', image: null, productCount: 24 },
    { id: '2', name: 'Shoes', image: null, productCount: 18 },
    { id: '3', name: 'Jewelry', image: null, productCount: 12 },
    { id: '4', name: 'Caps', image: null, productCount: 8 },
    { id: '5', name: 'Hats', image: null, productCount: 10 },
  ];

  // Mock products from all categories
  const allProducts: Product[] = [
    { id: '101', name: 'Summer T-Shirt', price: '$19.99', category: 'Clothes', image: null, description: 'Lightweight cotton t-shirt perfect for summer.' },
    { id: '102', name: 'Denim Jeans', price: '$49.99', category: 'Clothes', image: null, description: 'Classic denim jeans with modern fit.' },
    { id: '103', name: 'Running Shoes', price: '$79.99', category: 'Shoes', image: null, description: 'Comfortable shoes for your daily run.' },
    { id: '104', name: 'Silver Necklace', price: '$89.99', category: 'Jewelry', image: null, description: 'Elegant silver necklace for any occasion.' },
    { id: '105', name: 'Baseball Cap', price: '$24.99', category: 'Caps', image: null, description: 'Adjustable cap with embroidered logo.' },
    { id: '106', name: 'Fedora Hat', price: '$34.99', category: 'Hats', image: null, description: 'Classic fedora hat with a modern twist.' },
    { id: '107', name: 'Winter Jacket', price: '$129.99', category: 'Clothes', image: null, description: 'Warm winter jacket with water-resistant finish.' },
    { id: '108', name: 'Dress Shoes', price: '$99.99', category: 'Shoes', image: null, description: 'Elegant dress shoes for formal occasions.' },
  ];

  // Featured products (could be bestsellers, new arrivals, etc.)
  const featuredProducts = allProducts.slice(0, 4);

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => navigateToCategory(item)}
    >
      <View style={styles.categoryImagePlaceholder}>
        <Text style={styles.categoryImageText}>{item.name.charAt(0)}</Text>
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryCount}>{item.productCount} items</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigateToProductDetail(item)}
    >
      <View style={styles.productImagePlaceholder}>
        <Text style={styles.productImageText}>{item.category.charAt(0)}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Catalog</Text>
        <TouchableOpacity onPress={goBack} style={styles.backButtonSmall}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'categories' && styles.activeTab]} 
          onPress={() => setActiveTab('categories')}
        >
          <Text style={[styles.tabText, activeTab === 'categories' && styles.activeTabText]}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'featured' && styles.activeTab]} 
          onPress={() => setActiveTab('featured')}
        >
          <Text style={[styles.tabText, activeTab === 'featured' && styles.activeTabText]}>Featured</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]} 
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All Products</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'categories' && (
          <View>
            <Text style={styles.sectionTitle}>Browse by Category</Text>
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalListContainer}
            />
            
            <Text style={styles.sectionTitle}>Featured Products</Text>
            {featuredProducts.map(product => (
              renderProductItem({ item: product })
            ))}
          </View>
        )}

        {activeTab === 'featured' && (
          <View>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            {featuredProducts.map(product => (
              renderProductItem({ item: product })
            ))}
          </View>
        )}

        {activeTab === 'all' && (
          <View>
            <Text style={styles.sectionTitle}>All Products</Text>
            {allProducts.map(product => (
              renderProductItem({ item: product })
            ))}
          </View>
        )}

        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Inventory Summary</Text>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryText}>Total Categories: {categories.length}</Text>
            <Text style={styles.summaryText}>Total Products: {allProducts.length}</Text>
            <Text style={styles.summaryText}>Categories:</Text>
            {categories.map(category => (
              <Text key={category.id} style={styles.summaryItem}>• {category.name}: {category.productCount} items</Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButtonSmall: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 14,
    color: '#888',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  horizontalListContainer: {
    paddingRight: 16,
    marginBottom: 24,
  },
  categoryCard: {
    width: 120,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryImagePlaceholder: {
    width: 96,
    height: 96,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryImageText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#666',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoryCount: {
    fontSize: 12,
    color: '#888',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  productImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImageText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#666',
  },
  productInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  summarySection: {
    marginTop: 24,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 8,
  },
  summaryItem: {
    fontSize: 14,
    color: '#555',
    marginLeft: 16,
    marginBottom: 4,
  },
});

export default ProductSummaryScreen;