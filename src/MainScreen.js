import React, { useState } from 'react';
import { 
  View, Text, FlatList, Image, StyleSheet, 
  RefreshControl, ActivityIndicator, TouchableOpacity 
} from 'react-native'; 
import { newsData } from './data';

export default function MainScreen({ navigation }) {
  const [data, setData] = useState(newsData);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(newsData);
      setRefreshing(false);
    }, 1500);
  };

  const handleLoadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const moreData = newsData.map(item => ({
        ...item,
        id: item.id + '_' + Math.random().toString(),
        title: item.title + ' (Нове)'
      }));
      setData(prevData => [...prevData, ...moreData]);
      setLoadingMore(false);
    }, 1500);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Details', { item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => <Text style={styles.headerText}>Стрічка новин</Text>;
  const renderSeparator = () => <View style={styles.separator} />;
  const renderFooter = () => (
    loadingMore ? <ActivityIndicator size="large" color="#0000ff" style={styles.loader} /> : null
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={renderSeparator}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={11}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1, backgroundColor: '#fff'
     },
  itemContainer: { 
    flexDirection: 'row', padding: 15 
  },
  image: {
     width: 100, height: 100, borderRadius: 8
     },
  textContainer: { 
    flex: 1, marginLeft: 15, justifyContent: 'center' 
  },
  title: { 
    fontSize: 16, fontWeight: 'bold', marginBottom: 5
   },
  description: {
     fontSize: 14, color: '#666' 
    },
  headerText: { 
    fontSize: 24, fontWeight: 'bold', textAlign: 'center', padding: 15, backgroundColor: '#f8f8f8'
   },
  separator: {
     height: 1, backgroundColor: '#e0e0e0', marginHorizontal: 15 
    },
  loader: { 
    marginVertical: 20 
  }
});