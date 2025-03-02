import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";

const ResearchDetails = ({ route }) => {
    const { paper } = route.params;

    const openURL = (url) => {
        if (url && url !== "#") {
            Linking.openURL(url);
        } else {
            Alert.alert("Error", "No valid link available for this research paper.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{paper.title}</Text>
            <Text style={styles.author}>Author(s): {Array.isArray(paper.authors) ? paper.authors.join(", ") : paper.authors}</Text>
            <Text style={styles.year}>Year: {paper.year}</Text>

            <TouchableOpacity onPress={() => openURL(paper.url)} style={styles.button}>
                <Text style={styles.buttonText}>Read Full Paper</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#FAFAFA" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#333" },
    author: { fontSize: 16, color: "#555", marginBottom: 5, textAlign: "center" },
    year: { fontSize: 16, color: "#777", marginBottom: 10, textAlign: "center" },
    button: { marginTop: 20, backgroundColor: "#007bff", padding: 12, borderRadius: 5, alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default ResearchDetails;
