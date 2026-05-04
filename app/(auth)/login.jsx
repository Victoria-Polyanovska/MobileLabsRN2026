import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Функція входу (Пункт 1 завдання)
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Помилка', 'Заповніть всі поля');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Після успішного входу _layout.jsx автоматично перенаправить у (app)/profile
    } catch (error) {
      Alert.alert('Помилка входу', error.message);
    }
  };

  // Функція відновлення пароля (Пункт 5 завдання)
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Увага', 'Введіть email для отримання посилання на скидання');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Успіх', 'Інструкції зі скидання пароля надіслано на вашу пошту');
    } catch (error) {
      Alert.alert('Помилка', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вхід у систему</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Пароль" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      <Button title="Увійти" onPress={handleLogin} color="#007AFF" />

      <TouchableOpacity onPress={handleForgotPassword} style={styles.secondaryButton}>
        <Text style={styles.linkText}>Забули пароль?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/register')} style={styles.secondaryButton}>
        <Text style={styles.linkText}>Немає акаунту? Зареєструватися</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 30, 
    textAlign: 'center' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 12, 
    marginBottom: 15, 
    borderRadius: 8,
    fontSize: 16 
  },
  secondaryButton: {
    marginTop: 15,
  },
  linkText: { 
    color: '#007AFF', 
    textAlign: 'center',
    fontSize: 16
  }
});