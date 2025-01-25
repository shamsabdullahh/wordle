import { Animated, Alert } from 'react-native';

// Word list
export const wordsWithHints = [
  { word: 'قمر', hint: 'شيء يظهر في الليل' },
  { word: 'شمس', hint: 'مصدر الضوء والحرارة' },
  { word: 'سماء', hint: 'شيء أزرق فوقنا' },
  { word: 'بيت', hint: 'مكان نسكن فيه' },
  { word: 'ورد', hint: 'نبات ذو رائحة جميلة' },
];

export const wordsWithHintsRegistered = [
  { word: 'قمر', hint: 'شيء يظهر في الليل' },
  { word: 'شمس', hint: 'مصدر الضوء والحرارة' },
  { word: 'سماء', hint: 'شيء أزرق فوقنا' },
  { word: 'بيت', hint: 'مكان نسكن فيه' },
  { word: 'ورد', hint: 'نبات ذو رائحة جميلة' },
  { word: 'بحر', hint: 'مكان يحتوي على الكثير من الماء' },
  { word: 'نار', hint: 'شيء حار ويستخدم للطهي' },
  { word: 'قلم', hint: 'أداة نستخدمها للكتابة' },
  { word: 'باب', hint: 'شيء ندخل من خلاله إلى المكان' },
  { word: 'كتاب', hint: 'مصدر للمعلومات والقراءة' },
  { word: 'طير', hint: 'كائن يعيش في السماء' },
  { word: 'سيارة', hint: 'وسيلة نقل على الطريق' },
  { word: 'حديقة', hint: 'مكان يحتوي على نباتات وأزهار' },
  { word: 'نهر', hint: 'مجموعة مياه تجري بين الأراضي' },
  { word: 'طاولة', hint: 'شيء نضع الأشياء عليه' },
  { word: 'كرسي', hint: 'مكان نجلس عليه' },
  { word: 'نجمة', hint: 'تظهر في السماء ليلاً' },
  { word: 'حذاء', hint: 'شيء نرتديه في أقدامنا' },
  { word: 'ساعة', hint: 'جهاز لمعرفة الوقت' },
  { word: 'مدرسة', hint: 'مكان يتعلم فيه الأطفال' },
  { word: 'جبال', hint: 'أرض مرتفعة وشاهقة' },
  { word: 'غابة', hint: 'مكان مليء بالأشجار والحيوانات' },
  { word: 'شجرة', hint: 'نبات كبير وله جذور' },
  { word: 'مدينة', hint: 'مكان يعيش فيه عدد كبير من الناس' },
  { word: 'صحراء', hint: 'مكان جاف وقليل الماء' },
];

// Generate a new word
export const generateNewWord = (setWord, setHint, setGuesses, setAttempts, setGuess) => {
  const randomItem = wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
  setWord(randomItem.word); // Set the new word
  setHint(randomItem.hint); // Set the new hint
  setGuesses([]); // Reset guesses
  setAttempts(6); // Reset attempts
  setGuess(''); // Reset current guess
};

export const generateNewWordRegistered = (setWord, setHint, setGuesses, setAttempts, setGuess) => {
  const randomIndex = Math.floor(Math.random() * wordsWithHintsRegistered.length);
  const selectedWord = wordsWithHintsRegistered[randomIndex];

  setWord(selectedWord.word);
  setHint(selectedWord.hint);
  setGuesses([]);
  setAttempts(6); // Reset attempts for the new game
  setGuess(''); // Clear current guess
};


export function handleGuess(
  guess,
  currentWord,
  guesses,
  setGuesses,
  setCurrentGuess,
  attempts,
  setAttempts,
  onWordComplete,     // a callback to generate a new word or do any cleanup
  setScore,
  currentStreak,
  setStreak,
  setShowFire,
  animation
) {
  console.log('Comparing:', guess, 'vs', currentWord);

  // Basic validation: ensure guess length matches currentWord length
  if (!guess || guess.length !== currentWord.length) {
    Alert.alert('خطأ', 'الرجاء إدخال تخمين صحيح');
    return;
  }

  // Determine correctness of each letter (example coloring logic)
  const result = [...guess].map((char, i) => {
    const correctLetter = currentWord[currentWord.length - 1 - i];
    if (char === correctLetter) {
      return '#0f0'; // correct
    } else if (currentWord.includes(char)) {
      return '#ff0'; // in the word, wrong position
    } else {
      return '#f00'; // not in the word
    }
  });

  // Add the guessed word and result to the guesses array
  const newGuesses = [
    ...guesses,
    {
      word: guess,
      result,
    },
  ];
  setGuesses(newGuesses);

  // Check if guess is correct
  if (guess === currentWord) {
    // Player guessed correctly
    setStreak(currentStreak + 1);      // Increase streak
    setScore((prevScore) => prevScore + 10); // Example: add points
    onWordComplete();                  // e.g., generate a new word
  } else {
    // Guess is incorrect
    const newAttempts = attempts - 1;
    setAttempts(newAttempts);

    if (newAttempts <= 0) {
      // Player used all attempts and still didn't guess correctly => reset streak
      setStreak(0);
      Alert.alert('انتهت المحاولات', 'الكلمة الصحيحة: ' + currentWord);
      onWordComplete();
    } else {
      // Player still has attempts left => DO NOT reset streak
      // Let the user guess again without resetting streak
    }
  }

  // Reset the currentGuess so the input box is cleared
  setCurrentGuess('');
}

// Get fire animation based on streak
export const getFireAnimation = (streak) => {
  if (streak >= 15) return require('./assets/bluefire.json');
  if (streak >= 10) return require('./assets/redfire.json');
  if (streak >= 1) return require('./assets/orangfire.json');
  return null;
};
