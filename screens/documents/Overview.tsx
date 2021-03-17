import React, { useCallback, useEffect, useState } from 'react';

import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native';

import Svg, { Line } from 'react-native-svg';

import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Logo';
import { background } from '../../styles/colors/theme'
import { header } from '../../styles/components/header';
import { card } from './../../styles/components/card';
import { text, neutral } from './../../styles/colors/theme';
import { writings } from '../../utils/db';
import { SQLResultSet, SQLResultSetRowList } from 'expo-sqlite';
import Note from '../../models/Note';
import { useFocusEffect } from '@react-navigation/native';

const Overview = function ({ navigation }: any) {

    const [notes, setNotes] = useState<Note[]>([])


    const getWritings = async () => {
        const { rows }: { rows: SQLResultSetRowList } = await writings.read.all();
        setNotes((rows as any)._array);

    }


    useFocusEffect(
        useCallback(
            () => {
                getWritings()
            },
            [],
        )
    );

    const removeWriting = async (id: Number) => {
        const res = await writings.delete(id);
        console.log({ res });

        getWritings();

    }


    return (
        <SafeAreaView style={[background.neutral[900], { flex: 1 },]}>

            <View style={header.container}>
                <Logo />
            </View>

            <ScrollView contentContainerStyle={[card.holder]}>
                {/* INSERT CARD */}
                <TouchableOpacity
                    style={[card.small, card.base, background.neutral[800]]}
                    onPress={function () { navigation.navigate('New') }}>
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

                {notes.map((n: Note) => {
                    return (
                        <TouchableOpacity
                            style={[card.base, card.small, background.neutral[100]]}
                            key={n.id}
                            onPress = {()=> {navigation.navigate('Edit', {id: n.id})}}
                            onLongPress={() => {
                                Alert.alert(
                                    `Do you want to delete ${n.title}`,
                                    `When you tab delete, things are los forever`,
                                    [
                                        {
                                            text: "Cancel",
                                            onPress: () => { console.log("user tapped out...") },
                                            style: 'cancel'
                                        },
                                        {
                                            text: "Remove 👋",
                                            onPress: () => {
                                                if (n.id) {
                                                    removeWriting(+n.id); //die plus maakt er een string van
                                                }
                                            },
                                            style: 'destructive'
                                        }
                                    ]
                                )
                            }}>
                            <Text>
                                {n.title}
                            </Text>

                        </TouchableOpacity>
                    )

                })}

                {/* DOCS LOOP */}
            </ScrollView>
        </SafeAreaView>

    )
}

export default Overview;