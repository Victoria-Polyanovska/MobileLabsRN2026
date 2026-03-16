import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function GalleryScreen() {
  const router = useRouter();


const galleryPhotos = [
    require('../../assets/images/1. Черный кот с рыбкой.jpg'),
    require('../../assets/images/2. Хаски.jpg'),
    require('../../assets/images/3. Леопард.jpg'),
    require('../../assets/images/5. Белый тигренок.jpg'),
    require('../../assets/images/6. Жираф.jpg'),
    require('../../assets/images/7. Бабочка.jpg'),
    require('../../assets/images/8. Божья коровка.jpg'),
    require('../../assets/images/9. Пустыня.jpg'),
  ];

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
          <Ionicons name="images" size={24} color="#007BFF" />
          <Text style={[styles.tabText, styles.activeTabText]}>Фотогалерея</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
          <Ionicons name="person" size={24} color="#999" />
          <Text style={styles.tabText}>Профіль</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Фотогалерея</Text>

        <View style={styles.grid}>
          {galleryPhotos.map((photo, index) => (
            <Image 
              key={index} 
              source={photo} 
              style={styles.photoBox} 
              resizeMode="cover" 
            />
          ))}
        </View>
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
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  scrollContent: { 
    padding: 16 
  },
  sectionTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginVertical: 10, 
    color: '#333' 
  },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  photoBox: { 
    width: '48%', 
    height: 120, 
    backgroundColor: '#fff', 
    marginBottom: 16, 
    borderRadius: 6, 
    borderWidth: 1, 
    borderColor: '#e0e0e0', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 2, 
    elevation: 2 
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
