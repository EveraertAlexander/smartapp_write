import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Documents from './screens/documents';
import Reader from './screens/reader';
import Settings from './screens/settings/index';

import { useFonts } from 'expo-font';

//@ts-ignore
import Ionicons from '@expo/vector-icons/Ionicons';
import { background, neutral } from './styles/colors/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initWritings } from './utils/db';

const Tab = createBottomTabNavigator();

export default function App() {

  const [loaded, error] = useFonts({
    PlayfairDisplay: require('./assets/Playfair_Display/static/PlayfairDisplay-Regular.ttf'),
    PlayfairDisplayBold: require('./assets/Playfair_Display/static/PlayfairDisplay-Bold.ttf')
  })

  useEffect(() => {
    initWritings();
  }, [])

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

  if (loaded) {
    return (<SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style='light' />
        <Tab.Navigator
          sceneContainerStyle={[
            background.neutral[900]
          ]}
          screenOptions={customTabOptions}
          tabBarOptions={{
            activeTintColor: neutral[100],
            inactiveTintColor: neutral[700],
            tabStyle: {
              ...background.neutral[900],
            },
            style: {
              ...background.neutral[900],
              // borderTopWidth: 0
            }
          }}
        >
          <Tab.Screen name="Documents" component={Documents} />
          <Tab.Screen name="Reader" component={Reader} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>)
  } else {
    return <ActivityIndicator/>
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
