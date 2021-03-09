import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Documents from './screens/documents';
import Reader from './screens/reader';
import Settings from './screens/settings/index';

//@ts-ignore
import Ionicons from '@expo/vector-icons/Ionicons';
import { neutral } from './styles/colors/theme';

export default function App() {

  const Tab = createBottomTabNavigator();

  const customTabOptions = ({ route }: any) => ({
    tabBarIcon: ({ color, size }: any) => {
      let iconName;

      if (route.name === 'Documents') {
        iconName = 'md-folder';
      } else if (route.name === 'Reader') {
        iconName = 'book';
      } else if (route.name === 'Settings') {
        iconName = 'settings-sharp'
      } else {
        iconName = 'american-football-sharp'
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  });

  return (
    <NavigationContainer>
      <StatusBar style='light'/>
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: neutral[900].color
        }}    
        screenOptions={customTabOptions}
        tabBarOptions={{
          activeTintColor: neutral[100].color,
          inactiveTintColor: neutral[700].color,
          tabStyle: {
            backgroundColor: neutral[900].color,
            // position: 'absolute',
            // bottom: 0
          },
          safeAreaInsets: {
            bottom: 0
          }
        }}
      >
        <Tab.Screen name="Documents" component={Documents} />
        <Tab.Screen name="Reader" component={Reader} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
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
