import { StyleSheet } from 'react-native';
 
export const neutral = {
    100: '#FFFFFF',
    600: '#939393',
    700: '#707070',
    800: '#656565',
    900: '#0D0D0D',
};
 
// background.neutral[800]
 
export const background = {
    neutral: StyleSheet.create({
        100: {
            backgroundColor: neutral[100]
        },
        600: {
            backgroundColor: neutral[600]
        },
        700: {
            backgroundColor: neutral[700]
        },
        800: {
            backgroundColor: neutral[800]
        },
        900: {
            backgroundColor: neutral[900]
        },
    }),
    theme: {
        // ...
    }
}
 
export const text = {
    neutral: StyleSheet.create({
        100: {
            color: neutral[100]
        },
        600: {
            color: neutral[600]
        },
        700: {
            color: neutral[700]
        },
        800: {
            color: neutral[800]
        },
        900: {
            color: neutral[900]
        },
    }),
    theme: {
        // ...
    }
}