import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { OneSignal } from 'react-native-onesignal';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const ONESIGNAL_APP_ID = "53b12f99-9926-4671-b426-0d96145c8ebb";
const ONESIGNAL_REST_KEY = "os_v2_app_koys7gmzezdhdnbgbwlbixeoxp3aeifstqjedueqcfjp2lpot3swzj5u3xanz55gfbzuiqu4rcj7ixv3qhqnf7socdubkjdthwyzbhy";

interface Task {
  id: string;
  title: string;
  desc: string;
  time: string;
  notificationId: string;
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    // Ініціалізація OneSignal
    OneSignal.initialize(ONESIGNAL_APP_ID);
    OneSignal.Notifications.requestPermission(true);
  }, []);

  const scheduleNotification = async (taskTitle: string, taskDesc: string, taskDate: Date) => {
    try {
      const response = await fetch("https://onesignal.com/api/v1/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": `Basic ${ONESIGNAL_REST_KEY}`
        },
        body: JSON.stringify({
          app_id: ONESIGNAL_APP_ID,
          headings: { "en": taskTitle, "uk": taskTitle },
          contents: { "en": taskDesc, "uk": taskDesc },
          send_after: taskDate.toISOString(), 
          included_segments: ["All"],
        })
      });
      const data = await response.json();
      return data.id;
    } catch (e) {
      console.error("Error scheduling:", e);
      return null;
    }
  };

  const addTask = async () => {
    if (!title.trim()) {
      Alert.alert("Помилка", "Будь ласка, введіть назву задачі");
      return;
    }

    const notificationId = await scheduleNotification(title, desc, date);

    if (notificationId) {
      const newTask: Task = {
        id: Math.random().toString(36).substring(7),
        title,
        desc,
        time: date.toLocaleString('uk-UA'),
        notificationId
      };

      setTasks([...tasks, newTask]);
      setTitle('');
      setDesc('');
      Alert.alert("Успіх", "Задачу додано та сповіщення заплановано!");
    }
  };

  const deleteTask = async (id: string, notificationId: string) => {
    try {
      await fetch(`https://onesignal.com/api/v1/notifications/${notificationId}?app_id=${ONESIGNAL_APP_ID}`, {
        method: "DELETE",
        headers: { "Authorization": `Basic ${ONESIGNAL_REST_KEY}` }
      });
    } catch (e) {
      console.error("Error canceling notification:", e);
    }
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>To-Do Reminder 🔔</ThemedText>
      
      <ThemedView style={styles.inputContainer}>
        <TextInput 
          placeholder="Назва задачі" 
          placeholderTextColor="#888"
          style={styles.input} 
          value={title} 
          onChangeText={setTitle} 
        />
        <TextInput 
          placeholder="Опис (необов'язково)" 
          placeholderTextColor="#888"
          style={styles.input} 
          value={desc} 
          onChangeText={setDesc} 
        />
        
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
          <ThemedText>⏰ Час: {date.toLocaleTimeString('uk-UA')}</ThemedText>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <ThemedText style={styles.addButtonText}>Зберегти нагадування</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.taskCard}>
            <View style={{ flex: 1 }}>
              <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
              <ThemedText style={styles.taskDesc}>{item.desc}</ThemedText>
              <ThemedText style={styles.taskTime}>{item.time}</ThemedText>
            </View>
            <TouchableOpacity onPress={() => deleteTask(item.id, item.notificationId)}>
              <ThemedText style={{ color: '#ff4444', fontSize: 24 }}>🗑️</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>Список задач порожній</ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    gap: 12,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
  },
  dateButton: {
    backgroundColor: '#e1e1e1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#0a7ea4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  taskDesc: {
    fontSize: 14,
    opacity: 0.7,
  },
  taskTime: {
    fontSize: 12,
    marginTop: 5,
    color: '#0a7ea4',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.5,
  }
});
