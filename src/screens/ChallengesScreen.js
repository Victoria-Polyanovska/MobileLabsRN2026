import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { GameContext } from '../context/GameContext';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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

const Content = styled.View`
  flex: 1;
  padding: 0 20px;
`;

const TaskCard = styled.View`
  background-color: ${(props) => props.theme.card};
  padding: 18px;
  border-radius: 15px;
  margin-bottom: 12px;
  border-left-width: 6px;
  border-left-color: ${(props) => (props.completed ? props.theme.success : props.theme.primary)};
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 5px;
  opacity: ${(props) => (props.completed ? 0.8 : 1)};
`;

const TaskHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TaskText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.text};
  flex: 1;
`;

const ProgressText = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.text};
  opacity: 0.5;
  margin-top: 6px;
  font-weight: 500;
`;

export default function ChallengesScreen() {
  const { progress, score } = useContext(GameContext);
  const navigation = useNavigation();

  const tasks = [
    { id: 1, title: 'Зробити 10 кліків', current: progress.taps, target: 10 },
    { id: 2, title: 'Подвійний клік 5 разів', current: progress.doubleTaps, target: 5 },
    { id: 3, title: 'Утримувати об’єкт (Long Press)', current: progress.longPresses, target: 1 },
    { id: 4, title: 'Перетягнути об’єкт (Pan)', current: progress.drags, target: 1 },
    { id: 5, title: 'Свайп вправо (Fling)', current: progress.swipesRight, target: 1 },
    { id: 6, title: 'Свайп вліво (Fling)', current: progress.swipesLeft, target: 1 },
    { id: 7, title: 'Змінити розмір (Pinch)', current: progress.pinches, target: 1 },
    { id: 8, title: 'Набрати 100 очок', current: score, target: 100 },
    { id: 9, title: 'Власне: Набрати 500 очок', current: score, target: 500 },
  ];

  return (
    <ScreenContainer>
      <Header>
        <Ionicons 
          name="menu-outline" 
          size={30} 
          color="#333" 
          onPress={() => navigation.openDrawer()} 
        />
        <HeaderTitle>Завдання</HeaderTitle>
      </Header>

      <Content>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20}}>
          {tasks.map((task) => {
            const isCompleted = task.current >= task.target;
            return (
              <TaskCard key={task.id} completed={isCompleted}>
                <TaskHeader>
                  <TaskText>{task.title}</TaskText>
                  {isCompleted && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
                </TaskHeader>
                <ProgressText>
                  Виконано: {task.current} / {task.target}
                </ProgressText>
              </TaskCard>
            );
          })}
        </ScrollView>
      </Content>
    </ScreenContainer>
  );
}