import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import loginPage from './components/loginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import AddChat from './components/AddChat';
import ChatScreen from './components/ChatScreen'
import {Button , Input, Image} from 'react-native-elements';

const Stack = createNativeStackNavigator();

const stylizedHeaders ={
    headerStyle:{backgroundColor:"blue"},
    headerTitleStyle : {color:"white"},
    headerTintColor:"white",
    headerMarginLeft:"20px"
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={stylizedHeaders}>
        <Stack.Screen name="Login" component={loginPage} option/>
        <Stack.Screen name="Register" component={RegisterPage} option/> 
        <Stack.Screen name="Home" component={HomePage} option/>
        <Stack.Screen name="AddChat" component={AddChat} option/> 
        <Stack.Screen name="ChatScreen" component={ChatScreen} option/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
