import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randNum = Math.floor(Math.random() * (max - min) + min);
    if (randNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    else{
        return randNum;
    }
}

const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1,100, props.userNumber));
    const [rounds, setRounds] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        if (Number(currentGuess) === Number(props.userNumber)) {
            console.log("game over")
            props.onGameOver(rounds);
        }
    }, [currentGuess, props.userNumber, props.onGameOver]);


    const handleNextGuess = direction => {
        if ((direction === 'lower' && currentGuess < props.userNumber) || direction === 'greater' && currentGuess > props.userNumber) {
            Alert.alert("Don't lie!", "You know that this is wrong...", [{text: 'Sorry!', style:'cancel'}]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }

        else{
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1)
    }

    return(
        <View style={styles.screen}>
        <Card>
        <Text>Opponent's Guess: 
        {currentGuess}
        </Text>
        </Card>
        <Card style={styles.buttonContainer}>
        <Button title='Lower' onPress={() => handleNextGuess('lower')} />
        <Button title='Higher' onPress={() => handleNextGuess('higher')} />
        </Card>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    }
});

export default GameScreen;
