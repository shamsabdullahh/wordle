import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import rank images
import Rank1 from './assets/Rank-1.png';
import Rank2 from './assets/Rank-2.png';
import Rank3 from './assets/Rank-3.png';
import Rank4 from './assets/Rank-4.png';
import Rank5 from './assets/Rank-5.png';

const AccountScreen = () => {
  const scaleAnim = useRef(
    Array.from({ length: 5 }, () => new Animated.Value(0.8))
  ).current;

  useEffect(() => {
    const animations = scaleAnim.map((anim) =>
      Animated.spring(anim, {
        toValue: 1,
        friction: 4,
        tension: 160,
        useNativeDriver: true,
      })
    );
    Animated.stagger(200, animations).start();
  }, []);

  const renderProfileSection = () => (
    <View style={styles.profileSection}>
      <View style={styles.profileImageWrapper}>
        <Image
          source={{ uri: 'https://via.placeholder.com/120' }} // Replace with actual avatar URL
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.name}>احمد حسين</Text>
      <Text style={styles.role}>لاعب محترف</Text>
    </View>
  );

  const renderRanks = () => {
    const rankImages = [Rank1, Rank2, Rank3, Rank4, Rank5];

    return (
      <View style={styles.rankContainer}>
        {scaleAnim.map((anim, index) => (
          <Animated.View
            key={index}
            style={[styles.rankWrapper, { transform: [{ scale: anim }] }]}
          >
            <Image
              source={rankImages[index]} // Use the imported images
              style={styles.rankImage}
            />
            <Text style={styles.rankLabel}>رتبة {index + 1}</Text>
          </Animated.View>
        ))}
      </View>
    );
  };

  const renderButtons = () => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}>
        <LinearGradient
          colors={['#4CAF50', '#4CAF50']}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>تعديل الملف الشخصي</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <LinearGradient
          colors={['#4CAF50', '#4CAF50']}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>الرسائل</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#234C34', '#1D2E2F']}
      style={styles.container}
    >
      {renderProfileSection()}
      {renderRanks()}
      {renderButtons()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    padding: 60,
    borderRadius: 100,
    backgroundColor: '#FFF8E6', // Solid dark green
    marginVertical: 20,
    shadowColor: 'yellow',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10, // For Android shadow
  },
  profileImageWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
  },
  role: {
    fontSize: 18,
    color: 'gray',
    marginTop: 5,
    fontStyle: 'italic',
  },
  rankContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
    flexWrap: 'wrap',
  },
  rankWrapper: {
    alignItems: 'center',
    margin: 10,
  },
  rankImage: {
    width: 90,
    height: 100,
    borderRadius: 0,
  },
  rankLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  gradientButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AccountScreen;
