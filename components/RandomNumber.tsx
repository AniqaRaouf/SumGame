import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

function RandomNumber({ index, randomnum, isSelected,onpress,key }) {
const handlePress=()=>{
    if(isSelected)
    {
        return ;
    }
    onpress(key)
}
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={[styles.smallbuttonstyle, isSelected && styles.selectedStyle]}>{randomnum}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    smallbuttonstyle: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: '600',
        padding: 30,
        borderRadius: 10,
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',

    },
    selectedStyle: {
        opacity: 0.3
    }
});

export default RandomNumber;
