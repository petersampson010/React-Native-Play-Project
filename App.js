import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OpenerScreen from './screens/opener';
import LoginScreen from './screens/login';
import AdminAccountSetupScreen from './screens/adminAccountSetup';
import NewTeamSetupScreen from './screens/newTeamSetup';
import ContactUsScreen from './screens/contactUs';
import HomeScreen from './screens/home';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Opener">
        <Stack.Screen name="Opener" component={OpenerScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminAccountSetup" component={AdminAccountSetupScreen} />
        <Stack.Screen name="NewTeamSetup" component={NewTeamSetupScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;