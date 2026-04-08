import React, { useState, useEffect } from 'react';
import {
  StyleSheet,Text,View,FlatList,TouchableOpacity,Modal,TextInput,Button,Platform,
} from 'react-native';
import { 
  SafeAreaProvider, 
  useSafeAreaInsets 
} from 'react-native-safe-area-context';

function FileManagerApp() {
  const insets = useSafeAreaInsets();

  // Імітація файлової системи
  const [files, setFiles] = useState([
    { 
      name: 'Навчання', 
      isDirectory: true, 
      size: 0, 
      content: '', 
      id: '1', 
      updatedAt: new Date().toLocaleString() 
    },
    { 
      name: 'readme.txt', 
      isDirectory: false, 
      size: 1024, 
      content: 'Вітаю у менеджері!', 
      id: '2', 
      updatedAt: new Date().toLocaleString() 
    },
  ]);

  const [currentPath, setCurrentPath] = useState('/');
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isInfoModal, setIsInfoModal] = useState(false); // Модалка для деталей
  
  const [newItemName, setNewItemName] = useState('');
  const [isFolder, setIsFolder] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  // Функція створення
  const createItem = () => {
    if (!newItemName.trim()) return;

    const name = isFolder || newItemName.includes('.') 
      ? newItemName 
      : newItemName + '.txt';

    const newItem = {
      id: Math.random().toString(),
      name: name,
      isDirectory: isFolder,
      size: isFolder ? 0 : Math.floor(Math.random() * 5000),
      content: isFolder ? '' : 'Початковий вміст файлу...',
      updatedAt: new Date().toLocaleString(),
    };

    setFiles([...files, newItem]);
    setNewItemName('');
    setIsCreateModal(false);
  };

  // Видалення з підтвердженням
  const deleteItem = (item) => {
    const confirmDelete = () => {
      setFiles(files.filter(f => f.id !== item.id));
    };

    if (Platform.OS === 'web') {
      if (window.confirm(`Ви точно хочете видалити ${item.name}?`)) confirmDelete();
    } else {
      confirmDelete(); // На мобілці зазвичай додають Alert.alert
    }
  };

  // Перегляд деталей
  const showDetails = (item) => {
    setSelectedFile(item);
    setIsInfoModal(true);
  };

  // Редагування
  const handleItemPress = (item) => {
    if (item.isDirectory) {
      setCurrentPath('/' + item.name + '/');
    } else {
      setSelectedFile(item);
      setFileContent(item.content);
      setIsEditModal(true);
    }
  };

  const saveFileChanges = () => {
    setFiles(files.map(f => 
      f.id === selectedFile.id 
      ? { ...f, content: fileContent, size: fileContent.length * 2, updatedAt: new Date().toLocaleString() } 
      : f
    ));
    setIsEditModal(false);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* 7. Статистика пам'яті */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📂 Мій Провідник</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.headerStats}>Загалом: 100 GB</Text>
          <Text style={styles.headerStats}>Зайнято: 15 GB</Text>
          <Text style={styles.headerStats}>Вільно: 85 GB</Text>
        </View>
      </View>

      {/* 1. Виведення шляху */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setCurrentPath('/')}>
          <Text style={styles.navBtn}>🏠 Корінь</Text>
        </TouchableOpacity>
        <Text style={styles.pathText}>{currentPath}</Text>
      </View>

      {/* 2. Кнопки створення */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionBtn} 
          onPress={() => { setIsFolder(true); setIsCreateModal(true); }}
        >
          <Text style={styles.actionBtnText}>+ Папка</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionBtn} 
          onPress={() => { setIsFolder(false); setIsCreateModal(true); }}
        >
          <Text style={styles.actionBtnText}>+ .txt файл</Text>
        </TouchableOpacity>
      </View>

      {/* 1. Список файлів (FlatList) */}
      <FlatList
        data={files}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.fileRow}>
            <TouchableOpacity style={styles.fileInfo} onPress={() => handleItemPress(item)}>
              <Text style={styles.fileIcon}>{item.isDirectory ? "📁" : "📄"}</Text>
              <View>
                <Text style={styles.fileName}>{item.name}</Text>
                <Text style={styles.fileSubText}>{item.isDirectory ? 'Папка' : 'Текстовий файл'}</Text>
              </View>
            </TouchableOpacity>
            
            <View style={styles.rightActions}>
              <TouchableOpacity onPress={() => showDetails(item)} style={styles.actionIcon}>
                <Text style={styles.iconText}>ℹ️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item)} style={styles.actionIcon}>
                <Text style={styles.iconText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* МОДАЛКА: Створення */}
      <Modal visible={isCreateModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Створити {isFolder ? 'папку' : 'файл'}</Text>
            <TextInput 
              style={styles.input} 
              value={newItemName} 
              onChangeText={setNewItemName}
              placeholder="Введіть назву..."
              autoFocus
            />
            <View style={styles.modalButtons}>
              <Button title="Скасувати" color="#ff4444" onPress={() => setIsCreateModal(false)} />
              <Button title="Створити" onPress={createItem} />
            </View>
          </View>
        </View>
      </Modal>

      {/* МОДАЛКА: Детальна інформація (Пункт №6) */}
      <Modal visible={isInfoModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Інформація про об'єкт</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Назва:</Text>
              <Text style={styles.infoValue}>{selectedFile?.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Тип:</Text>
              <Text style={styles.infoValue}>{selectedFile?.isDirectory ? 'Папка' : 'Файл (.txt)'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Розмір:</Text>
              <Text style={styles.infoValue}>{selectedFile?.isDirectory ? '--' : selectedFile?.size + ' Bytes'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Змінено:</Text>
              <Text style={styles.infoValue}>{selectedFile?.updatedAt}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Button title="Закрити" onPress={() => setIsInfoModal(false)} />
            </View>
          </View>
        </View>
      </Modal>

      {/* МОДАЛКА: Редагування */}
      <Modal visible={isEditModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: '90%', height: '70%' }]}>
            <Text style={styles.modalTitle}>Редагування: {selectedFile?.name}</Text>
            <TextInput 
              style={[styles.input, { flex: 1, textAlignVertical: 'top' }]} 
              multiline 
              value={fileContent} 
              onChangeText={setFileContent} 
            />
            <View style={styles.modalButtons}>
              <Button title="Закрити" color="#ff4444" onPress={() => setIsEditModal(false)} />
              <Button title="Зберегти" onPress={saveFileChanges} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <FileManagerApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    backgroundColor: '#1A73E8',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerStats: {
    color: '#ffffff',
    fontSize: 11,
    opacity: 0.9,
  },
  navBar: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#f1f3f4',
    borderBottomWidth: 1,
    borderColor: '#dadce0',
  },
  navBtn: {
    fontWeight: 'bold',
    color: '#1A73E8',
    marginRight: 15,
  },
  pathText: {
    fontSize: 13,
    color: '#5f6368',
    fontFamily: Platform.OS === 'web' ? 'monospace' : 'Courier',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  actionBtn: {
    paddingVertical: 12,
    backgroundColor: '#1A73E8',
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  fileRow: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
    alignItems: 'center',
  },
  fileInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  fileName: {
    fontSize: 16,
    color: '#202124',
    fontWeight: '500',
  },
  fileSubText: {
    fontSize: 12,
    color: '#70757a',
  },
  rightActions: {
    flexDirection: 'row',
  },
  actionIcon: {
    padding: 10,
    marginLeft: 5,
  },
  iconText: {
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 20,
    width: '85%',
    maxWidth: 400,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#202124',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
    paddingBottom: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
    width: 80,
    color: '#5f6368',
  },
  infoValue: {
    flex: 1,
    color: '#202124',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dadce0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});