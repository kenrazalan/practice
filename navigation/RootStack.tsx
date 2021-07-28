import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../../practice/screens/Login'
import Signup from '../../practice/screens/Signup'
import Welcome from '../../practice/screens/Welcome'
import { Colors } from '../components/styles';

const Stack = createStackNavigator();

 const {primary, tertiary} = Colors;

 const RootStack = () => {
    return (
      <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'transparent'
                },
                headerTintColor: tertiary,
                headerTransparent: true,
                headerTitle: '',
                headerLeftContainerStyle: {
                    paddingLeft: 20
                },
            }}
            initialRouteName="Login"
          >
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Signup" component={Signup}/>
            <Stack.Screen options={{headerTintColor: primary}} name="Welcome" component={Welcome}/>
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
  export default RootStack