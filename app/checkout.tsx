import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import { addOrder } from '../store/slices/ordersSlice';
import { setUserData } from '../store/slices/usersSlice';
import { RootState } from '../store/store';

export default function CheckoutScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  const [form, setForm] = useState({
    pib: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleConfirmOrder = () => {
    if (!form.pib || !form.email || !form.phone || !form.address) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля форми.");
      return;
    }

    dispatch(setUserData(form));

    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      items: items,
      totalAmount: totalAmount,
    };

    dispatch(addOrder(newOrder));

    dispatch(clearCart());

    Alert.alert("Успіх", "Ваше замовлення успішно оформлено!", [
      { text: "На головну", onPress: () => router.replace('/(tabs)') }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'Оформлення замовлення', headerBackTitle: 'Назад' }} />
      
      <Text style={styles.header}>Контактні дані</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>ПІБ</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Прізвище Ім'я По батькові"
          value={form.pib}
          onChangeText={(text) => setForm({...form, pib: text})}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input} 
          placeholder="example@gmail.com"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => setForm({...form, email: text})}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Телефон</Text>
        <TextInput 
          style={styles.input} 
          placeholder="+380..."
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(text) => setForm({...form, phone: text})}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Адреса</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Місто, № відділення або вулиця"
          multiline
          value={form.address}
          onChangeText={(text) => setForm({...form, address: text})}
        />
      </View>

      <View style={styles.totalBlock}>
        <Text style={styles.totalText}>Сума до сплати: {totalAmount} грн</Text>
      </View>

      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmOrder}>
        <Text style={styles.confirmBtnText}>Підтвердити замовлення</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, color: '#666', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  totalBlock: { marginTop: 20, padding: 20, backgroundColor: '#f8f9fa', borderRadius: 10 },
  totalText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  confirmBtn: { backgroundColor: '#28a745', padding: 18, borderRadius: 10, marginTop: 20, marginBottom: 40, alignItems: 'center' },
  confirmBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});