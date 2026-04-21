import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PRODUCTS } from '../../../constants/products';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.center}><Text>Товар не знайдено!</Text></View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: product.name, headerBackTitle: 'Назад' }} />
      
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.descriptionTitle}>Опис:</Text>
        <Text style={styles.description}>{product.desc}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 300, resizeMode: 'cover' },
  content: { padding: 20 },
  name: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 22, color: '#28a745', fontWeight: 'bold', marginBottom: 20 },
  descriptionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 5 },
  description: { fontSize: 16, color: '#666', lineHeight: 24 }
});