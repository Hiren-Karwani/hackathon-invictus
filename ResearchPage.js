import React, { useState } from "react";
import {
    View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, Alert
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

const API_URL = "http://192.168.0.105:5000/search"; // Replace with your server's IP

const ResearchPage = ({ navigation }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchResearchPapers = async () => {
        if (!query.trim()) {
            Alert.alert("Error", "Please enter a search query.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`${API_URL}?query=${query}`);
            setResults(response.data.results || []);
        } catch (error) {
            console.error("Error fetching research papers:", error);
            setError("Failed to fetch research papers.");
        } finally {
            setLoading(false);
        }
    };

    const openURL = (url) => {
        if (url && url !== "#") {
            Linking.openURL(url);
        } else {
            Alert.alert("Error", "No valid link available for this research paper.");
        }
    };

    return (
        <LinearGradient colors={["#f5f5f5", "#e8e8e8"]} style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Find Research Papers</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Search for papers..."
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={fetchResearchPapers}
                />

                <TouchableOpacity
                    onPress={fetchResearchPapers}
                    disabled={!query.trim()}
                    style={[styles.button, !query.trim() && { backgroundColor: "#ccc" }]}
                >
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color="#007bff" style={styles.loading} />}
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.paper} onPress={() => navigation.navigate("ResearchDetails", { paper: item })}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.author}>{Array.isArray(item.authors) ? item.authors.join(", ") : item.authors}</Text>
                        <Text style={styles.year}>Year: {item.year}</Text>
                        <TouchableOpacity onPress={() => openURL(item.url)} style={styles.viewButton}>
                            <Text style={styles.buttonText}>Read Paper</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { marginTop: 100, padding: 20 }, // Moves title & search bar down
    header: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#333" },
    input: { 
        height: 50, 
        backgroundColor: "#fff", 
        borderRadius: 10, 
        paddingHorizontal: 15, 
        fontSize: 16, 
        marginBottom: 15, 
        borderWidth: 1, 
        borderColor: "#ddd", 
        shadowColor: "#000", 
        shadowOpacity: 0.1, 
        shadowOffset: { width: 0, height: 2 },
        elevation: 2
    },
    button: { backgroundColor: "#007bff", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 20 },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    loading: { marginVertical: 20 },
    error: { color: "red", fontSize: 16, textAlign: "center", marginBottom: 10 },
    paper: { padding: 15, backgroundColor: "#fff", borderRadius: 10, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
    author: { fontSize: 14, color: "#555", marginBottom: 5 },
    year: { fontSize: 14, color: "#777", marginBottom: 10 },
    viewButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, alignItems: "center" },
});

export default ResearchPage;
