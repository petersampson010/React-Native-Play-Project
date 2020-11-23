import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OpenerScreen from './screens/opener';
import LoginScreen from './screens/login';
import AdminAccountSetupScreen from './screens/adminAccountSetup';
import ntsScreen1 from './screens/newTeamSetup/nts1';
import ntsScreen2 from './screens/newTeamSetup/nts2';
import ContactUsScreen from './screens/contactUs';
import HomeScreen from './screens/home';
import TransfersScreen from './screens/transfers';
import LeagueScreen from './screens/league';
import ClubSetupScreen from './screens/clubSetup';
import PickTeamScreen from './screens/pickTeam';

import PlayerGraphic from './components/playerGraphic'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Opener">
        <Stack.Screen name="Opener" component={OpenerScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminAccountSetup" component={AdminAccountSetupScreen} />
        <Stack.Screen name="nts1" component={ntsScreen1} />
        <Stack.Screen name="nts2" component={ntsScreen2} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Transfers" component={TransfersScreen} />
        <Stack.Screen name="League" component={LeagueScreen} />
        <Stack.Screen name="ClubSetup" component={ClubSetupScreen} />
        <Stack.Screen name="PickTeam" component={PickTeamScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    // <PlayerGraphic/>
    );
}

export default App;