import React, { useState } from 'react';
import { View, Text, Image , Alert, StyleSheet, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('')

    const handleNumberInput = inputText => {
        setEnteredValue(inputText)
    }

    const handleResetInput = () => {
        setEnteredValue('');
        setConfirmed('false')
    }

    const handleConfirmInput = () => {
        const chosenNumber = parseInt(enteredValue);
        if ( !chosenNumber || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress:handleResetInput }]);
            return
        }
        setConfirmed(true);
        setSelectedNumber(enteredValue)
        setEnteredValue('')
    }

    let confirmedOutput;
    
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
            <Text>Chosen Number: {selectedNumber}</Text>
            <Button title='Start Game' onPress={props.handleStartGame(selectedNumber)}/>
            </Card>
            )
    }


    return(
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
        <Text style={styles.title}>New Game</Text>
        <Card style={styles.inputContainer}>
            <Text>Select a number</Text>
            <Input 
            blurOnSubmit 
            autoCapitalize='none' keyboardType='number-pad' 
            maxLength={2} 
            style={styles.input}
            onChangeText = {handleNumberInput}
            value={enteredValue}
            />
            <View style={styles.buttonContainer}>

            <View style={styles.customButton}><Button color={Colors.secondaryColor} title='clear' onPress={handleResetInput}/></View>

            <View style={styles.customButton}><Button color='green' title='confirm'onPress={handleConfirmInput}/></View>

            </View>
        </Card>
        {confirmedOutput}

        
       
        </View>
        
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },

    input: {
        width: 40,
        textAlign: "center",
    },

    title: {
        fontSize:20,
        marginVertical:10,
        fontFamily: 'open-sans-bold',
        
    },

    inputContainer : {
        width: 400,
        maxWidth: '80%',
        alignItems: 'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
    },

    customButton: {
        width: 90,
    },

    summaryContainer: {
        marginTop: 20,
        paddingVertical: 30,
        paddingHorizontal: 30,
    }
});

export default StartGameScreen;