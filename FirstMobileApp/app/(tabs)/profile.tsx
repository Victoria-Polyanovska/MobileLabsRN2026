import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');

  const handleRegister = () => {
    alert(`Користувач ${surname} ${name} зареєстрований!`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.appTitle}>FirstMobileApp</Text>
      </View>

     
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/')}>
          <Ionicons name="home" size={24} color="#999" />
          <Text style={styles.tabText}>Головна</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/gallery')}>
          <Ionicons name="images" size={24} color="#999" />
          <Text style={styles.tabText}>Фотогалерея</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
          <Ionicons name="person" size={24} color="#007BFF" />
          <Text style={[styles.tabText, styles.activeTabText]}>Профіль</Text>
        </TouchableOpacity>
      </View>

      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Реєстрація</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Електронна пошта</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Пароль</Text>
          <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Пароль (ще раз)</Text>
          <TextInput style={styles.input} secureTextEntry value={repeatPassword} onChangeText={setRepeatPassword} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Прізвище</Text>
          <TextInput style={styles.input} value={surname} onChangeText={setSurname} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ім'я</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
      </ScrollView>

      
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Поляновська Вікторія Едуардівна, ІПЗ-24-2</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  headerContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    marginTop: 10 
  },
  logo: { 
    width: 100, 
    height: 100, 
    resizeMode: 'contain' 
  },
  appTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#333' 
  },
  tabBar: { 
    flexDirection: 'row', 
    backgroundColor: '#F2F2F2', 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd' 
  },
  tabItem: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  tabText: { 
    fontSize: 12, 
    color: '#999', 
    marginTop: 4 
  },
  activeTabText: { 
    color: '#007BFF', 
    fontWeight: '500' 
  },
  scrollContainer: { 
    flex: 1 
  },
  scrollContent: { 
    padding: 20, 
    paddingBottom: 40 
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 24, 
    color: '#000' 
  },
  inputGroup: { 
    marginBottom: 16 
  },
  label: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 6 
  },
  input: { 
    height: 44, 
    borderWidth: 1, 
    borderColor: '#E0E0E0', 
    borderRadius: 6, 
    paddingHorizontal: 12, 
    backgroundColor: '#FFF', 
    fontSize: 16 
  },
  button: { 
    backgroundColor: '#007BFF', 
    paddingVertical: 14, 
    borderRadius: 6, 
    alignItems: 'center', 
    marginTop: 10 
  },
  buttonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  footerContainer: { 
    paddingVertical: 12, 
    backgroundColor: '#F8F8F8', 
    alignItems: 'center', 
    borderTopWidth: 1, 
    borderTopColor: '#EEEEEE' 
  },
  footerText: { 
    fontSize: 12, 
    fontStyle: 'italic', 
    color: '#666' 
  },
});

