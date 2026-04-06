import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { GameContext } from '../context/GameContext';
import { Gesture, GestureDetector, Directions } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Для відкриття меню

const ScreenContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;
  background-color: ${(props) => props.theme.background};
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin-left: 20px;
`;

const Content = styled.ScrollView.attrs({
  contentContainerStyle: { alignItems: 'center', paddingBottom: 40 }
})`
  flex: 1;
`;

const ScoreCard = styled.View`
  background-color: ${(props) => props.theme.card};
  width: 90%;
  padding: 30px;
  border-radius: 25px;
  align-items: center;
  margin-vertical: 20px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
`;

const ScoreLabel = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.text};
  opacity: 0.5;
  letter-spacing: 2px;
  margin-bottom: 5px;
`;

const ScoreText = styled.Text`
  font-size: 60px;
  font-weight: bold;
  color: ${(props) => props.theme.primary};
`;

const ClickerWrapper = styled.View`
  margin-vertical: 40px;
  height: 180px;
  justify-content: center;
`;

const LegendContainer = styled.View`
  background-color: ${(props) => props.theme.card};
  width: 90%;
  padding: 25px;
  border-radius: 20px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 5px;
`;

const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const LegendIconBox = styled.View`
  width: 35px;
  margin-right: 15px;
`;

const LegendText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.text};
`;

export default function MainScreen() {
  const { score, addScore, updateProgress } = useContext(GameContext);
  const navigation = useNavigation(); // Отримуємо доступ до навігації

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const handleGestureImpact = (points, actionKey) => {
    if (points > 0) addScore(points);
    if (actionKey) updateProgress(actionKey, 1);
  };

  const tap = Gesture.Tap().onEnd(() => runOnJS(handleGestureImpact)(1, 'taps'));
  const doubleTap = Gesture.Tap().numberOfTaps(2).onEnd(() => runOnJS(handleGestureImpact)(2, 'doubleTaps'));
  const longPress = Gesture.LongPress().minDuration(1000).onEnd(() => runOnJS(handleGestureImpact)(5, 'longPresses'));
  
  const pan = Gesture.Pan().onChange((e) => {
    translateX.value += e.changeX;
    translateY.value += e.changeY;
  }).onEnd(() => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    runOnJS(handleGestureImpact)(0, 'drags');
  });

  const swipe = Gesture.Fling().direction(Directions.RIGHT | Directions.LEFT).onEnd(() => runOnJS(handleGestureImpact)(10, 'swipesRight'));
  const pinch = Gesture.Pinch().onChange((e) => { scale.value = e.scale; }).onEnd(() => {
    scale.value = withSpring(1);
    runOnJS(handleGestureImpact)(3, 'pinches');
  });

  const composedGestures = Gesture.Simultaneous(Gesture.Exclusive(doubleTap, tap), longPress, pan, swipe, pinch);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }]
  }));

  return (
    <ScreenContainer>
      <Header>
        <Ionicons 
          name="menu-outline" 
          size={30} 
          color="#333" 
          onPress={() => navigation.openDrawer()} // Відкриваємо меню по кліку
        />
        <HeaderTitle>Клікер Жестів</HeaderTitle>
      </Header>

      <Content>
        <ScoreCard>
          <ScoreLabel>SCORE</ScoreLabel>
          <ScoreText>{score}</ScoreText>
        </ScoreCard>

        <ClickerWrapper>
          <GestureDetector gesture={composedGestures}>
            <Animated.View style={[animatedStyle, {
              width: 160, height: 160, borderRadius: 80,
              backgroundColor: '#00B4FF', alignItems: 'center', justifyContent: 'center',
              elevation: 10, shadowColor: '#00B4FF', shadowOpacity: 0.4, shadowRadius: 15
            }]}>
              <MaterialCommunityIcons name="gesture-tap" size={40} color="white" />
              <ScoreLabel style={{color: 'white', opacity: 1, marginTop: 5}}>Тисни</ScoreLabel>
            </Animated.View>
          </GestureDetector>
        </ClickerWrapper>

        <LegendContainer>
          <LegendItem>
            <LegendIconBox><Ionicons name="finger-print" size={22} color="#00B4FF" /></LegendIconBox>
            <LegendText>Натиск: +1 бал</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendIconBox><MaterialCommunityIcons name="gesture-tap" size={22} color="#FFA500" /></LegendIconBox>
            <LegendText>Подвійний натиск: +2 бали</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendIconBox><Ionicons name="time-outline" size={22} color="#8A2BE2" /></LegendIconBox>
            <LegendText>Утримання (1с): +5 балів</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendIconBox><Ionicons name="swap-horizontal" size={22} color="#FF4500" /></LegendIconBox>
            <LegendText>Свайп: +10 балів</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendIconBox><MaterialCommunityIcons name="arrow-expand-all" size={22} color="#32CD32" /></LegendIconBox>
            <LegendText>Масштабування: +3 бали</LegendText>
          </LegendItem>
        </LegendContainer>
      </Content>
    </ScreenContainer>
  );
}