import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CollaborationPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collaboration Page</Text>
      <Text style={styles.subtitle}>Connect with researchers and collaborate.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default CollaborationPage;
