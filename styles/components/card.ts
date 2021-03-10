
import { Dimensions, StyleSheet } from 'react-native';

export const card = StyleSheet.create({
    base: {
        borderRadius: 10,
        padding: 16
    },

    holder: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 16,
    },
    
    small: {
        width: (Dimensions.get('screen').width - (3 * 16)) / 2,
        height: (Dimensions.get('screen').width - (3 * 16)) / 2,
        backgroundColor: 'red',
        marginBottom: 16,

        justifyContent: 'center',
        alignItems: 'center'
    },

    large: {
        flex: 1,
        marginHorizontal: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },

    addIcon :{
        width: 50,
        height: 50,
    },

    insertTitle: {
        fontFamily: 'PlayfairDisplayBold',
        fontSize: 24,
        marginBottom: 0
    },
     
    insertAuthor: {
        fontFamily: 'PlayfairDisplay',
        marginBottom: 8,
        fontSize: 16
    },

    insertText: {
        lineHeight: 20,
        flex: 1,

    }


})
