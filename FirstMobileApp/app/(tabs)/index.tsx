import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter(); 

  const news = Array(8).fill({
    title: 'Заголовок новини',
    date: 'Дата новини',
    text: 'Короткий текст новини',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.appTitle}>FirstMobileApp</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/')}>
          <Ionicons name="home" size={24} color="#007BFF" />
          <Text style={[styles.tabText, styles.activeTabText]}>Головна</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/gallery')}>
          <Ionicons name="images" size={24} color="#999" />
          <Text style={styles.tabText}>Фотогалерея</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
          <Ionicons name="person" size={24} color="#999" />
          <Text style={styles.tabText}>Профіль</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Новини</Text>
        {news.map((item, index) => (
          <View key={index} style={styles.newsRow}>
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={40} color="#ccc" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDate}>{item.date}</Text>
              <Text style={styles.newsText}>{item.text}</Text>
            </View>
          </View>
        ))}
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
    paddingHorizontal: 16 
  },
  sectionTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginVertical: 20, 
    color: '#333' 
  },
  newsRow: { 
    flexDirection: 'row', 
    marginBottom: 20, 
    alignItems: 'center' 
  },
  imagePlaceholder: { 
    width: 80, 
    height: 80, 
    backgroundColor: '#F5F5F5', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 16, 
    borderRadius: 6 
  },
  textContainer: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  newsTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 4 
  },
  newsDate: { 
    fontSize: 13, 
    color: '#999', 
    marginBottom: 4 
  },
  newsText: { 
    fontSize: 14, 
    color: '#666' 
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
