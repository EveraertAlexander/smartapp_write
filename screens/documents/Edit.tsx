import React, { useEffect, useState } from 'react';

import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Share } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Logo';
import Note from '../../models/Note';
import { background, text } from '../../styles/colors/theme';
import { card } from '../../styles/components/card';
import { header } from '../../styles/components/header';
import { writings } from '../../utils/db';

const Edit = function ({ route, navigation }: any) {

    const [detail, setDetail] = useState<Note>(
        {
            author: '',
            title: '',
            text: ''
        }
    )

    const getDetail = async () => {
        const res = await writings.read.detail(+route.params.id);

        const dbNote = (res as any).rows._array[0];
        console.log(dbNote);

        dbNote.text = dbNote.note;
        delete dbNote.note;

        setDetail(dbNote)

    }

    const saveWriting = async () => {
        if (detail.title && detail.id && detail.author && detail.text) {

            const res = await writings.update(detail)
            console.log(res);

            if (res.rowsAffected === 1) {
                navigation.navigate('Overview')
            }
        }
    }

    useEffect(() => {
        getDetail();
    }, [])
    return (


        <SafeAreaView style={{ ...background.neutral[900], flex: 1, }}>
            <View style={header.container}>
                <TouchableOpacity onPress={() => { saveWriting(); }}>
                    <Text style={[header.addButton]}>Save</Text>
                </TouchableOpacity>
                <Logo />

                <TouchableOpacity
                    onPress={async () => {
                        const res = await Share.share({
                            message: detail.text
                        })

                        console.log(res);
                        
                    }}
                >
                    <Text style={[header.shareButton]}>Share</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                style={[card.base, card.large, background.neutral[100]]}
                behavior={'height'}
            >
                <TextInput
                    placeholder="What's on your mind?"
                    style={[card.insertTitle]}
                    onChangeText={
                        function (text: string) {
                            setDetail(function (oldNote: Note) {
                                oldNote.title = text;
                                return { ...oldNote } //returnt als nieuw object
                            }
                            )
                        }}
                    value={detail?.title}
                />
                <TextInput
                    style={[card.insertAuthor, text.neutral[600]]}
                    onChangeText={
                        function (text: string) {
                            setDetail(function (oldNote: Note) {
                                oldNote.author = text;
                                return { ...oldNote } //returnt als nieuw object
                            }

                            )
                        }}
                    value={detail?.author}
                />
                <TextInput
                    placeholder="Here you can write it off"
                    style={[card.insertText]}
                    multiline={true}
                    onChangeText={
                        function (text: string) {
                            setDetail(function (oldNote: Note) {
                                oldNote.text = text;
                                return { ...oldNote } //returnt als nieuw object
                            }
                            )
                        }}
                    value={detail?.text}

                />
            </KeyboardAvoidingView>


            <Text>New</Text>
        </SafeAreaView>

    )
}

export default Edit