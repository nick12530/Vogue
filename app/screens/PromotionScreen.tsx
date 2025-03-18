import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface Jersey {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  image: any; // Use `any` for require statements
  type: 'club' | 'national';
}

interface CategoryButtonProps {
  title: string;
  value: string;
  isActive: boolean;
  onPress: () => void;
}

// Import images using require
const jerseys: Jersey[] = [
  {
    id: '1',
    title: 'Real Madrid Home Jersey',
    price: '$79.99',
    originalPrice: '$99.99',
    image: require('../../assets/realm.jpg'), // Use require for local images
    type: 'club',
  },
  {
    id: '2',
    title: 'FC Barcelona Away Jersey',
    price: '$74.99',
    originalPrice: '$89.99',
    image: require('../../assets/Barcelona.jpg'), // Use require for local images
    type: 'club',
  },
  {
    id: '3',
    title: 'Brazil National Team Jersey',
    price: '$69.99',
    originalPrice: '$89.99',
    image: require('../../assets/brazil.jpg'), // Use require for local images
    type: 'national',
  },
  {
    id: '4',
    title: 'France National Team Jersey',
    price: '$64.99',
    originalPrice: '$89.99',
    image: require('../../assets/france.jpg'), // Use require for local images
    type: 'national',
  },
  {
    id: '5',
    title: 'Manchester United Home Jersey',
    price: '$69.99',
    originalPrice: '$79.99',
    image: require('../../assets/manchester.jpg'), // Use require for local images
    type: 'club',
  },
  {
    id: '6',
    title: 'Liverpool Third Jersey',
    price: '$72.99',
    originalPrice: '$89.99',
    image: require('../../assets/liverpool.jpg'), // Use require for local images
    type: 'club',
  },
  {
    id: '7',
    title: 'Argentina National Team Jersey',
    price: '$75.99',
    originalPrice: '$99.99',
    image: require('../../assets/argentina.jpg'), // Use require for local images
    type: 'national',
  },
  {
    id: '8',
    title: 'Bayern Munich Home Jersey',
    price: '$77.99',
    originalPrice: '$89.99',
    image: require('../../assets/bayern.jpg'), // Use require for local images
    type: 'club',
  },
  {
    id: '9',
    title: 'Spain National Team Jersey',
    price: '$69.99',
    originalPrice: '$89.99',
    image: require('../../assets/spain.jpg'), // Use require for local images
    type: 'national',
  },
  {
    id: '10',
    title: 'Chelsea Away Jersey',
    price: '$74.99',
    originalPrice: '$89.99',
    image: require('../../assets/chelsea.jpg'), // Use require for local images
    type: 'club',
  },
];

const JerseyScreen = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredJerseys = activeCategory === 'all'
    ? jerseys
    : jerseys.filter(jersey => jersey.type === activeCategory);

  const CategoryButton = ({ title, value, isActive, onPress }: CategoryButtonProps) => (
    <TouchableOpacity
      style={[styles.categoryButton, isActive && styles.activeCategoryButton]}
      onPress={onPress}
    >
      <Text style={[styles.categoryButtonText, isActive && styles.activeCategoryButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderJerseyItem = ({ item }: { item: Jersey }) => (
    <View style={styles.jerseyCard}>
      <Image source={item.image} style={styles.jerseyImage} />
      <Text style={styles.jerseyTitle}>{item.title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{item.price}</Text>
        {item.originalPrice && (
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Football Jerseys</Text>
        <Text style={styles.headerSubtitle}>Exclusive deals on club and national team jerseys</Text>
      </View>

      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        <CategoryButton
          title="All"
          value="all"
          isActive={activeCategory === 'all'}
          onPress={() => setActiveCategory('all')}
        />
        <CategoryButton
          title="Club"
          value="club"
          isActive={activeCategory === 'club'}
          onPress={() => setActiveCategory('club')}
        />
        <CategoryButton
          title="National"
          value="national"
          isActive={activeCategory === 'national'}
          onPress={() => setActiveCategory('national')}
        />
      </ScrollView>

      {/* Jersey Grid */}
      <FlatList
        data={filteredJerseys}
        renderItem={renderJerseyItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.jerseyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#87CEEB', // Sky blue header
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  categoryContainer: {
    paddingVertical: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  categoryButton: {
    paddingVertical: 8, // Adjusted padding for compact tabs
    paddingHorizontal: 16, // Adjusted padding for compact tabs
    marginHorizontal: 5,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  activeCategoryButton: {
    backgroundColor: '#87CEEB', // Sky blue for active category
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#333',
  },
  activeCategoryButtonText: {
    color: 'white',
  },
  jerseyList: {
    padding: 10,
  },
  jerseyCard: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jerseyImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  jerseyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#87CEEB', // Sky blue for price
    marginRight: 5,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: '#87CEEB', // Sky blue for button
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default JerseyScreen;