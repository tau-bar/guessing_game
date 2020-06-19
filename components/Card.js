import React from 'react';
import { View, Text, StyleSheet, ImagePropTypes } from 'react-native';

const Card = (props) => {
    return(
        // override any styles in the stylesheet and merge
        <View style={{...styles.card, ...props.style}}>
        {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: {width:0, height:2},
        shadowRadius:3,
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
    }
});

export default Card;
