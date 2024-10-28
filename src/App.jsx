import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoApp from './components/TodoApp';

import TodoContextProvider from './contexts/todoContext';

function App() {
  return (
    <>
      <TodoContextProvider>
        <TodoApp />
      </TodoContextProvider>
    </>
  );
}

export default App;
