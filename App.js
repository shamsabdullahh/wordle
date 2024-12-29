import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Animated,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wordsWithHints = [
  { word: 'قمر', hint: 'شيء يظهر في الليل' },
  { word: 'شمس', hint: 'مصدر الضوء والحرارة' },
  { word: 'سماء', hint: 'شيء أزرق فوقنا' },
  { word: 'بيت', hint: 'مكان نسكن فيه' },
  { word: 'ورد', hint: 'نبات ذو رائحة جميلة' },
];

const App = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [currentHint, setCurrentHint] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [attempts, setAttempts] = useState(6);
  const [animation] = useState(new Animated.Value(0));
  const [score, setScore] = useState(0);
  const [rewardImage, setRewardImage] = useState(require('./assets/small-gift.jpg'));

  // Load score from storage
  useEffect(() => {
    const loadScore = async () => {
      const savedScore = await AsyncStorage.getItem('score');
      if (savedScore) {
        setScore(parseInt(savedScore));
      }
    };
    loadScore();
    generateNewWord();
  }, []);

  // Save score to storage and update reward
  useEffect(() => {
    AsyncStorage.setItem('score', score.toString());
    if (score % 5 === 0 && score > 0) {
      setRewardImage(require('./assets/big-gift.png'));
    } else {
      setRewardImage(require('./assets/small-gift.jpg'));
    }
  }, [score]);

  const generateNewWord = () => {
    const randomItem = wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
    setCurrentWord(randomItem.word);
    setCurrentHint(randomItem.hint);
    setGuesses([]);
    setAttempts(6);
    setCurrentGuess('');
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleGuess = () => {
    if (currentGuess.length !== currentWord.length) {
      Alert.alert('خطأ', `يجب أن تحتوي الكلمة على ${currentWord.length} أحرف!`);
      return;
    }

    const guessResult = currentGuess.split('').map((letter, index) => {
      if (letter === currentWord[index]) return 'green'; // الحرف صحيح وفي الموضع الصحيح
      if (currentWord.includes(letter)) return 'yellow'; // الحرف صحيح ولكن في الموضع الخطأ
      return 'gray'; // الحرف غير موجود
    });

    setGuesses([...guesses, { word: currentGuess, result: guessResult }]);
    setCurrentGuess('');
    setAttempts(attempts - 1);

    // Check for win or loss
    if (currentGuess === currentWord) {
      setScore(score + 1);
      Alert.alert('تهانينا!', 'لقد فزت! استلم هديتك!');
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => generateNewWord());
    } else if (attempts - 1 === 0) {
      Alert.alert('انتهت المحاولات', `الكلمة الصحيحة كانت: ${currentWord}`);
      generateNewWord();
    }
  };

  const renderGuess = ({ item }) => (
    <View style={styles.guessRow}>
      {item.word.split('').map((letter, index) => (
        <View
          key={index}
          style={[
            styles.letterBox,
            {
              backgroundColor:
                item.result[index] === 'green'
                  ? '#4caf50'
                  : item.result[index] === 'yellow'
                  ? '#ffc107'
                  : '#ccc',
            },
          ]}
        >
          <Text style={styles.letter}>{letter}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.winningMessage,
          {
            opacity: animation,
            transform: [
              { scale: animation.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) },
            ],
          },
        ]}
      >
        <Text style={styles.winningText}>🎉 أحسنت! 🎉</Text>
      </Animated.View>

      <Text style={styles.title}>وردل بالعربية</Text>
      <Text style={styles.hint}>تلميح: {currentHint}</Text>
      <FlatList
        data={guesses}
        renderItem={renderGuess}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.guessesList}
      />
      {attempts > 0 && (
        <>
          <TextInput
            style={styles.input}
            placeholder={`أدخل كلمة (${currentWord.length} أحرف)`}
            value={currentGuess}
            onChangeText={setCurrentGuess}
            maxLength={currentWord.length}
          />
          <TouchableOpacity style={styles.button} onPress={handleGuess}>
            <Text style={styles.buttonText}>تحقق</Text>
          </TouchableOpacity>
        </>
      )}
      <Text style={styles.attemptsText}>المحاولات المتبقية: {attempts}</Text>
      <Text style={styles.scoreText}>النقاط: {score}</Text>

      <View style={styles.rewardContainer}>
        <Text style={styles.rewardText}>🎁 جائزتك:</Text>
        <Image source={rewardImage} style={styles.rewardImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  hint: {
    fontSize: 18,
    color: '#777',
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  guessesList: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  guessRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  letterBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    borderRadius: 5,
  },
  letter: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    width: '80%',
    padding: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  attemptsText: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  scoreText: {
    fontSize: 20,
    color: '#444',
    marginTop: 10,
    fontWeight: 'bold',
  },
  winningMessage: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    padding: 20,
    backgroundColor: '#4caf50',
    borderRadius: 10,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winningText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rewardContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  rewardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  rewardImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default App;
