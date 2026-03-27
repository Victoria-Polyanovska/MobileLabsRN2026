import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/100' }} 
          style={styles.avatar}
        />
        <Text style={styles.name}>Поляновська Вікторія</Text>
        <Text style={styles.group}>Група: ІПЗ-24-2</Text>
      </View>

      <View style={styles.menuItems}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  group: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  menuItems: {
    paddingHorizontal: 10,
  }
});

export default CustomDrawer;