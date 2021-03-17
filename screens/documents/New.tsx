import React, { useState } from 'react';

import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Logo';

import { background, neutral } from '../../styles/colors/theme';

import { header } from '../../styles/components/header';
import { card } from './../../styles/components/card';
import { text } from './../../styles/colors/theme';
import Note from '../../models/Note';
import { writings } from '../../utils/db';

const New = function ({ navigation }: any) {
    const [newNote, setNewNote] = useState<Note>({
        title: "",
        author: "A. Everaert",
        text: ""
    });


    const saveWriting = async () => {
        if (newNote.title && newNote.author && newNote.text) {

            const insert = await writings.create(newNote);

            console.log({insert})

            if (insert.rowsAffected > 0) {
                navigation.navigate('Overview');
            }
        }
    }

    return (
        <SafeAreaView style={{ ...background.neutral[900], flex: 1, }}>
            <View style={header.container}>
                <TouchableOpacity onPress={()=>{saveWriting();}}>
                    <Text style={[header.addButton]}>Save</Text>
                </TouchableOpacity>
                <Logo />

                <TouchableOpacity>
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
                            setNewNote(function (oldNote: Note) {
                                oldNote.title = text;
                                return {...oldNote} //returnt als nieuw object
                            }
                            )
                        }}
                    value={newNote?.title}
                />
                <TextInput
                    style={[card.insertAuthor, text.neutral[600]]}
                    onChangeText={
                        function (text: string) {
                            setNewNote(function (oldNote: Note) {
                                oldNote.author = text;
                                return {...oldNote} //returnt als nieuw object
                            }
                            )
                        }}
                    value={newNote?.author}
                />
                <TextInput
                    placeholder="Here you can write it off"
                    style={[card.insertText]}
                    multiline={true}
                    onChangeText={
                        function (text: string) {
                            setNewNote(function (oldNote: Note) {
                                oldNote.text = text;
                                return {...oldNote} //returnt als nieuw object
                            }
                            )
                        }}
                    value={newNote?.text}

                />
            </KeyboardAvoidingView>


            <Text>New</Text>
        </SafeAreaView>

    )
}

export default New