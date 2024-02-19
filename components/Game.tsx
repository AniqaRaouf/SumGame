import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import RandomNumber from './RandomNumber';

function Game({ randomnumbercount, intialSeconds, onPlayAgain }) {
    const [selectedNumbers, setSelectedNumbers] = useState([])
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [remainingSeconds, setremainingSeconds] = useState(intialSeconds)
    const [stopTimer, setstopTimer] = useState(false)

    useEffect(() => {
        // Generate random numbers only once on initial render
        setRandomNumbers(
            Array.from({ length: randomnumbercount }).map(() => 1 + Math.floor(10 * Math.random()))
        );

    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            // Decrement remainingSeconds outside the if statement
            setremainingSeconds(prevRemainingSeconds => Math.max(0, prevRemainingSeconds - 1));

            // Clear interval only when remainingSeconds is 0
            if (remainingSeconds === 0) {
                clearInterval(interval);
            }
        
        }, 1000);

        return () => clearInterval(interval);
    }, [remainingSeconds]);

    useEffect(() => {

    }, [randomnumbercount, intialSeconds]);
    // const randomNumbers = Array.from({ length: randomnumbercount })
    //     .map(() => 1 + Math.floor(10 * Math.random()));
    const target = randomNumbers.slice(0, randomnumbercount - 2)
        .reduce((acc, curr) => acc + curr, 0);
    const windowWidth = Dimensions.get('window').width;

    const handleSelected = (numberIndex) => {
        return selectedNumbers.indexOf(numberIndex) >= 0

    }
    const pressRandomNumber = (number: number) => {
        setSelectedNumbers([...selectedNumbers, number])
        console.log(selectedNumbers, "aniqa")
    }
    const gameStatus = () => {
        const sumSelected = selectedNumbers.reduce((acc, curr) => {
            return acc + randomNumbers[curr]
        }, 0)
        if (remainingSeconds === 0) {
            return 'LOST'
        }
        if (sumSelected < target) {
            return 'PLAYING'
        }
        if (sumSelected == target) {
            return 'WON'
        }
        if (sumSelected > target) {
            return 'LOST'
        }
        console.warn(sumSelected, "aniqa")
    }
    const GameStatus = gameStatus();
    return (
        <View style={styles.container}>
            <Text style={[styles.buttonStyle, styles[`STATUS_${GameStatus}`]]}>{target}</Text>
            <View style={styles.randomContainer}>
                {randomNumbers.map((randomnum, index) =>
                    <View style={{ width: windowWidth / 2.1 }}>
                        <RandomNumber
                            key={index}
                            isSelected={handleSelected(index) || GameStatus != "PLAYING"}
                            index={index}
                            randomnum={randomnum}
                            onpress={() => pressRandomNumber(index)} />
                    </View>
                )}
            </View>
            <Text style={styles.buttonStyle}>{remainingSeconds}</Text>

            <Text style={styles.buttonStyle}>{GameStatus}</Text>
            {
                GameStatus != "PLAYING" &&
                <TouchableOpacity onPress={onPlayAgain}>
                    <Text style={styles.buttonStyle}>Play Again</Text>
                </TouchableOpacity>

            }


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
    },
    buttonStyle: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: '600',
        padding: 30,
        borderRadius: 10,
        alignSelf: 'center',
        color: 'white'

    },
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
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    randomContainer: {
        flexDirection: 'row', flex: 1, flexWrap: 'wrap', justifyContent: 'space-around'
    },
    STATUS_PLAYING: {
        backgroundColor: 'black',

    },
    STATUS_WON: {
        backgroundColor: 'green',

    },
    STATUS_LOST: {
        backgroundColor: 'red',

    }
});

export default Game;
