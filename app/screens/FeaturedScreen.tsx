import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import images using require
const chronographImage = require('../../assets/chronograph.jpg');
const iceChainImage = require('../../assets/icechain.jpg');
const goldWatchImage = require('../../assets/goldwatch.jpg');
const sapphireImage = require('../../assets/saphire.jpg');
const newArrivalsImage = require('../../assets/newarrivals.jpg');

// Define types
type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  image: any; // Use `any` for require statements
};

type Category = {
  id: number;
  name: string;
};

const FeaturedScreen = () => {
  // Sample featured products data for watches and ice chains
  const featuredProducts: Product[] = [
    { id: 1, name: 'Luxury Chronograph Watch', price: '$2,499', category: 'watches', image: chronographImage },
    { id: 2, name: 'Diamond Ice Chain', price: '$1,999', category: 'ice-chains', image: iceChainImage },
    { id: 3, name: 'Minimalist Gold Watch', price: '$1,199', category: 'watches', image: goldWatchImage },
    { id: 4, name: 'Platinum Ice Chain', price: '$2,299', category: 'ice-chains', image: iceChainImage },
    { id: 5, name: 'Sapphire Tennis Bracelet', price: '$899', category: 'ice-chains', image: sapphireImage },
    { id: 6, name: 'Rose Gold Watch', price: '$1,499', category: 'watches', image: goldWatchImage },
  ];

  // Sample categories for watches and ice chains
  const categories: Category[] = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Watches' },
    { id: 3, name: 'Ice Chains' },
  ];

  // Product card component
  const ProductCard = ({ product }: { product: Product }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.productImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandName}>LUXE</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image 
            source={newArrivalsImage} // Use imported image
            style={styles.heroBannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Timeless Elegance</Text>
            <Text style={styles.bannerSubtitle}>Discover our premium watches and ice chains</Text>
            <TouchableOpacity style={styles.shopNowButton}>
              <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map(category => (
            <TouchableOpacity key={category.id} style={styles.categoryButton}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Featured Products */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Collection</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.productsGrid}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </View>
        
        {/* New Arrivals Banner */}
        <View style={styles.newArrivalsBanner}>
          <Text style={styles.newArrivalsTitle}>New Arrivals</Text>
          <Text style={styles.newArrivalsSubtitle}>Exclusive watches and ice chains just for you</Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore Collection</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#333" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Ionicons name="grid" size={24} color="#D4AF37" />
          <Text style={[styles.navText, styles.activeNavText]}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={24} color="#333" />
          <Text style={styles.navText}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#333" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37', // Gold color for luxury feel
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  heroBanner: {
    position: 'relative',
    height: 200,
    marginBottom: 20,
  },
  heroBannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  shopNowButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  shopNowText: {
    color: '#333',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  categoriesContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontWeight: '500',
    color: '#333',
  },
  featuredSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#D4AF37',
    fontWeight: '500',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: '500',
  },
  newArrivalsBanner: {
    margin: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  newArrivalsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  newArrivalsSubtitle: {
    fontSize: 14,
    color: '#DDDDDD',
    marginBottom: 15,
  },
  exploreButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    borderTopWidth: 3,
    borderTopColor: '#D4AF37',
    paddingTop: 3,
    marginTop: -6,
  },
  navText: {
    fontSize: 12,
    marginTop: 3,
    color: '#333',
  },
  activeNavText: {
    color: '#D4AF37',
    fontWeight: '500',
  },
});

export default FeaturedScreen;