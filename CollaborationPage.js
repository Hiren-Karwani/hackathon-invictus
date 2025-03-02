import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Dummy user profiles (logged-in user + other researchers)
const myProfile = { id: '1', name: 'You (My Profile)' };
const researchers = [
  { id: '2', name: 'Santosh Hinduja' },
  { id: '3', name: 'Hiren Karwani' },
  { id: '4', name: 'Vedant Navani' },
];

const CollaborationPage = () => {
  const [collaborations, setCollaborations] = useState({}); // Stores collaboration requests for each researcher
  const [inputText, setInputText] = useState(''); // Input text for collaboration request
  const [selectedResearcher, setSelectedResearcher] = useState(null); // Selected researcher

  // Handle sending collaboration request
  const sendCollaborationRequest = () => {
    if (!selectedResearcher || inputText.trim().length === 0) return;

    const newRequest = {
      id: Date.now(),
      text: inputText,
      sender: myProfile.id, // Request sent by logged-in user
    };

    setCollaborations((prevRequests) => ({
      ...prevRequests,
      [selectedResearcher.id]: [...(prevRequests[selectedResearcher.id] || []), newRequest],
    }));

    setInputText('');
  };

  return (
    <View style={styles.container}>
      {/* Researcher List */}
      <View style={styles.researcherList}>
        <Text style={styles.sectionTitle}>Researchers</Text>
        <FlatList
          data={researchers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.researcherItem,
                selectedResearcher?.id === item.id && styles.selectedResearcherItem,
              ]}
              onPress={() => setSelectedResearcher(item)}
            >
              <Text style={styles.researcherName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Collaboration Chat Window */}
      {selectedResearcher ? (
        <View style={styles.collaborationContainer}>
          <Text style={styles.collaborationHeader}>
            Collaboration with {selectedResearcher.name}
          </Text>
          
          <FlatList
            data={collaborations[selectedResearcher.id] || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.request, item.sender === myProfile.id ? styles.myRequest : styles.otherRequest]}>
                <Text style={styles.requestText}>{item.text}</Text>
              </View>
            )}
          />

          {/* Input Field & Request Button */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Propose a collaboration..."
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.requestButton} onPress={sendCollaborationRequest}>
              <Text style={styles.requestButtonText}>Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.selectResearcherMessage}>Select a researcher to collaborate with.</Text>
      )}
    </View>
  );
};

export default CollaborationPage;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  researcherList: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  researcherItem: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedResearcherItem: {
    backgroundColor: '#28a745',
  },
  researcherName: {
    color: 'black',
    fontWeight: 'bold',
  },
  collaborationContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  collaborationHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  request: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  myRequest: {
    backgroundColor: '#28a745',
    alignSelf: 'flex-end',
  },
  otherRequest: {
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
  },
  requestText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  requestButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  requestButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectResearcherMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
