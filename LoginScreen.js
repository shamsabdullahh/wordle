import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { auth } from './firebaseConfig'; // Import the Firebase Auth instance
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'يرجى ملء جميع الحقول');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      Alert.alert('Success', `مرحبًا بك، ${user.email}`);
      navigation.navigate('HomeScreen'); // Navigate to the main app screen
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'كلمة المرور غير صحيحة.');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'المستخدم غير موجود.');
      } else {
        Alert.alert('Error', 'حدث خطأ أثناء تسجيل الدخول: ' + error.message);
      }
    } finally {
      setLoading(false);
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
      />
      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>دخول</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonReturn} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>رجوع</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#fff8e6",
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 80,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
    backgroundColor: "white",
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00FF6A',
    padding: 10,
    borderRadius: 5,
    width: '70%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonReturn: {
    backgroundColor: '#232b6e',
    padding: 10,
    borderRadius: 5,
    width: '70%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
