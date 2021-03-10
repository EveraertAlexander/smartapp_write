import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import Logo from '../../components/Logo';
import New from './New';
import Overview from './Overview';
import Edit from './Edit';

const Stack = createStackNavigator();

const Documents = function ({ navigation }: any) {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name ="Overview" component={Overview}/>
            <Stack.Screen name ="New" component={New}/>
            <Stack.Screen name ="Edit" component={Edit}/>       
        </Stack.Navigator>
    );
}

export default Documents;