import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function HistoryScreen() {
  const history = useSelector((state: RootState) => state.orders.history);

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderDate}>{item.date}</Text>
              <Text style={styles.orderTotal}>{item.totalAmount} грн</Text>
            </View>
            <View style={styles.divider} />
            {item.items.map((prod: any, index: number) => (
              <Text key={index} style={styles.productRow}>
                • {prod.name} (x{prod.quantity}) — {prod.price * prod.quantity} грн
              </Text>
            ))}
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Ви ще нічого не замовляли 📦</Text>
          </View>
        }
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  orderCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16, elevation: 2 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderDate: { fontSize: 14, color: '#888' },
  orderTotal: { fontSize: 16, fontWeight: 'bold', color: '#28a745' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  productRow: { fontSize: 14, color: '#444', marginBottom: 4 },
  emptyContainer: { flex: 1, alignItems: 'center', marginTop: 100 },
  emptyText: { fontSize: 16, color: '#999' }
});