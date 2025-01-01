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
} from 'react-native';
import LottieView from 'lottie-react-native';

const wordsWithHints = [
  { word: 'قمر', hint: 'شيء يظهر في الليل' },
  { word: 'شمس', hint: 'مصدر الضوء والحرارة' },
  { word: 'سماء', hint: 'شيء أزرق فوقنا' },
  { word: 'بيت', hint: 'مكان نسكن فيه' },
  { word: 'ورد', hint: 'نبات ذو رائحة جميلة' },
];

const App = () => {
  const [screen, setScreen] = useState('welcome');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [currentHint, setCurrentHint] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [attempts, setAttempts] = useState(6);
  const [showFire, setShowFire] = useState(false);

  const animation = new Animated.Value(1);

  useEffect(() => {
    if (screen === 'game') {
      generateNewWord();
    }
  }, [screen]);

  const handleRegister = () => {
    if (!username || !password || !email) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول');
      return;
    }
    if (users.some((user) => user.username === username)) {
      Alert.alert('خطأ', 'اسم المستخدم موجود بالفعل');
      return;
    }
    const newUser = { username, password, email, score: 0 };
    setUsers([...users, newUser]);
    Alert.alert('تم التسجيل', 'تم تسجيل الحساب بنجاح');
    setScreen('welcome');
  };

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      Alert.alert('خطأ', 'اسم المستخدم أو كلمة المرور غير صحيحة');
      return;
    }
    setCurrentUser(user);
    setScreen('menu');
  };

  const generateNewWord = () => {
    const randomItem = wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
    setCurrentWord(randomItem.word);
    setCurrentHint(randomItem.hint);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setGuesses([]);
    setAttempts(6);
    setCurrentGuess('');
  };

  const handleGuess = () => {
    if (currentGuess.length !== currentWord.length) {
      Alert.alert('خطأ', `يجب أن تحتوي الكلمة على ${currentWord.length} أحرف!`);
      return;
    }
    const guessResult = currentGuess.split('').map((letter, index) => {
      if (letter === currentWord[index]) return 'green';
      if (currentWord.includes(letter)) return 'yellow';
      return 'gray';
    });
    setGuesses([...guesses, { word: currentGuess, result: guessResult }]);
    setCurrentGuess('');
    setAttempts(attempts - 1);
    if (currentGuess === currentWord) {
      setScore(score + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak >= 5) setShowFire(true);
      generateNewWord();
    } else {
      setStreak(0);
      setShowFire(false);
      if (attempts - 1 === 0) {
        Alert.alert('انتهت المحاولات', `الكلمة الصحيحة كانت: ${currentWord}`);
        generateNewWord();
      }
    }
  };

  const getFireAnimation = () => {
    if (showFire) {
      if (streak >= 15) return require('./assets/bluefire.json');
      if (streak >= 10) return require('./assets/redfire.json');
      if (streak >= 5) return require('./assets/orangfire.json');
    }
    return null;
  };

  if (screen === 'welcome') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>مرحبًا بك في اللعبة</Text>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('login')}>
          <Text style={styles.buttonText}>تسجيل الدخول</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('register')}>
          <Text style={styles.buttonText}>تسجيل حساب جديد</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === 'login') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>تسجيل الدخول</Text>
        <TextInput
          style={styles.input}
          placeholder="اسم المستخدم"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="كلمة المرور"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>دخول</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('welcome')}>
          <Text style={styles.buttonText}>رجوع</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === 'register') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>تسجيل حساب جديد</Text>
        <TextInput
          style={styles.input}
          placeholder="اسم المستخدم"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="البريد الإلكتروني"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="كلمة المرور"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>تسجيل</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('welcome')}>
          <Text style={styles.buttonText}>رجوع</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === 'menu') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>مرحبًا، {currentUser?.username}</Text>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('game')}>
          <Text style={styles.buttonText}>ابدأ اللعبة</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('leaderboard')}>
          <Text style={styles.buttonText}>جدول النقاط</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('welcome')}>
          <Text style={styles.buttonText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === 'game') {
    const fireAnimation = getFireAnimation();
    return (
      <View style={styles.container}>
        <Text style={styles.title}>النقاط: {score}</Text>
        <Text style={styles.title}>المحاولات المتبقية: {attempts}</Text>
        <Text style={styles.title}>التلميح: {currentHint}</Text>
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
        <FlatList
          data={guesses}
          renderItem={({ item }) => (
            <View style={styles.guessRow}>
              {item.word.split('').map((letter, index) => (
                <View
                  key={index}
                  style={{
                    ...styles.letterBox,
                    backgroundColor:
                      item.result[index] === 'green'
                        ? '#4caf50'
                        : item.result[index] === 'yellow'
                        ? '#ffc107'
                        : '#ccc',
                  }}>
                  <Text style={styles.letter}>{letter}</Text>
                </View>
              ))}
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
        <TouchableOpacity style={styles.button} onPress={() => setScreen('menu')}>
          <Text style={styles.buttonText}>رجوع إلى القائمة</Text>
        </TouchableOpacity>
        {fireAnimation && (
          <LottieView
            source={fireAnimation}
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          />
        )}
      </View>
    );
  }

  if (screen === 'leaderboard') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>جدول النقاط</Text>
        <FlatList
          data={users.sort((a, b) => b.score - a.score)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.leaderboardRow}>
              <Text style={styles.leaderboardText}>{item.username}</Text>
              <Text style={styles.leaderboardText}>{item.score || 0}</Text>
            </View>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={() => setScreen('menu')}>
          <Text style={styles.buttonText}>رجوع</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    padding:60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    padding:2,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginVertical: 2,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  leaderboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 5,
  },
  leaderboardText: {
    fontSize: 16,
  },
  guessRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  letterBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    borderRadius: 5,
  },
  letter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default App;
