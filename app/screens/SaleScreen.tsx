import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

// Define types for cart items and order
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  lastFourDigits?: string;
  icon: string;
}

// Define navigation and route types
type RootStackParamList = {
  Checkout: { items?: CartItem[] };
  OrderConfirmation: { orderId: string };
};

type NavigationType = {
  navigate: (screen: keyof RootStackParamList, params?: any) => void;
  goBack: () => void;
};

const CheckoutScreen = () => {
  const navigation = useNavigation<NavigationType>();
  const route = useRoute<RouteProp<RootStackParamList, 'Checkout'>>();

  const initialItems = route.params?.items || [];
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);
  const [processingPayment, setProcessingPayment] = useState<boolean>(false);

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    phoneNumber: ''
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);

  const paymentMethods: PaymentMethod[] = [
    { id: 'card1', name: 'Visa', lastFourDigits: '4242', icon: '💳' },
    { id: 'card2', name: 'PayPal', icon: '🅿️' },
    { id: 'card3', name: 'Apple Pay', icon: '🍏' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵' }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax - discount;

  const handleCheckout = () => {
    if (!shippingDetails.fullName || !shippingDetails.address || selectedPaymentMethod.trim() === '') {
      Alert.alert('Error', 'Please complete shipping and payment details.');
      return;
    }

    setProcessingPayment(true);

    setTimeout(() => {
      setProcessingPayment(false);
      Alert.alert('Order Placed', 'Your order has been placed successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('OrderConfirmation', { orderId: `ORD-${Date.now()}` });
          }
        }
      ]);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checkout</Text>
        <TouchableOpacity style={styles.backToCartButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backToCartText}>Back to Cart</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name} (x{item.quantity})</Text>
            <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={shippingDetails.fullName}
          onChangeText={(text) => setShippingDetails({ ...shippingDetails, fullName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={shippingDetails.address}
          onChangeText={(text) => setShippingDetails({ ...shippingDetails, address: text })}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentMethod,
              selectedPaymentMethod === method.id ? styles.selectedPayment : null
            ]}
            onPress={() => setSelectedPaymentMethod(method.id)}
          >
            <Text>{method.icon} {method.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout} disabled={processingPayment}>
        {processingPayment ? <ActivityIndicator color="white" /> : <Text style={styles.checkoutText}>Place Order</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  backToCartButton: { padding: 10 },
  backToCartText: { color: '#007AFF' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  itemName: { fontSize: 16 },
  itemPrice: { fontSize: 16, fontWeight: 'bold' },
  totalText: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  paymentMethod: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5
  },
  selectedPayment: {
    borderColor: '#007AFF',
    backgroundColor: '#E0F0FF'
  },
  checkoutButton: { backgroundColor: '#007AFF', padding: 15, alignItems: 'center', borderRadius: 5 },
  checkoutText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});

export default CheckoutScreen;
