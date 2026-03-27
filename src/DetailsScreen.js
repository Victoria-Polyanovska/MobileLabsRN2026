import { View, Text, Image, StyleSheet } from 'react-native';
import { useLayoutEffect } from 'react';

const DetailsScreen = ({ route, navigation }) => {
  const { item } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: item.title });
  }, [navigation, item.title]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1, padding: 20, backgroundColor: '#fff' 
    },
  image: { 
    width: '100%', height: 200, borderRadius: 10, marginBottom: 20 
  },
  title: {
     fontSize: 22, fontWeight: 'bold', marginBottom: 10 
    },
  description: { 
    fontSize: 16, color: '#444', lineHeight: 24 
  }
});

export default DetailsScreen;