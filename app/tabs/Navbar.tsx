import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AllCategoriesScreen from '../screens/AllCategoriesScreen';
import CartScreen from '../screens/CartScreen';
import CategoryScreen from '../screens/CategoryScreen';
import FeaturedScreen from '../screens/FeaturedScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import PromotionScreen from '../screens/PromotionScreen';
import SaleScreen from '../screens/SaleScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Categories"
      screenOptions={({ route }) => ({
        headerShown: false, // 🔴 Hide header
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Categories') iconName = 'list';
          else if (route.name === 'Cart') iconName = 'cart';
          else if (route.name === 'Featured') iconName = 'star';
          else if (route.name === 'Sale') iconName = 'pricetag';
          else if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Product') iconName = 'shirt';
          else if (route.name === 'Promotion') iconName = 'megaphone';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Categories" component={AllCategoriesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Featured" component={FeaturedScreen} />
      <Tab.Screen name="Product" component={ProductDetailScreen} />
      <Tab.Screen name="Promotion" component={PromotionScreen} />
      <Tab.Screen name="Sale" component={SaleScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export default Navbar;
