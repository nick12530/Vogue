import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AllCategoriesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>All Categories Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AllCategoriesScreen;
