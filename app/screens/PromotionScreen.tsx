import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface PromotionItem {
  id: string;
  type: 'hat' | 'cape';
  title: string;
  description: string;
  discount: string;
  price: string;
  originalPrice: string;
  image: string;
}

interface CategoryButtonProps {
  title: string;
  value: string;
}

interface PromotionCardProps {
  item: PromotionItem;
}

const PromotionScreen = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const promotions: PromotionItem[] = [
    {
      id: '1',
      type: 'hat',
      title: 'Premium Wizard Hat',
      description: 'Limited edition wizard hat with magical properties',
      discount: '25% OFF',
      price: '$29.99',
      originalPrice: '$39.99',
      image: 'https://example.com/wizard-hat.jpg',
    },
    {
      id: '2',
      type: 'cape',
      title: 'Royal Velvet Cape',
      description: 'Luxurious cape made with the finest velvet fabric',
      discount: '30% OFF',
      price: '$49.99',
      originalPrice: '$69.99',
      image: 'https://example.com/velvet-cape.jpg',
    },
    {
      id: '3',
      type: 'hat',
      title: 'Explorer\'s Safari Hat',
      description: 'Durable and stylish hat for all your adventures',
      discount: '20% OFF',
      price: '$24.99',
      originalPrice: '$29.99',
      image: 'https://example.com/safari-hat.jpg',
    },
    {
      id: '4',
      type: 'cape',
      title: 'Superhero Cape',
      description: 'Become the hero you were meant to be',
      discount: '40% OFF',
      price: '$19.99',
      originalPrice: '$34.99',
      image: 'https://example.com/superhero-cape.jpg',
    },
  ];

  const filteredPromotions = activeCategory === 'all' 
    ? promotions 
    : promotions.filter(item => item.type === activeCategory);

  const CategoryButton = ({ title, value }: CategoryButtonProps) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        activeCategory === value ? styles.activeCategory : null
      ]}
      onPress={() => setActiveCategory(value)}
    >
      <Text style={[
        styles.categoryButtonText,
        activeCategory === value ? styles.activeCategoryText : null
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const PromotionCard = ({ item }: PromotionCardProps) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imageContainer}>
        {/* Placeholder for image */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>{item.type === 'hat' ? '🎩' : '🧣'}</Text>
        </View>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Special Promotions</Text>
        <Text style={styles.headerSubtitle}>Exclusive deals on hats and capes</Text>
      </View>
      
      <View style={styles.categories}>
        <CategoryButton title="All Items" value="all" />
        <CategoryButton title="Hats" value="hat" />
        <CategoryButton title="Capes" value="cape" />
      </View>
      
      <ScrollView style={styles.promotionList}>
        {filteredPromotions.map(item => (
          <PromotionCard key={item.id} item={item} />
        ))}
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
    padding: 20,
    backgroundColor: '#6200ee',
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
  categories: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeCategory: {
    backgroundColor: '#6200ee',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#333',
  },
  activeCategoryText: {
    color: 'white',
  },
  promotionList: {
    flex: 1,
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  imagePlaceholder: {
    height: 150,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 50,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff4081',
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardContent: {
    padding: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  buyButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PromotionScreen;