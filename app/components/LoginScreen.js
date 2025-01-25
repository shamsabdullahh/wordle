import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebase_auth } from '../firebase';
import { GameContext } from '../GameContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useContext(GameContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "الرجاء إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(firebase_auth, email, password);
      setCurrentUser(userCredential.user);
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تسجيل الدخول</Text>
      <TextInput
        style={styles.input}
        placeholder="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>دخول</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        <Text style={styles.secondaryButtonText}>إنشاء حساب جديد</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff8e6",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 80,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "80%",
    backgroundColor: "white",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00FF6A",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "70%",
    alignItems: "center",
    marginTop: 15,
  },
  buttonReturn: {
    backgroundColor: "#232b6e",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "70%",
    alignItems: "center",
    marginTop: 15,
  },
  buttonTextLogin: {
    color: "#232b6e",
    fontSize: 16,
  },
  buttonTextReturn: {
    color: "white",
    fontSize: 16,
  },
});

export default LoginScreen;