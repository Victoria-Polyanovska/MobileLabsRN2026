import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';
import { RootState } from '../../store/store';

export default function CartScreen() {
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Кошик порожній 🛒</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>Сума: {item.price * item.quantity} грн</Text>
            </View>
            
            <View style={styles.controls}>
              <TouchableOpacity 
                onPress={() => dispatch(updateQuantity({ id: item.id, amount: -1 }))}
                style={styles.actionBtn}
              >
                <Text style={styles.btnText}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.quantity}>{item.quantity}</Text>
              
              <TouchableOpacity 
                onPress={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))}
                style={styles.actionBtn}
              >
                <Text style={styles.btnText}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => dispatch(removeFromCart(item.id))}
                style={[styles.actionBtn, { backgroundColor: '#ff4d4d', marginLeft: 10 }]}
              >
                <FontAwesome name="trash" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>Загалом: {totalAmount} грн</Text>
        <TouchableOpacity 
          style={styles.orderButton}
          onPress={() => router.push('/checkout')} 
        >
          <Text style={styles.orderButtonText}>Оформити замовлення</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import FontAwesome from '@expo/vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#888' },
  cartItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { color: '#28a745' },
  controls: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { 
    backgroundColor: '#eee', 
    width: 35, 
    height: 35, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 5 
  },
  btnText: { fontSize: 20, fontWeight: 'bold' },
  quantity: { marginHorizontal: 12, fontSize: 16, fontWeight: '600' },
  footer: { 
    marginTop: 20, 
    padding: 16, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee'
  },
  totalText: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginBottom: 15 },
  orderButton: { backgroundColor: '#007bff', padding: 16, borderRadius: 10, alignItems: 'center' },
  orderButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});