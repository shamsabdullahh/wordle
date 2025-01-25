import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Animated,
  Image
} from 'react-native';
import { wordsWithHints, generateNewWord, handleGuess } from './utils';
import LottieView from 'lottie-react-native';

const getFireAnimation = (streak) => {
  if (streak === 12) return require('./assets/bluefire.json');
  if (streak === 6)  return require('./assets/redfire.json');
  if (streak === 3)  return require('./assets/orangfire.json');
  return null; // For all other streak values, show nothing
};

const { height } = Dimensions.get('window');

const GameScreen = ({ navigation }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [currentHint, setCurrentHint] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [attempts, setAttempts] = useState(6);
  const [hintsLeft, setHintsLeft] = useState(2);
  const [results, setResults] = useState([]);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);

  const [showTemporaryFire, setShowTemporaryFire] = useState(false);
  const [fireSource, setFireSource] = useState(null);

  useEffect(() => {
    generateNewWord(
      setCurrentWord,
      setCurrentHint,
      setGuesses,
      setAttempts,
      setCurrentGuess
    );
  }, []);

  useEffect(() => {
    const fireFile = getFireAnimation(streak);
    if (fireFile) {
      setFireSource(fireFile);
      setShowTemporaryFire(true);

      // Hide after 3 seconds
      const timer = setTimeout(() => {
        setShowTemporaryFire(false);
        setFireSource(null);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // Streak is NOT one of 3, 6, or 12 => no fire
      setShowTemporaryFire(false);
      setFireSource(null);
    }
  }, [streak]);

  const [isActive, setIsActive] = useState(false);

  const cellAnimations = useRef([]);

  useEffect(() => {
    // Initialize cellAnimations for a 6xN grid (6 rows, length of currentWord columns)
    const rows = 6;
    const cols = currentWord.length || 5; // Assume 5 columns as a default
    const animations = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols)
          .fill(null)
          .map(() => new Animated.Value(1)) // Default scale of 1
      );
    cellAnimations.current = animations;
  }, [currentWord]);

  const handleHintPress = () => {
    if (hintsLeft > 0) {
      setIsActive(true); // Activate the key
      Alert.alert('التلميح', currentHint);
      setHintsLeft((prev) => prev - 1);
  
      // Deactivate the key after 3 seconds
      setTimeout(() => {
        setIsActive(false);
      }, 7000);
    } else {
      Alert.alert('خطأ', 'لقد استنفدت جميع التلميحات!');
    }
  };
  

  const handlePlayerGuess = () => {
    if (currentGuess.length !== currentWord.length) {
      Alert.alert('خطأ', 'يرجى إكمال الكلمة قبل التخمين!');
      return;
    }
  
    const guessColors = currentWord.split('').map((letter, index) => {
      if (currentGuess[index] === letter) return 'green'; // Correct letter and position
      if (currentWord.includes(currentGuess[index])) return 'yellow'; // Correct letter, wrong position
      return 'gray'; // Incorrect letter
    });
  
    setGuesses((prev) => [
      ...prev,
      { word: currentGuess, colors: guessColors }, // Add the guess with colors
    ]);
    setCurrentGuess('');
  
    // Trigger animations for the guessed row
    const rowIndex = guesses.length;
    guessColors.forEach((_, colIndex) => {
      Animated.sequence([
        Animated.timing(cellAnimations.current[rowIndex][colIndex], {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(cellAnimations.current[rowIndex][colIndex], {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  
    // Check win/loss conditions
    if (currentGuess === currentWord) {
      setStreak((prev) => prev + 1);
      resetGame(); // Reset the game state
    } else if (guesses.length + 1 >= attempts) {
      Alert.alert('انتهت المحاولات', `الكلمة الصحيحة كانت: ${currentWord}`);
      setStreak(0); // Reset streak
      resetGame(); // Reset the game state
    }
  };
  
  // Function to reset the game state
  const resetGame = () => {
    generateNewWord(
      setCurrentWord,
      setCurrentHint,
      setGuesses,
      setAttempts,
      setCurrentGuess
    );
    cellAnimations.current = Array(6)
      .fill(null)
      .map(() =>
        Array(currentWord.length || 5)
          .fill(null)
          .map(() => new Animated.Value(1))
      );
  };
  
  

  const handleDelete = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  // Arabic letters
  const arabicLetters = [
    'ا','ب','ت','ث','ج','ح','خ','د','ذ',
    'ر','ز','س','ش','ص','ض','ط','ظ','ع',
    'غ','ف','ق','ك','ل','م','ن','ه','و',
    'ي','ء',
  ];
  
  const handleLetterPress = (letter) => {
    if (currentGuess.length < currentWord.length) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hintContainer}>
        {/* Hint Image with Badge */}
<View style={styles.hintContainer}>
  <TouchableOpacity onPress={handleHintPress}>
    <Image
      source={
        isActive
          ? require('./assets/key-active.png')
          : require('./assets/key-inactive.png')
      }
      style={styles.hintImage}
    />
    {hintsLeft > 0 && (
      <View style={styles.hintBadge}>
        <Text style={styles.hintBadgeText}>{hintsLeft}</Text>
      </View>
    )}
  </TouchableOpacity>
</View>


      </View>

      <Text style={styles.title}>لعبة التخمين</Text>
      <Text style={styles.streak}>سلسلة الفوز: {streak}</Text>

      
      {/* Grid Container */}
      <View style={styles.gridContainer}>
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {Array.from({ length: currentWord.length }).map((_, colIndex) => (
           <Animated.View
           key={colIndex}
           style={[
             styles.cell,
             {
               transform: [
                 {
                   scale: cellAnimations.current[rowIndex]?.[colIndex] || 1,
                 },
               ],
               backgroundColor:
                 rowIndex < guesses.length // Apply colors only for guessed rows
                   ? guesses[rowIndex]?.colors[colIndex] === 'green'
                     ? 'green'
                     : guesses[rowIndex]?.colors[colIndex] === 'yellow'
                     ? 'yellow'
                     : 'rgba(128, 128, 128, 0.5)' // Gray with opacity
                   : 'white', // Unfilled or active cells remain white
             },
           ]}
         >
           <Text
             style={[
               styles.letter,
               {
                 color: '#000', // Keep the text black for visibility
               },
             ]}
           >
             {rowIndex === guesses.length
               ? currentGuess[colIndex] || '' // Show current guess letters
               : guesses[rowIndex]?.word[colIndex] || ''}
           </Text>
         </Animated.View>
         
          ))}
        </View>
      ))}

      </View>


        {/* 
          Fire overlay if showTemporaryFire == true 
          and the file is not null 
        */}
        {showTemporaryFire && fireSource && (
          <View style={styles.fireOverlay}>
            <LottieView
              source={fireSource}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        )}

{/* Keyboard Section */}
<View style={styles.keyboard}>
  {arabicLetters.map((letter) => (
    <TouchableOpacity
      key={letter}
      style={styles.key}
      onPress={() => handleLetterPress(letter)}
    >
      <Text style={styles.keyText}>{letter}</Text>
    </TouchableOpacity>
  ))}
  {/* Enter Button */}
  <TouchableOpacity style={styles.enterKey} onPress={handlePlayerGuess}>
    <Text style={styles.enterKeyText}>تخمين</Text>
  </TouchableOpacity>
</View>


      {/* Actions */}
      <View style={styles.actions}>
        
        <TouchableOpacity style={styles.buttonGame} onPress={handleDelete}>
          <Text style={styles.buttonText}>حذف</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.buttonGame}
        onPress={() => navigation.navigate('WelcomeScreen')} // Navigate to WelcomeScreen
      >
        <Text style={styles.buttonText}>رجوع إلى القائمة</Text>
      </TouchableOpacity>

      </View>
    </View>
    
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff8e6',
    marginTop: 80,
  },
  hintContainer: {
    position: 'absolute',
    top: 17, // Align vertically
    right: 20, // Align to the right of the screen
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    flexDirection: 'row-reverse',
  },
  hintBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  hintBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center', 
     
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  streak: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  attempts: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  gridContainer: {
    position: 'relative',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  grid: {
    // normal styling
  },
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    marginVertical: 5,
  },
  cell: {
    width: 55,
    height: 55,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  letter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  fireOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '117%',
    height: '110%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 150,
    height: 150,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative', // Allows better positioning of elements
  },
  key: {
    width: 40,
    height: 40,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fe6100',
    borderRadius: 5,
  },
  enterKey: {
    width: 90, // Slightly larger than letter keys
    height: 40,
    margin: 3,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00ff6A',
    borderRadius: 5,
  },
  keyText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  enterKeyText: {
    color: '#234c34',
    fontSize: 24,
    fontWeight: 'bold',  
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  buttonGame: {
    padding: 10,
    backgroundColor: '#234c34',
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    width: '90%',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
