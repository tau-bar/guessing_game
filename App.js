import React, { useState } from 'react';
import { StyleSheet,View } from 'react-native';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {
  const [userNumber, setUserNumber] = useState('');
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded){
    // pass a function that returns a promise into startAsync prop of AppLoading component
    return <AppLoading 
    startAsync={fetchFonts} 
    onFinish={() => setDataLoaded(true)}
    onError={(err) => console.log(err)}/>
  }

  const handleConfigureNewGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const handleStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  const handleGameOver = numOfRounds => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen handleStartGame={handleStartGame}/>
  if (userNumber && guessRounds === 0) {
    content = <GameScreen userNumber={userNumber} onGameOver={handleGameOver}/>
  }
  else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber = {guessRounds} userNumber={userNumber} onRestart={handleConfigureNewGame}/>
  }

  return (
    <View style={styles.screen}>
    <Header title={"Guess a number"}/>
    {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
  },
);
