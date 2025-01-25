import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameContext } from './GameContext';

const LeaderboardScreen = () => {
  const { players } = useGameContext();

  // Sort players by points in descending order
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  // Separate top 3 players and the rest
  const topThree = sortedPlayers.slice(0, 3);
  const others = sortedPlayers.slice(3);

  return (
    <View style={styles.container}>
      {/* Top 3 Players Section */}
      <LinearGradient
        colors={['#73F0A7', '#2C917E']}
        style={styles.topThreeContainer}
      >
        {/* Second Player (Left) */}
        {topThree[1] && (
          <View style={styles.profileWrapper}>
            <View style={[styles.shadowEllipse, styles.shadow1]} />
            <View style={[styles.shadowEllipse, styles.shadow2]} />
            <Image
              source={topThree[1].image}
              style={styles.playerImage}
              resizeMode="cover"
            />
            <Text style={styles.topPlayerRank}>#2</Text>
            <Text style={styles.topPlayerName}>{topThree[1].name}</Text>
            <Text style={styles.topPlayerPoints}>{topThree[1].points} نقاط</Text>
          </View>
        )}

        {/* First Player (Center) */}
        {topThree[0] && (
          <View style={[styles.profileWrapper, styles.centerPlayer]}>
            <View style={[styles.shadowEllipse, styles.shadow1]} />
            <View style={[styles.shadowEllipse, styles.shadow2]} />
            <Image
              source={topThree[0].image}
              style={styles.playerImage}
              resizeMode="cover"
            />
            {/* Crown Image */}
            <Image
              source={require('./assets/crown.png')} // Replace with the path to your crown image
              style={styles.crownImage}
              resizeMode="contain"
            />
            <Text style={styles.topPlayerRank}>#1</Text>
            <Text style={styles.topPlayerName}>{topThree[0].name}</Text>
            <Text style={styles.topPlayerPoints}>{topThree[0].points} نقاط</Text>
          </View>
        )}

        {/* Third Player (Right) */}
        {topThree[2] && (
          <View style={styles.profileWrapper}>
            <View style={[styles.shadowEllipse, styles.shadow1]} />
            <View style={[styles.shadowEllipse, styles.shadow2]} />
            <Image
              source={topThree[2].image}
              style={styles.playerImage}
              resizeMode="cover"
            />
            <Text style={styles.topPlayerRank}>#3</Text>
            <Text style={styles.topPlayerName}>{topThree[2].name}</Text>
            <Text style={styles.topPlayerPoints}>{topThree[2].points} نقاط</Text>
          </View>
        )}
      </LinearGradient>

      {/* Table Header */}
      <LinearGradient
        colors={['#943900', '#FF7F50']}
        style={styles.tableHeader}
      >
        <Text style={styles.headerText}>المرتبة</Text>
        <Text style={styles.headerText}>الاسم</Text>
        <Text style={styles.headerText}>أعلى النقاط</Text>
      </LinearGradient>

      {/* Rest of the Leaderboard */}
      <FlatList
        data={others}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.playerRow,
              {
                backgroundColor: index % 2 === 0 ? '#FE6100' : '#FF9857',
              },
            ]}
          >
            <Text
              style={[
                styles.playerRank,
                { color: index % 2 === 0 ? '#FFFFFF' : '#232C2C' },
              ]}
            >
              #{index + 4}
            </Text>
            <View style={styles.playerInfo}>
              <Image
                source={item.image}
                style={styles.playerImageSmall}
                resizeMode="cover"
              />
              <Text
                style={[
                  styles.playerName,
                  { color: index % 2 === 0 ? '#FFFFFF' : '#232C2C' },
                ]}
              >
                {item.name}
              </Text>
            </View>
            <Text
              style={[
                styles.playerPoints,
                { color: index % 2 === 0 ? '#FFFFFF' : '#232C2C' },
              ]}
            >
              {item.points} نقاط
            </Text>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#234C34',
    alignItems: 'center',
    paddingTop: 120,
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '30%',
    paddingTop: 50,
    paddingBottom: 30,
  },
  profileWrapper: {
    alignItems: 'center',
    marginHorizontal: 20,
    position: 'relative',
    marginBottom: -12,
  },
  shadowEllipse: {
    position: 'absolute',
    bottom: -10,
    width: 80,
    height: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
    zIndex: -1,
  },
  shadow1: {
    bottom: -10,
    width: 90,
    height: 20,
    opacity: 0.2,
  },
  shadow2: {
    bottom: -15,
    width: 100,
    height: 30,
    opacity: 0.1,
  },
  playerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFD700',
    marginBottom: -20,
  },
  crownImage: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: -14,
  },
  centerPlayer: {
    transform: [{ scale: 1.2 }],
  },
  topPlayerRank: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
  },
  topPlayerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  topPlayerPoints: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 5,
    marginTop: 110,
    marginBottom: -40,
    width: '100%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 5,
    width: '100%',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  playerImageSmall: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  playerRank: {
    marginHorizontal: 30,
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  playerName: {
    fontSize: 18,
    textAlign: 'center',
  },
  playerPoints: {
    fontSize: 20,
    textAlign: 'center',
  },
  flatListContent: {
    paddingBottom: 20,
    marginTop: 50,
  },
});
