import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';

import Svg, { Line } from 'react-native-svg';

import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Logo';
import { background } from '../../styles/colors/theme'
import { header } from '../../styles/components/header';
import { card } from './../../styles/components/card';
import { text, neutral } from './../../styles/colors/theme';

const Overview = function ({ navigation }: any) {
    return (
        <SafeAreaView style={[background.neutral[900], { flex: 1 },]}>

            <View style={header.container}>
                <Logo />
            </View>

            <ScrollView contentContainerStyle={[card.holder]}>
                {/* INSERT CARD */}
                <TouchableOpacity 
                    style={[card.small, card.base, background.neutral[800]]}
                    onPress={function(){navigation.navigate('New')}}>
                    <Svg
                        style={[card.addIcon]}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={neutral[600]}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin='round'
                    >
                        <Line x1="12" y1="5" x2="12" y2="19"></Line><Line x1="5" y1="12" x2="19" y2="12"></Line>
                    </Svg>
                </TouchableOpacity>

                <TouchableOpacity style={[card.small, card.base, background.neutral[100]]}>

                </TouchableOpacity>

                <TouchableOpacity style={[card.small, card.base, background.neutral[100]]}>

                </TouchableOpacity>

                {/* DOCS LOOP */}
            </ScrollView>
            <Text>Documents</Text>
        </SafeAreaView>

    )
}

export default Overview;