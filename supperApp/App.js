import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from './src/screens/SignInSignUp/LogInScreen';
import SignUpScreen from './src/screens/SignInSignUp/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import { AsyncStorageStatic } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        {/* <Stack.Screen name="LogInScreen" component={LogInScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
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
