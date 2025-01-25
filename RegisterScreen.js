import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from './firebaseConfig'; // Firebase Auth & Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore methods

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (username && email && password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
      
        // Successfully registered
        alert(`تم التسجيل بنجاح! مرحبًا، ${user.email}`);
        navigation.navigate('LoginScreen'); // Navigate to login screen
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('البريد الإلكتروني مستخدم بالفعل. يرجى تسجيل الدخول.');
        } else if (error.code === 'auth/invalid-email') {
          alert('البريد الإلكتروني غير صالح.');
        } else if (error.code === 'auth/weak-password') {
          alert('كلمة المرور ضعيفة. يجب أن تحتوي على 6 أحرف على الأقل.');
        } else {
          alert('حدث خطأ أثناء التسجيل: ' + error.message);
        }
      }
      
    } else {
      alert('يرجى ملء جميع الحقول');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>سجل حسابك و ألعب!</Text>
      <TextInput
        style={styles.input}
        placeholder="اسم المستخدم"
        value={username}
        onChangeText={setUsername}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonTextRegister}>تسجيل</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonReturn} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>رجوع</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    marginVertical: 5,
    width: '70%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonReturn: {
    backgroundColor: '#232b6e',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '70%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonTextRegister: {
    color: '#232b6e',
    fontSize: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RegisterScreen;
