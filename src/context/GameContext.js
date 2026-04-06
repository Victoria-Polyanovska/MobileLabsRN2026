import React, { createContext, useState } from 'react';

// Створюємо сам контекст
export const GameContext = createContext();

// Створюємо провайдер, який буде "огортати" наш додаток і передавати дані
export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState('light'); // 'light' або 'dark'

  // Стан для наших завдань (лічильники виконання)
  const [progress, setProgress] = useState({
    taps: 0,
    doubleTaps: 0,
    longPresses: 0,
    drags: 0,
    swipesRight: 0,
    swipesLeft: 0,
    pinches: 0,
    custom: 0, // Тут будемо рахувати твоє власне завдання
  });

  // Функція, яка збільшує лічильник конкретного завдання
  const updateProgress = (type, value = 1) => {
    setProgress((prev) => ({ ...prev, [type]: prev[type] + value }));
  };

  // Функція для додавання очок до загального рахунку
  const addScore = (points) => {
    setScore((prev) => prev + points);
  };

  // Функція для перемикання теми
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <GameContext.Provider 
      value={{ 
        score, 
        addScore, 
        progress, 
        updateProgress, 
        theme, 
        toggleTheme 
      }}
    >
      {children}
    </GameContext.Provider>
  );
};