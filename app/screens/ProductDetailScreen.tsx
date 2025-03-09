import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Category {
  name: string;
  image: any;
}

interface Props {
  category: Category;
  goBack: () => void;
}

const ProductDetailScreen = ({ category, goBack }: Props) => {
  // Mock product details based on the selected category
  const product = {
    id: '1',
    name: `${category.name}'s Casual ${category.name === 'Shoes' ? 'Shoes' : 'Shirt'}`,
    price: '$29.99',
    description: `A comfortable and stylish ${category.name === 'Shoes' ? 'pair of shoes' : 'shirt'} for ${category.name}.`,
    image: category.image, // Image set to null
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#FF0000', '#00FF00', '#0000FF'],
  };

  return (
    <View style={styles.container}>
      {product.image && <Image source={product.image} style={styles.productImage} />}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        <Text style={styles.sectionTitle}>Select Size</Text>
        <View style={styles.sizeContainer}>
          {product.sizes.map((size, index) => (
            <TouchableOpacity key={index} style={styles.sizeButton}>
              <Text style={styles.sizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Select Color</Text>
        <View style={styles.colorContainer}>
          {product.colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorButton, { backgroundColor: color }]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 20,
    color: '#888',
    marginVertical: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sizeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sizeButton: {
    padding: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  sizeText: {
    fontSize: 16,
  },
  colorContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  addToCartButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ddd',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;