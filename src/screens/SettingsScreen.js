import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { GameContext } from '../context/GameContext';
import { Switch } from 'react-native';
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
  padding: 20px;
  align-items: center;
`;

const SettingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.card};
  width: 100%;
  padding: 20px;
  border-radius: 18px;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
`;

const SettingText = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: ${(props) => props.theme.text};
`;

const InfoBox = styled.View`
  margin-top: auto;
  padding-bottom: 30px;
  width: 100%;
  align-items: center;
`;

const InfoText = styled.Text`
  color: ${(props) => props.theme.text};
  opacity: 0.6;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
`;

const HighlightText = styled.Text`
  font-weight: bold;
  color: ${(props) => props.theme.primary};
`;

export default function SettingsScreen() {
  const { theme, toggleTheme } = useContext(GameContext);
  const navigation = useNavigation();

  return (
    <ScreenContainer>
      <Header>
        <Ionicons 
          name="menu-outline" 
          size={30} 
          color="#333" 
          onPress={() => navigation.openDrawer()} 
        />
        <HeaderTitle>Налаштування</HeaderTitle>
      </Header>

      <Content>
        <SettingRow>
          <SettingText>Темна тема</SettingText>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#D1D1D1', true: '#00B4FF' }}
            thumbColor="#FFFFFF"
          />
        </SettingRow>

        <InfoBox>
          <InfoText>Лабораторна робота №3</InfoText>
          <InfoText>
            Виконала: студентка групи <HighlightText>ІПЗ-24-2</HighlightText>{'\n'}
            <HighlightText>Поляновська Вікторія</HighlightText>
          </InfoText>
        </InfoBox>
      </Content>
    </ScreenContainer>
  );
}