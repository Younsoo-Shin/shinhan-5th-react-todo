import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoApp from './components/TodoApp';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoContextProvider from './contexts/todoContext';

import Login from './components/Login';

function App() {
  return (
    <>
      <Login />

      <TodoContextProvider>
        <TodoApp />
      </TodoContextProvider>
    </>
  );
}

export default App;
