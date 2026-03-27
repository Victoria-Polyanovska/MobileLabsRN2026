import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button } from 'react-native'; 
import CustomDrawer from './src/CustomDrawer';

import MainScreen from './src/MainScreen';
import DetailsScreen from './src/DetailsScreen';
import ContactsScreen from './src/ContactsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NewsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={MainScreen} 
        options={({ navigation }) => ({ 
          title: 'Стрічка новин',
          headerLeft: () => (
            <Button 
              onPress={() => navigation.openDrawer()} 
              title=" Меню" 
            />
          ),
        })} 
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen 
          name="NewsDrawer" 
          component={NewsStack} 
          options={{ headerShown: false, title: 'Новини' }} 
        />
        <Drawer.Screen 
          name="Contacts" 
          component={ContactsScreen} 
          options={{ title: 'Контакти' }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;