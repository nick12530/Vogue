import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeaturedScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Featured Screen</Text>
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

export default FeaturedScreen;
