import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { signOut, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

export default function ProfileScreen() {
  const [profile, setProfile] = useState({ name: '', age: '', city: '' });
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  // Завантаження даних (для редагування)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.error("Помилка завантаження:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Збереження та Редагування (Пункт 2 і 4)
  const handleSave = async () => {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...profile,
        email: user.email,
        updatedAt: new Date().toISOString()
      });
      Alert.alert('Успіх', 'Дані профілю збережено/оновлено!');
    } catch (error) {
      Alert.alert('Помилка', error.message);
    }
  };

  // Видалення акаунту (Пункт 4)
  const handleDeleteAccount = () => {
    Alert.alert(
      'Видалення',
      'Ви впевнені, що хочете видалити акаунт і всі дані?',
      [
        { text: 'Скасувати', style: 'cancel' },
        { 
          text: 'Видалити', 
          style: 'destructive', 
          onPress: async () => {
            try {
              // 1. Видаляємо дані з Firestore
              await deleteDoc(doc(db, 'users', user.uid));
              // 2. Видаляємо самого користувача з Auth
              await deleteUser(user);
              Alert.alert('Прощавайте', 'Акаунт видалено');
            } catch (error) {
              Alert.alert('Помилка', 'Для видалення потрібно перезайти в додаток (безпека Firebase)');
            }
          } 
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Налаштування профілю</Text>
      <Text style={styles.subText}>Email: {user?.email}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Ваше ім’я"
        value={profile.name}
        onChangeText={(txt) => setProfile({ ...profile, name: txt })}
      />
      <TextInput
        style={styles.input}
        placeholder="Ваш вік"
        value={profile.age}
        keyboardType="numeric"
        onChangeText={(txt) => setProfile({ ...profile, age: txt })}
      />
      <TextInput
        style={styles.input}
        placeholder="Ваше місто"
        value={profile.city}
        onChangeText={(txt) => setProfile({ ...profile, city: txt })}
      />

      <Button title="Зберегти / Оновити дані" onPress={handleSave} color="#28a745" />
      
      <View style={{ marginVertical: 20, borderBottomWidth: 1, borderBottomColor: '#eee' }} />
      
      <Button title="Вийти з акаунту" onPress={() => signOut(auth)} color="#ffc107" />
      <View style={{ marginVertical: 10 }} />
      <Button title="Видалити мій акаунт" onPress={handleDeleteAccount} color="#dc3545" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, flexGrow: 1, justifyContent: 'center', backgroundColor: '#fff' },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subText: { fontSize: 14, color: 'gray', marginBottom: 25, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, marginBottom: 15, borderRadius: 8, fontSize: 16 }
});