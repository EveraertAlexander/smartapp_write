import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import Logo from '../../components/Logo';
import { header } from '../../styles/components/header';

const Edit = function({navigation}: any){
    return(
        <SafeAreaView>
            <View style={header.container}>
                <Logo />
            </View>
            <Text>Edit</Text>
        </SafeAreaView>
        
    )
}

export default Edit