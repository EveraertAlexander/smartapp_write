import  { StyleSheet } from 'react-native';

export const header = StyleSheet.create({
    logo: {
        width: 75,
        height: 20,
        flexGrow: 1
    },
    container: {
        paddingBottom: 16,
        paddingHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },

    addButton: {
        fontSize: 16,
        color: '#4CD964'
    },

    shareButton: {
        fontSize: 16,
        color: '#FFFFFF'
    }
})