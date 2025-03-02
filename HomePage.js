import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const HomePage = () => {
  const navigation = useNavigation(); // ✅ Navigation Hook

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      
      <Text style={styles.title}>Welcome to ResearchHub</Text>
      <Text style={styles.subtitle}>Find research, collaborate, and innovate</Text>

      <View style={styles.cardContainer}>
        {/* Research Card */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Research')}>
          <MaterialIcons name="science" size={40} color="#fff" />
          <Text style={styles.cardText}>Explore Research</Text>
        </TouchableOpacity>

        {/* Collaboration Card */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Collaboration')}>
          <FontAwesome5 name="users" size={35} color="#fff" />
          <Text style={styles.cardText}>Find Collaborators</Text>
        </TouchableOpacity>
      </View>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#eee',
    textAlign: 'center',
    marginBottom: 30,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // Android shadow
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
});

export default HomePage;
