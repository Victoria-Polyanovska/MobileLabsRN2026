import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';

const contactsData = [
  {
    title: 'Викладачі',
    data: [
      { id: '1', name: 'Іваненко Іван Іванович', email: 'ivanenko@ztu.edu.ua' },
      { id: '2', name: 'Петренко Петро Петрович', email: 'petrenko@ztu.edu.ua' },
    ],
  },
  {
    title: 'Студенти',
    data: [
      { id: '3', name: 'Олексієнко Олексій', email: 'oleksienko@student.ztu.edu.ua' },
      { id: '4', name: 'Марієнко Марія', email: 'marienko@student.ztu.edu.ua' },
      { id: '5', name: 'Коваленко Микола', email: 'kovalenko@student.ztu.edu.ua' },
    ],
  },
];

const ContactsScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <SectionList
        sections={contactsData} 
        keyExtractor={(item) => item.id} 
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1, backgroundColor: '#fff'
     },
  headerContainer: {
     backgroundColor: '#e6f7ff', padding: 10, borderBottomWidth: 1, borderColor: '#91d5ff' 
    },
  headerText: {
     fontSize: 18, fontWeight: 'bold', color: '#0050b3'
     },
  itemContainer: {
     padding: 15 
    },
  name: {
     fontSize: 16, fontWeight: '600' 
    },
  email: {
     fontSize: 14, color: '#666', marginTop: 4 
    },
  separator: {
     height: 1, backgroundColor: '#f0f0f0', marginHorizontal: 15
     },
});

export default ContactsScreen;