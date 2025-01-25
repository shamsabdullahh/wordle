import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>مرحبًا بك في لعبة التخمين</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GameScreenwAccount')}
      >
        <Text style={styles.buttonText}>ابدأ اللعبة</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#234C34',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00ff6A',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#234C34',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
