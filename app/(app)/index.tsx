import { Link } from 'expo-router';
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PRODUCTS } from '../../constants/products';
import { useAuth } from '../../context/AuthContext';

export default function CatalogScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Магазин</Text>
        <Button title="Вийти" onPress={logout} color="red" />
      </View>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/(app)/details/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text>{item.price}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', paddingTop: 60 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    marginBottom: 20 
  },
  title: { fontSize: 28, fontWeight: '800', color: '#1C1C1E' },
  list: { paddingHorizontal: 15 },
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    marginBottom: 12, 
    borderRadius: 16, 
    padding: 12,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 3,
    alignItems: 'center'
  },
  image: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#f0f0f0' },
  info: { flex: 1, marginLeft: 15 },
  name: { fontSize: 18, fontWeight: '700', color: '#1C1C1E' },
  price: { fontSize: 16, color: '#007AFF', fontWeight: 'bold', marginTop: 4 },
  logoutButton: { backgroundColor: '#FF3B30', padding: 8, borderRadius: 8 }
});